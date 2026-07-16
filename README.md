# 🛒 Amazon Clone — Full Stack E-Commerce Application

A full-stack e-commerce web application inspired by Amazon, built with React, Node.js, Express, and PostgreSQL. Users can browse products, manage a cart, and place orders; admins can add, edit, and delete products through a dedicated admin panel.

**Live demo:-** https://amazon-clone-fullstack-five.vercel.app/

---

## 🚀 Features

### Authentication
- User registration and login
- Passwords hashed with bcrypt
- JWT-based session tokens (1 hour expiry)
- Role stored on the user (`user` / `admin`)

### Shopping
- Browse all products on the home page
- Client-side search/filter by product title
- Product details page with an "Add to Cart" / "Buy Now" buy box
- Cart with quantity controls, item removal, and a running subtotal
- Place an order from the cart (cart is cleared server-side after checkout)
- Order history page

### Admin Panel
- `/admin`, `/admin/add-product`, and `/admin/edit-product/:id` are **publicly viewable** in this build — anyone can see the panel, which is intentional for demo/portfolio purposes.
- Add, edit, and delete actions are still restricted server-side: the API rejects any create/update/delete request unless the request's JWT belongs to a user with `role = 'admin'`. A non-admin visitor can look at the panel but every mutating action fails with a 401/403 from the backend.
- Product images upload to Cloudinary via Multer.

> Note: there's currently no self-serve way to become an admin. `/become-seller` is a static page with a `mailto:` link — promoting a user to `role = 'admin'` is a manual step (update the row directly in the `users` table).

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, React Router DOM 7, Vite |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (`pg`) |
| Auth | JWT (`jsonwebtoken`), bcrypt |
| File uploads | Multer + `multer-storage-cloudinary` → Cloudinary |
| Hosting (recommended) | Railway (backend + Postgres), Vercel/Netlify/Railway (frontend) |

---

## 📁 Project Structure

```
amazon-clone-fullstack-main/
├── backend/
│   └── src/
│       ├── config/          # db.js (Postgres pool), cloudinary.js
│       ├── controllers/     # authController, productController, cartController,
│       │                    # orderController, createProduct (admin CRUD)
│       ├── middleware/      # authMiddleware (JWT check), adminMiddleware (role check),
│       │                    # uploadMiddleware (multer/cloudinary)
│       ├── routes/          # authRoutes, productRoutes, cartRoutes, orderRoutes,
│       │                    # createProductRoutes
│       ├── app.js
│       └── server.js
└── frontend/
    └── src/
        ├── components/      # Navbar, ProductCard, ProtectedRoute
        ├── pages/            # Home, Login, Signup, Profile, Cart, Orders,
        │                    # Productdetails, AdminDashboard, AdminAddProducts,
        │                    # EditProduct, BecomeSeller
        ├── App.jsx
        └── main.jsx
```

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd amazon-clone-fullstack-main
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

`DATABASE_URL` is a single Postgres connection string (this is what Railway provides directly — no need to split it into host/user/password). SSL is enabled automatically when the URL contains `railway`.

```bash
npm run dev     # nodemon, for local development
npm start        # production
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Point this at your deployed backend URL in production.

```bash
npm run dev       # local dev server
npm run build     # production build
```

---

## 📡 API Reference

All endpoints are prefixed with the backend base URL.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | — | Register a new user |
| POST | `/api/auth/login` | — | Log in, returns a JWT + user object |
| GET | `/api/auth/profile` | JWT | Get the logged-in user's profile |
| GET | `/api/products` | — | List all products |
| GET | `/api/products/:id` | — | Get a single product |
| GET | `/api/cart` | JWT | Get the logged-in user's cart |
| POST | `/api/cart` | JWT | Add an item to the cart |
| PUT | `/api/cart/:id` | JWT | Update a cart item's quantity |
| DELETE | `/api/cart/:id` | JWT | Remove a cart item |
| POST | `/api/orders` | JWT | Place an order from the current cart |
| GET | `/api/orders` | JWT | List the logged-in user's orders |
| POST | `/api/createProduct` | JWT + admin | Create a product (multipart, field `image`) |
| PUT | `/api/createProduct/:id` | JWT + admin | Update a product (multipart, field `image` optional, `existingImage` to keep current image) |
| DELETE | `/api/createProduct/:id` | JWT + admin | Delete a product |

JWT is sent as `Authorization: Bearer <token>`.

---

## 🎯 Known Limitations / Future Improvements

- No real seller-onboarding flow — promoting a user to admin is manual
- No payment gateway integration (checkout just records an order)
- Order history doesn't group multiple items from a single checkout into one order — each product line is its own row
- No product categories/filter UI beyond search-by-title
- No automated tests
- Planned: Tailwind CSS, product reviews/ratings, wishlist, CI/CD, Docker

---

## 👨‍💻 Author

**Om Mahto**
B.Tech Information Technology Student
Interested in Full Stack Development, AI Applications, Cloud Computing, and System Design.
