# Button Click Event Listeners in Project

This document lists all button click event listeners (`onClick` handlers) found in the project, organized by component file.

## Summary
**Total Button Click Event Listeners: 50+**

---

## 1. Header.tsx (7 buttons)

### Location: `src/components/Header.tsx`

1. **Logo/Home Button** (Line 24-47)
   - **Event**: `onClick={() => setCurrentView('home')}`
   - **Action**: Navigates to home view

2. **Home Navigation Button** (Line 51-59)
   - **Event**: `onClick={() => setCurrentView('home')}`
   - **Action**: Sets current view to 'home'

3. **Collection Navigation Button** (Line 60-68)
   - **Event**: `onClick={() => setCurrentView('gallery')}`
   - **Action**: Sets current view to 'gallery' (product collection)

4. **Design Studio Navigation Button** (Line 69-77)
   - **Event**: `onClick={() => setCurrentView('design')}`
   - **Action**: Sets current view to 'design' (design studio)

5. **Admin Navigation Button** (Line 78-86)
   - **Event**: `onClick={() => router.push('/Admin')}`
   - **Action**: Navigates to Admin page using Next.js router

6. **Theme Toggle Button** (Line 89-99)
   - **Event**: `onClick={toggleTheme}`
   - **Action**: Toggles between dark and light theme

7. **Cart Button** (Line 101-111)
   - **Event**: `onClick={onCartClick}`
   - **Action**: Opens shopping cart sidebar

---

## 2. ProductGallery.tsx (10+ buttons)

### Location: `src/components/ProductGallery.tsx`

1. **Save Search Button** (Line 278-283)
   - **Event**: `onClick={handleSaveSearch}`
   - **Action**: Saves search term, user name, and email to localStorage

2. **Category Filter Buttons** (Line 337-348) - 6 buttons (one per category)
   - **Event**: `onClick={() => setSelectedCategory(category)}`
   - **Action**: Filters products by category (All, Diamonds, Rings, Earrings, Necklaces, Bracelets)

3. **Wishlist Toggle Button** (Line 368-377) - Per product
   - **Event**: `onClick={() => toggleWishlist(product.id)}`
   - **Action**: Adds/removes product from wishlist

4. **View Product Details Button** (Line 381-386) - Per product
   - **Event**: `onClick={() => setSelectedProduct(product)}`
   - **Action**: Opens product modal with details

5. **Add to Cart Button** (Line 387-392) - Per product
   - **Event**: `onClick={() => handleAddToCart(product)}`
   - **Action**: Adds product to shopping cart

6. **Quick Checkout Button** (Line 394-400) - Per product (conditional)
   - **Event**: `onClick={() => handleQuickCheckout(product)}`
   - **Action**: Adds product to cart and opens checkout immediately

---

## 3. Hero.tsx (2 buttons)

### Location: `src/components/Hero.tsx`

1. **Design Now Button** (Line 39-49)
   - **Event**: `onClick={() => setCurrentView('design')}`
   - **Action**: Navigates to design studio view

2. **Explore Collection Button** (Line 51-56)
   - **Event**: `onClick={() => setCurrentView('gallery')}`
   - **Action**: Navigates to product gallery view

---

## 4. Cart.tsx (6 buttons)

### Location: `src/components/Cart.tsx`

1. **Close Cart Button** (Line 32-37)
   - **Event**: `onClick={onClose}`
   - **Action**: Closes the cart sidebar

2. **Continue Shopping Button** (Line 47-52) - When cart is empty
   - **Event**: `onClick={onClose}`
   - **Action**: Closes cart and returns to shopping

3. **Decrease Quantity Button** (Line 89-94) - Per item
   - **Event**: `onClick={() => updateQuantity(item.id, item.quantity - 1)}`
   - **Action**: Decreases item quantity by 1

4. **Increase Quantity Button** (Line 96-101) - Per item
   - **Event**: `onClick={() => updateQuantity(item.id, item.quantity + 1)}`
   - **Action**: Increases item quantity by 1

5. **Remove Item Button** (Line 104-109) - Per item
   - **Event**: `onClick={() => removeFromCart(item.id)}`
   - **Action**: Removes item from cart

6. **Reserve & Checkout Button** (Line 137-143)
   - **Event**: `onClick={() => setShowCheckout(true)}`
   - **Action**: Opens checkout modal

7. **Clear Cart Button** (Line 145-150)
   - **Event**: `onClick={clearCart}`
   - **Action**: Removes all items from cart

---

## 5. CheckoutModal.tsx (2 buttons)

### Location: `src/components/CheckoutModal.tsx`

1. **Close Modal Button** (Line 131-136)
   - **Event**: `onClick={onClose}`
   - **Action**: Closes checkout modal

2. **Confirm & Reserve Button** (Line 212-219)
   - **Event**: `onClick={handleSubmit}`
   - **Action**: Submits order to API, saves to database, clears cart

---

## 6. ProductModal.tsx (4 buttons)

### Location: `src/components/ProductModal.tsx`

1. **Close Modal Button** (Line 46-51)
   - **Event**: `onClick={onClose}`
   - **Action**: Closes product details modal

2. **Gallery Thumbnail Buttons** (Line 67-87) - Multiple buttons (one per gallery image)
   - **Event**: `onClick={() => setActiveIndex(idx)}`
   - **Action**: Changes displayed product image

3. **Add to Cart Button** (Line 114-135)
   - **Event**: `onClick={handleAddToCart}`
   - **Action**: Adds product to cart, shows confirmation, closes modal

---

## 7. AdminPanel.tsx (10+ buttons)

### Location: `src/components/AdminPanel.tsx`

1. **Refresh Users Button** (Line 500-506)
   - **Event**: `onClick={() => fetchUsers(search.trim())}`
   - **Action**: Refreshes user list from API

2. **View Orders Button** (Line 601-606) - Per user
   - **Event**: `onClick={() => handleSelectUser(user)}`
   - **Action**: Opens modal showing user's orders

3. **Delete User Button** (Line 608-629) - Per user (only if 0 orders)
   - **Event**: `onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteUser(user.id); }}`
   - **Action**: Deletes user from database (with confirmation)

4. **Close Orders Modal Button** (Line 724-730)
   - **Event**: `onClick={onClose}`
   - **Action**: Closes orders modal

5. **Order Status Dropdown** (Line 765-776) - Per order
   - **Event**: `onChange={e => onChangeStatus(order.id, e.target.value)}`
   - **Action**: Updates order status (pending, completed, cancelled, rejected)

6. **Delete Order Button** (Line 778-807) - Per order (only if status is 'completed')
   - **Event**: `onClick={() => { ... onDeleteOrder(orderId); }}`
   - **Action**: Deletes completed order from database (with confirmation)

---

## 8. DesignStudio.tsx (20+ buttons)

### Location: `src/components/DesignStudio.tsx`

1. **Step Navigation Buttons** (Line 162-175) - 5 buttons (one per step)
   - **Event**: `onClick={() => setCurrentStep(step.id)}`
   - **Action**: Navigates to specific design step

2. **Jewelry Type Selection Buttons** (Line 189-217) - 4 buttons (Ring, Necklace, Earrings, Bracelet)
   - **Event**: `onClick={() => setSelectedType(type)}`
   - **Action**: Selects jewelry type for customization

3. **Metal Selection Buttons** (Line 230-252) - 4 buttons (Yellow Gold, White Gold, Rose Gold, Platinum)
   - **Event**: `onClick={() => setSelectedMetal(metal)}`
   - **Action**: Selects metal type

4. **Gemstone Selection Buttons** (Line 257-273) - 6 buttons (Diamond, Sapphire, Emerald, Ruby, Pearl, None)
   - **Event**: `onClick={() => setSelectedGemstone(gem)}`
   - **Action**: Selects gemstone type

5. **Shape Selection Buttons** (Line 285-304) - 5 buttons (Round, Oval, Cushion, Emerald, Princess)
   - **Event**: `onClick={() => setSelectedShape(shape)}`
   - **Action**: Selects gemstone shape

6. **Carat Weight Selection Buttons** (Line 309-323) - 4 buttons (0.75ct, 1.0ct, 1.5ct, 2.0ct)
   - **Event**: `onClick={() => setSelectedCarat(carat)}`
   - **Action**: Selects carat weight

7. **Ring Size Selection Buttons** (Line 338-349) - 9 buttons (sizes 5-9)
   - **Event**: `onClick={() => setSelectedSize(size)}`
   - **Action**: Selects ring size

8. **Band Width Selection Buttons** (Line 356-370) - 3 buttons (Thin, Classic, Bold)
   - **Event**: `onClick={() => setSelectedBandWidth(band)}`
   - **Action**: Selects band width

9. **Finish Selection Buttons** (Line 384-398) - 3 buttons (Polished, Matte, Brushed)
   - **Event**: `onClick={() => setSelectedFinish(finish)}`
   - **Action**: Selects surface finish

10. **Previous Step Button** (Line 419-424)
    - **Event**: `onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}`
    - **Action**: Goes to previous design step

11. **Next Step Button** (Line 425-431)
    - **Event**: `onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}`
    - **Action**: Goes to next design step

12. **Preview Image Thumbnail Buttons** (Line 454-473) - Multiple buttons (one per gallery image)
    - **Event**: `onClick={() => setActivePreview(idx)}`
    - **Action**: Changes preview image

13. **Add to Cart Button** (Line 527-548)
    - **Event**: `onClick={handleAddToCart}`
    - **Action**: Adds custom designed jewelry to cart

---

## 9. UserAuth.tsx (3 buttons)

### Location: `src/components/UserAuth.tsx`

1. **Register Mode Toggle Button** (Line 105-120)
   - **Event**: `onClick={() => { setMode('register'); setError(''); setSuccess(''); }}`
   - **Action**: Switches form to registration mode

2. **Login Mode Toggle Button** (Line 121-137)
   - **Event**: `onClick={() => { setMode('login'); setError(''); setSuccess(''); }}`
   - **Action**: Switches form to login mode

3. **Submit Form Button** (Line 329-335)
   - **Event**: `onSubmit={handleSubmit}` (form submission)
   - **Action**: Submits login or registration form

---

## 10. AdminLogin.tsx (1 button)

### Location: `src/components/AdminLogin.tsx`

1. **Login Submit Button** (Line 150-156)
   - **Event**: `onSubmit={handleSubmit}` (form submission)
   - **Action**: Validates admin credentials and redirects to admin panel

---

## Event Listener Summary by Type

### Navigation Events (15+)
- View switching (home, gallery, design, admin)
- Page navigation
- Modal open/close

### Shopping Cart Events (10+)
- Add to cart
- Remove from cart
- Update quantity
- Clear cart
- Checkout

### Product Interaction Events (8+)
- View product details
- Toggle wishlist
- Quick checkout
- Gallery navigation

### Admin Panel Events (8+)
- Refresh data
- View orders
- Update order status
- Delete orders/users

### Design Studio Events (20+)
- Step navigation
- Option selection (type, metal, gemstone, shape, carat, size, finish)
- Preview navigation
- Add custom design to cart

### Authentication Events (4)
- Login/Register mode toggle
- Form submission

### UI Control Events (5+)
- Theme toggle
- Modal close
- Search save

---

## Total Count by Component

1. **DesignStudio.tsx**: ~20 buttons
2. **ProductGallery.tsx**: ~10+ buttons (per product × number of products)
3. **AdminPanel.tsx**: ~10 buttons
4. **Header.tsx**: 7 buttons
5. **Cart.tsx**: 6 buttons
6. **ProductModal.tsx**: 4 buttons
7. **Hero.tsx**: 2 buttons
8. **CheckoutModal.tsx**: 2 buttons
9. **UserAuth.tsx**: 3 buttons
10. **AdminLogin.tsx**: 1 button

**Grand Total: 50+ button click event listeners**

---

## Notes

- Many buttons are rendered dynamically (e.g., per product in ProductGallery, per user in AdminPanel)
- Some buttons are conditional (e.g., Quick Checkout only shows if `onQuickCheckout` prop is provided)
- Form submissions use `onSubmit` which also triggers on button click
- Some buttons have multiple event handlers (e.g., `onClick` and `onSubmit`)







