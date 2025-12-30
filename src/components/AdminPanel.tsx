import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, RefreshCcw, AlertTriangle, Search, X, Loader2, Trash2 } from 'lucide-react';

type AdminUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: string;
  totalOrders: number;
  lifetimeValue: number;
  lastOrderStatus: string;
  lastOrderAt: string | null;
};

type OrderItem = {
  id: number;
  productId: string;
  name: string;
  image?: string | null;
  quantity: number;
  price: number;
  meta?: Record<string, unknown> | null;
};

type AdminOrder = {
  id: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  items: OrderItem[];
};

type Toast = { id: number; message: string; tone: 'success' | 'error' };

type DeleteResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  orderId?: number;
  currentStatus?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const VALID_STATUSES = ['pending', 'completed', 'cancelled', 'rejected'];

export default function AdminPanel() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled' | 'rejected'>('all');

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<number | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const fetchUsers = async (query?: string) => {
    try {
      setLoading(true);
      setError(null);
      const params = query ? `?q=${encodeURIComponent(query)}` : '';
      const res = await fetch(`${API_BASE}/admin/users${params}`);
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load users';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Remote search: call backend when search changes (debounced)
  useEffect(() => {
    const handle = setTimeout(() => {
      fetchUsers(search.trim());
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

  const fetchOrders = async (user: AdminUser) => {
    try {
        console.log('fetching orders')
        console.log(user.id)
      setOrdersLoading(true);
      setOrdersError(null);
      const res = await fetch(`${API_BASE}/admin/users/${user.id}/orders`);
      if (!res.ok) {
        throw new Error(`Failed to load orders (${res.status})`);
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load orders';
      setOrdersError(message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSelectUser = (user: AdminUser) => {
    setSelectedUser(user);
    setOrders([]);
    fetchOrders(user);
  };

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      setUpdatingOrderId(orderId);
      const res = await fetch(`${API_BASE}/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({ status })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Update failed (${res.status})`);
      }
      
      // Refresh orders and users list for accurate summary
      if (selectedUser) {
        await fetchOrders(selectedUser);
      }
      await fetchUsers();
      pushToast('Order status updated', 'success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      setOrdersError(message);
      pushToast(message, 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    // Ensure orderId is a valid number
    const numOrderId = typeof orderId === 'string' ? parseInt(orderId, 10) : Number(orderId);
    
    if (isNaN(numOrderId) || numOrderId <= 0 || !Number.isInteger(numOrderId)) {
      const errorMsg = `Invalid order ID: ${orderId} (parsed as: ${numOrderId})`;
      console.error(errorMsg);
      setOrdersError(errorMsg);
      pushToast(errorMsg, 'error');
      return;
    }

    // Verify order exists in current list
    const currentOrder = orders.find(o => Number(o.id) === numOrderId);
    if (!currentOrder) {
      const errorMsg = `Order #${numOrderId} not found in current list. Please refresh and try again.`;
      console.error(errorMsg, 'Available order IDs:', orders.map(o => o.id));
      setOrdersError(errorMsg);
      pushToast(errorMsg, 'error');
      // Auto-refresh
      if (selectedUser) {
        await fetchOrders(selectedUser);
      }
      return;
    }

    // Verify order status is completed
    if (currentOrder.status !== 'completed') {
      const errorMsg = `Cannot delete order #${numOrderId}: status is '${currentOrder.status}'. Only completed orders can be deleted.`;
      console.error(errorMsg);
      setOrdersError(errorMsg);
      pushToast(errorMsg, 'error');
      return;
    }

    // Confirmation dialog for deletion
    if (!confirm(`Are you sure you want to delete order #${numOrderId}? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingOrderId(numOrderId);
      setOrdersError(null);
      
      console.log(`🗑️ Attempting to delete order ${numOrderId}`);
      console.log(`Order details:`, {
        id: currentOrder.id,
        status: currentOrder.status,
        totalAmount: currentOrder.totalAmount,
        userId: selectedUser?.id
      });
      
      // Proceed with deletion - API will validate order exists and status is completed
      const deleteUrl = `${API_BASE}/admin/orders/${numOrderId}`;
      console.log(`Delete URL: ${deleteUrl}`);
      
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Delete response status: ${res.status} for order ${numOrderId}`);
      
      // Check content type to determine if response is JSON or HTML
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      
      // Read the response body once (can only be read once)
      let responseData: DeleteResponse = {};
      let responseText = '';
      
      try {
        responseText = await res.text();
        if (responseText) {
          if (isJson || responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
            try {
              responseData = JSON.parse(responseText);
            } catch (parseErr) {
              console.warn('Failed to parse JSON response:', parseErr);
              if (res.ok) {
                responseData = { success: true, message: 'Order deleted successfully' };
              } else {
                responseData = { error: `Server error (${res.status})` };
              }
            }
          } else if (responseText.trim().startsWith('<!')) {
            // HTML error page
            console.warn('Server returned HTML error page instead of JSON');
            responseData = { error: `Server error (${res.status})` };
          } else {
            // Plain text response
            responseData = { error: responseText.substring(0, 100) || `Server error (${res.status})` };
          }
        } else if (res.ok) {
          // Empty response but status is OK
          responseData = { success: true, message: 'Order deleted successfully' };
        }
      } catch (readErr) {
        console.warn('Failed to read response:', readErr);
        if (res.ok) {
          responseData = { success: true, message: 'Order deleted successfully' };
        } else {
          responseData = { error: `Server error (${res.status})` };
        }
      }
      
      // Handle error responses
      if (!res.ok) {
        if (res.status === 404) {
          // Order not found - this can happen if it was deleted elsewhere or doesn't exist
          // Silently refresh the list to sync with database (no error, just sync)
          if (selectedUser) {
            await fetchOrders(selectedUser);
          }
          await fetchUsers();
          setOrdersError(null);
          // Don't show error toast for 404 - the order just doesn't exist, list will update
          return;
        } else if (res.status === 400) {
          const errorMsg = responseData?.message || responseData?.error || `Cannot delete order: ${responseData?.currentStatus ? `Order status is '${responseData.currentStatus}'. Only completed orders can be deleted.` : 'Invalid request'}`;
          throw new Error(errorMsg);
        } else {
          const errorMsg = responseData?.message || responseData?.error || `Delete failed with status ${res.status}`;
          throw new Error(errorMsg);
        }
      }
      
      // Success - order deleted
      console.log(`✅ Order ${numOrderId} deleted successfully:`, responseData);

      // Refresh orders and users list for accurate summary
      if (selectedUser) {
        await fetchOrders(selectedUser);
      }
      await fetchUsers();
      pushToast(`Order #${numOrderId} deleted successfully`, 'success');
    } catch (err: unknown) {
      let message = 'Failed to delete order';
      if (err instanceof Error) {
        message = err.message;
        // Handle network errors
        if (err.message.includes('fetch') || err.message.includes('Network') || err.message.includes('Failed to fetch')) {
          message = `Cannot connect to API server at ${API_BASE}. Please ensure the API is running.`;
        }
        // Handle body stream already read error
        if (err.message.includes('body stream already read')) {
          message = 'Error processing server response. Please try again.';
        }
      }
      console.error('Error deleting order:', err);
      setOrdersError(message);
      pushToast(message, 'error');
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const numUserId = typeof userId === 'string' ? parseInt(userId, 10) : Number(userId);
    
    if (isNaN(numUserId) || numUserId <= 0 || !Number.isInteger(numUserId)) {
      const errorMsg = `Invalid user ID: ${userId}`;
      console.error(errorMsg);
      setError(errorMsg);
      pushToast(errorMsg, 'error');
      return;
    }

    // Verify user exists in current list
    const currentUser = users.find(u => Number(u.id) === numUserId);
    if (!currentUser) {
      const errorMsg = `User #${numUserId} not found in current list. Please refresh and try again.`;
      console.error(errorMsg);
      setError(errorMsg);
      pushToast(errorMsg, 'error');
      await fetchUsers();
      return;
    }

    // Verify user has 0 orders
    if (currentUser.totalOrders > 0) {
      const errorMsg = `Cannot delete user #${numUserId}: user has ${currentUser.totalOrders} order(s). Users can only be deleted when they have 0 orders.`;
      console.error(errorMsg);
      setError(errorMsg);
      pushToast(errorMsg, 'error');
      return;
    }

    // Confirmation dialog for deletion
    if (!confirm(`Are you sure you want to delete user "${currentUser.name}" (${currentUser.email})? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingUserId(numUserId);
      setError(null);
      
      console.log(`🗑️ Attempting to delete user ${numUserId}`);
      console.log(`User details:`, {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        totalOrders: currentUser.totalOrders
      });
      
      const deleteUrl = `${API_BASE}/admin/users/${numUserId}`;
      console.log(`Delete URL: ${deleteUrl}`);
      
      const res = await fetch(deleteUrl, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Delete response status: ${res.status} for user ${numUserId}`);
      
      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      
      let responseData: { success?: boolean; message?: string; error?: string } = {};
      let responseText = '';
      
      try {
        responseText = await res.text();
        if (responseText) {
          if (isJson || responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
            try {
              responseData = JSON.parse(responseText);
            } catch (parseErr) {
              console.warn('Failed to parse JSON response:', parseErr);
              if (res.ok) {
                responseData = { success: true, message: 'User deleted successfully' };
              } else {
                responseData = { error: `Server error (${res.status})` };
              }
            }
          } else if (responseText.trim().startsWith('<!')) {
            console.warn('Server returned HTML error page instead of JSON');
            responseData = { error: `Server error (${res.status})` };
          } else {
            responseData = { error: responseText.substring(0, 100) || `Server error (${res.status})` };
          }
        } else if (res.ok) {
          responseData = { success: true, message: 'User deleted successfully' };
        }
      } catch (readErr) {
        console.warn('Failed to read response:', readErr);
        if (res.ok) {
          responseData = { success: true, message: 'User deleted successfully' };
        } else {
          responseData = { error: `Server error (${res.status})` };
        }
      }
      
      // Handle error responses
      if (!res.ok) {
        if (res.status === 404) {
          // User not found - refresh the list to sync with database
          await fetchUsers();
          setError(null);
          return;
        } else if (res.status === 400) {
          const errorMsg = responseData?.message || responseData?.error || `Cannot delete user: Invalid request`;
          throw new Error(errorMsg);
        } else {
          const errorMsg = responseData?.message || responseData?.error || `Delete failed with status ${res.status}`;
          throw new Error(errorMsg);
        }
      }
      
      // Success - user deleted
      console.log(`✅ User ${numUserId} deleted successfully:`, responseData);

      // Close user orders modal if the deleted user was selected
      if (selectedUser?.id === numUserId) {
        setSelectedUser(null);
        setOrders([]);
        setOrdersError(null);
      }

      // Refresh users list with current search term to sync with server
      // Use search.trim() if it has a value, otherwise pass undefined to fetch all
      const searchQuery = search.trim() || undefined;
      await fetchUsers(searchQuery);
      pushToast(`User "${currentUser.name}" deleted successfully`, 'success');
    } catch (err: unknown) {
      let message = 'Failed to delete user';
      if (err instanceof Error) {
        message = err.message;
        if (err.message.includes('fetch') || err.message.includes('Network') || err.message.includes('Failed to fetch')) {
          message = `Cannot connect to API server at ${API_BASE}. Please ensure the API is running.`;
        }
        if (err.message.includes('body stream already read')) {
          message = 'Error processing server response. Please try again.';
        }
      }
      console.error('Error deleting user:', err);
      setError(message);
      pushToast(message, 'error');
    } finally {
      setDeletingUserId(null);
    }
  };

  const summary = useMemo(() => {
    const totalUsers = users.length;
    const totalOrders = users.reduce((sum, u) => sum + u.totalOrders, 0);
    const lifetimeValue = users.reduce((sum, u) => sum + u.lifetimeValue, 0);
    return { totalUsers, totalOrders, lifetimeValue };
  }, [users]);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : u.lastOrderStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-6 py-12 overflow-hidden">
      <div className="absolute -top-40 -left-20 h-72 w-72 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute top-32 right-0 h-96 w-96 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-400 mb-2">Admin</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Users & Orders</h2>
            <p className="text-sm text-slate-400 mt-1">
              Monitor signups, purchase health, and keep orders on track.
            </p>
          </div>
          <button
            onClick={() => fetchUsers(search.trim())}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:translate-y-[-1px] transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <StatCard label="Total Users" value={summary.totalUsers} />
          <StatCard label="Total Orders" value={summary.totalOrders} />
          <StatCard label="Lifetime Value" value={`$${(summary.lifetimeValue / 100).toFixed(2)}`} />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 w-full md:w-1/2 shadow-inner">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
              placeholder="Search by name or email"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 shadow-inner"
          >
            <option className="bg-slate-900" value="all">All statuses</option>
            <option className="bg-slate-900" value="pending">Pending</option>
            <option className="bg-slate-900" value="completed">Completed</option>
            <option className="bg-slate-900" value="cancelled">Cancelled</option>
            <option className="bg-slate-900" value="rejected">Rejected</option>
          </select>
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 animate-spin" />
            Loading users...
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-2xl shadow-cyan-500/10">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 uppercase text-xs tracking-[0.2em] border-b border-white/5">
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Orders</th>
                    <th className="px-5 py-3">Lifetime</th>
                    <th className="px-5 py-3">Last Status</th>
                    <th className="px-5 py-3">Joined</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(user => (
                    <tr
                      key={user.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-slate-400 text-xs">ID: {user.id}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-200">
                        <div>{user.email}</div>
                        {user.phone && <div className="text-slate-400 text-xs">{user.phone}</div>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold">{user.totalOrders}</div>
                        <div className="text-slate-400 text-xs">orders</div>
                      </td>
                      <td className="px-5 py-4 text-slate-100">
                        ${(user.lifetimeValue / 100).toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={user.lastOrderStatus} />
                        {user.lastOrderAt && (
                          <div className="text-slate-400 text-xs mt-1">
                            {new Date(user.lastOrderAt).toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSelectUser(user)}
                            className="text-xs font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow shadow-cyan-500/30 hover:translate-y-[-1px] transition"
                          >
                            View orders
                          </button>
                          {user.totalOrders === 0 && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteUser(user.id);
                              }}
                              disabled={deletingUserId === user.id}
                              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete user (only allowed when user has 0 orders)"
                            >
                              {deletingUserId === user.id ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-3 h-3" />
                                  Delete
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td className="px-5 py-8 text-center text-slate-400 text-sm" colSpan={7}>
                        No users found. Adjust filters or create an order to see users here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <OrdersModal
          open={!!selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setOrders([]);
            setOrdersError(null);
          }}
          user={selectedUser}
          orders={orders}
          loading={ordersLoading}
          error={ordersError}
          onChangeStatus={handleStatusChange}
          onDeleteOrder={handleDeleteOrder}
          updatingOrderId={updatingOrderId}
          deletingOrderId={deletingOrderId}
        />

        <ToastStack toasts={toasts} />
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur shadow-inner shadow-cyan-500/10">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30',
    completed: 'bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/30',
    cancelled: 'bg-slate-500/15 text-slate-200 ring-1 ring-slate-300/20',
    rejected: 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30'
  };
  const cls = map[status] || 'bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/30';
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      <ShieldCheck className="w-4 h-4" />
      {status}
    </span>
  );
}

function OrdersModal({
  open,
  onClose,
  user,
  orders,
  loading,
  error,
  onChangeStatus,
  onDeleteOrder,
  updatingOrderId,
  deletingOrderId
}: {
  open: boolean;
  onClose: () => void;
  user: AdminUser | null;
  orders: AdminOrder[];
  loading: boolean;
  error: string | null;
  onChangeStatus: (orderId: number, status: string) => void;
  onDeleteOrder: (orderId: number) => void;
  updatingOrderId: number | null;
  deletingOrderId: number | null;
}) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-4xl rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-2xl shadow-cyan-500/10 p-6 relative max-h-[80vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-slate-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-1">User</p>
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-400 py-6">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
            Loading orders...
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 text-sm text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-3 mb-4">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4 overflow-y-auto max-h-[55vh] pr-1">
            {orders.map(order => (
              <div
                key={order.id}
                className="border border-white/10 rounded-xl p-4 bg-white/5"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="text-sm text-slate-300">Order #{order.id}</div>
                    <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={e => onChangeStatus(order.id, e.target.value)}
                      disabled={updatingOrderId === order.id || deletingOrderId === order.id}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-sm text-slate-100"
                    >
                      {VALID_STATUSES.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {order.status === 'completed' && (
                      <button
                        onClick={() => {
                          // Ensure order.id is a number
                          const orderId = typeof order.id === 'string' ? parseInt(order.id, 10) : order.id;
                          
                          console.log('Delete button clicked for order:', {
                            id: order.id,
                            orderId: orderId,
                            status: order.status,
                            type: typeof order.id,
                            userId: user?.id
                          });
                          
                          if (!orderId || isNaN(orderId) || orderId <= 0) {
                            console.error('Invalid order ID:', order.id, 'parsed as:', orderId);
                            return;
                          }
                          onDeleteOrder(orderId);
                        }}
                        disabled={deletingOrderId === order.id || updatingOrderId === order.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-200 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete completed order"
                      >
                        {deletingOrderId === order.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        {deletingOrderId === order.id ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                    {(updatingOrderId === order.id || deletingOrderId === order.id) && (
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                    )}
                  </div>
                </div>

                <div className="text-sm font-semibold mb-2">
                  Total: ${(order.totalAmount / 100).toFixed(2)}
                </div>

                <div className="divide-y divide-white/5">
                  {order.items.map(item => (
                    <div key={item.id} className="py-2 flex justify-between gap-3 text-sm">
                      <div>
                        <div className="font-semibold text-white">{item.name}</div>
                        <div className="text-slate-500 text-xs">Product ID: {item.productId}</div>
                        {item.meta && (
                          <div className="text-slate-500 text-xs">
                            {Object.entries(item.meta)
                              .map(([k, v]) => `${k}: ${String(v)}`)
                              .join(' · ')}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${(item.price / 100).toFixed(2)} × {item.quantity}
                        </div>
                        <div className="text-slate-500 text-xs">
                          ${(item.price * item.quantity / 100).toFixed(2)} total
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center text-slate-500 text-sm py-6">No orders for this user yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50">
      {toasts.map(toast => {
        const cls =
          toast.tone === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-rose-600 text-white';
        return (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm ${cls}`}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}

