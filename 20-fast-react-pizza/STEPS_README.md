# SECTION 21 - LECTURE 284: Fetching Data With React Router "Loaders": Pizza Menu

This document lists every significant step taken since the previous branch (`section21lecture284`), all new dependencies, and the exact code/project-structure changes applied. Everything is concise, clear and in English.

---

## 1. Installed Dependencies

```bash
npm install react-router-dom            # Client-side routing (React Router v6+)
```

*No other third-party packages were added in this iteration.*

---

## 2. Router Integration in `App.jsx`

**Goal:** Convert the app into a Single Page Application with modern, nested routing.

### Key Modifications

#### Before
```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* routes here */}
    </Router>
  );
}
```

#### After
```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // Shared layout (header, cart overview)
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

**Outcome:**
1. Clean, semantic URLs for every view.
2. Shared UI (header + cart overview) rendered once via `AppLayout`.
3. Full browser history/back-button support without page reloads.

### Why the `children` array matters
The `children` array inside the router definition **nests** all route objects under a single parent (`AppLayout`). This brings two major advantages:

1. **Single Render of Shared Elements**  
   `AppLayout` includes the `Header`, the main `<Outlet />` (where each child page is shown) and the persistent `CartOverview`. Because these elements live **above** the `children`, they mount **once** and stay visible during navigation—no flicker, faster UX.

2. **Logical URL-to-Component mapping**  
   Each object in `children` represents a page:

   | Path | Rendered in `<Outlet />` | Purpose |
   | --- | --- | --- |
   | `/` | `Home` | Landing page with welcome & CTA |
   | `/menu` | `Menu` | Pizza catalogue |
   | `/cart` | `Cart` | Current cart contents |
   | `/order/new` | `CreateOrder` | Checkout form |
   | `/order/:orderId` | `Order` | Order detail/confirmation |

   While you navigate between these paths, **only** the component listed in the table swaps inside `<Outlet />`. The `Header` component (from `AppLayout`) **remains mounted**, ensuring consistent branding and navigation across pages.

> TL;DR: `children` keeps routing lean, reuses layout UI, and centralises route configuration for scalability.

---

## 3. New UI Components

| File | Purpose |
| --- | --- |
| `src/ui/Header.jsx` | Brand link & app title, used across all pages. |
| `src/ui/AppLayout.jsx` | Wraps every route with `Header`, `<Outlet />` for routed content, and persistent `CartOverview`. |

### Example: `Header.jsx`
```jsx
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <Link to="/">Fast React Pizza Co.</Link>
    <p>Luiggi's Pizzeria</p>
  </header>
);

export default Header;
```

### Example: `AppLayout.jsx`
```jsx
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
    <CartOverview />
  </div>
);

export default AppLayout;
```

---

## 4. Updated Project Structure (new/changed items ★)

```
src/
├── ui/
│   ├── Header.jsx ★
│   ├── AppLayout.jsx ★
│   └── Home.jsx
├── App.jsx ★ (rewritten with router)
└── … (features, services, utils remain unchanged)
```

---

## 5. Documentation Enhancements

* `README.md` expanded with:
  * Project structure tree.
  * Learning objectives, SDLC focus, scope & risks.
  * Installation section for `react-router-dom`.
  * Detailed explanation of the new routing system.

---

## 6. Next Steps (high-level)

1. Integrate **Redux Toolkit** for global state.
2. Add comprehensive **form validation & error handling**.
3. Implement **responsive design & performance optimisations**.
4. Introduce **unit/integration tests**.

---

> Last updated: $(date)
