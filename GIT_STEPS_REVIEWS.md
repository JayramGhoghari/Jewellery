# Git Steps to Add Reviews & Rating Page

## Files Created/Modified:
1. ✅ `src/components/Reviews.tsx` - New Reviews component
2. ✅ `app/reviews/page.tsx` - New Reviews page route
3. ✅ `app/MainLayout.tsx` - Updated to include reviews view
4. ✅ `src/components/Header.tsx` - Updated to include Reviews navigation

---

## Step-by-Step Git Commands:

### **Step 1: Check Current Status**
```bash
git status
```
*This shows all modified and new files*

---

### **Step 2: Add All Changes to Staging**
```bash
git add .
```
*OR add specific files:*
```bash
git add src/components/Reviews.tsx
git add app/reviews/page.tsx
git add app/MainLayout.tsx
git add src/components/Header.tsx
```

---

### **Step 3: Commit Changes**
```bash
git commit -m "Add Reviews and Rating page feature"
```
*OR with a more detailed message:*
```bash
git commit -m "Add Reviews and Rating page

- Created Reviews component with rating system
- Added reviews page route
- Updated MainLayout to include reviews view
- Added Reviews navigation to Header"
```

---

### **Step 4: Check Remote Repository**
```bash
git remote -v
```
*Verify your remote repository URL*

---

### **Step 5: Push to GitHub**
```bash
git push origin main
```
*OR if your branch is named differently:*
```bash
git push origin master
```

---

## Complete Command Sequence (Copy & Paste):

```bash
# Step 1: Check status
git status

# Step 2: Add all files
git add .

# Step 3: Commit with message
git commit -m "Add Reviews and Rating page feature"

# Step 4: Push to GitHub
git push origin main
```

---

## Alternative: If You Need to Create a New Branch

```bash
# Create and switch to new branch
git checkout -b feature/reviews-rating

# Add files
git add .

# Commit
git commit -m "Add Reviews and Rating page feature"

# Push new branch
git push -u origin feature/reviews-rating
```

---

## Troubleshooting:

### If you get "nothing to commit":
- Make sure you saved all files
- Check `git status` to see if files are already committed

### If push is rejected:
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### If you need to see what changed:
```bash
git diff
```

---

## Summary:
1. ✅ `git status` - Check changes
2. ✅ `git add .` - Stage all files
3. ✅ `git commit -m "message"` - Commit changes
4. ✅ `git push origin main` - Push to GitHub

**Total Steps: 4 simple commands!**

