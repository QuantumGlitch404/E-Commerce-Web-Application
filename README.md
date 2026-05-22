<div align="center">
  <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" alt="LuxeShop Banner" width="100%" style="border-radius: 16px; margin-bottom: 20px;"/>
  
  <h1 align="center">LuxeShop | Premium E-Commerce Application</h1>
  <p align="center">
    <strong>A breathtaking, ultra-modern full-stack e-commerce platform built with the MERN stack, featuring Apple/Vercel-tier UI aesthetics, glassmorphism, and neon gradients.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  </p>
</div>

<hr />

## ✨ Features

### 🎨 Stunning UI/UX Design
* **Apple/Vercel Aesthetics:** Deep AMO-LED black background (`#000000`), glassmorphic cards (`backdrop-filter: blur(20px)`), and neon diagonal gradients.
* **Micro-Interactions:** Custom `cubic-bezier` hover animations, dynamic scale-ups on product cards, and beautifully animated navbar shrinking on scroll.
* **Floating Geometry Hero:** Continuous ambient floating neon shapes (circles, triangles, rectangles) with calculated animation delays in the Hero section.
* **Pixel-Perfect Typography:** Integration of `Orbitron` for futuristic mega-headlines, `Rajdhani` for sleek uppercase buttons/links, and `Inter` for highly readable body text.
* **Beautiful Empty States:** Implemented custom animated empty states with glowing faded icons when no products/deals are found, preventing jarring blank screens.

### ⚙️ Robust Backend Engine
* **Express 5.0 Architecture:** Built utilizing the latest Express standard.
* **Dynamic Database Fallback Engine:** Features a brilliant `mongodb-memory-server` fallback. If the local network blocks the MongoDB Atlas SRV connection, the server instantly spins up an in-memory database engine and automatically seeds 50 premium products and an admin user, guaranteeing 100% uptime and testability locally.
* **Secure Authentication:** JWT-based authentication stored in secure `httpOnly` cookies. Passwords hashed via `bcryptjs`.
* **Advanced Error Handling:** Comprehensive global error handler capturing Mongoose validation errors, duplicate key errors, and JWT issues.
* **Complex Data Modeling:** Advanced Mongoose schemas handling deeply nested structures (e.g., product variations, user addresses).

### 🛒 E-Commerce Capabilities
* Complete User Authentication (Register, Login, Password Reset, Email Verification)
* Dynamic Product Grids with Loading Skeletons
* Category Filtering and Special Deals queries
* Custom Toast Notifications via `react-hot-toast`
* Highly optimized Vite development environment proxying seamless requests to the backend.

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React 18 (Vite), React Router DOM v6
* **Styling:** Tailwind CSS v3, PostCSS, Vanilla Custom CSS (`index.css`)
* **State Management:** Redux Toolkit, React Redux
* **Data Fetching:** Axios
* **UI Components:** React Icons, React Hot Toast, React Lazy Load Image Component

### Backend
* **Core:** Node.js, Express 5.0
* **Database:** MongoDB Atlas, Mongoose v8
* **Security:** Helmet, Express Rate Limit, Cookie Parser, JSON Web Token (JWT), Bcrypt.js
* **Utilities:** Nodemailer (SMTP Emails), Slugify, Cloudinary (Image Hosting)
* **Fail-Safe Dev:** `mongodb-memory-server`

---

## 📂 Project Structure

```text
E-CommerceWebApplicationSubmission/
├── backend/
│   ├── config/         # Database and Cloudinary configurations
│   ├── controllers/    # Route controllers (auth, product, category)
│   ├── middleware/     # Auth checks, global error handler, async wrapper
│   ├── models/         # Mongoose schemas (User, Product, Category)
│   ├── routes/         # Express router definitions
│   ├── utils/          # Token generation, Email service, seed script
│   ├── server.js       # Main Express application entry point
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Hero, ProductCard)
│   │   ├── pages/      # Route pages (Home, Shop, Login, Register)
│   │   ├── redux/      # Redux store and slices
│   │   ├── App.jsx     # Main React router application
│   │   └── index.css   # Global custom styling & Tailwind directives
│   ├── vite.config.js  # Vite configuration & proxy rules
│   └── package.json
└── README.md
```

---

## 🚀 Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Git](https://git-scm.com/)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or rely on the built-in memory fallback)

### 2. Clone the Repository
```bash
git clone https://github.com/QuantumGlitch404/E-Commerce-Web-Application.git
cd E-Commerce-Web-Application
```

### 3. Install Dependencies
You need to install dependencies for both the frontend and backend.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 4. Environment Variables
Create a `.env` file in the `backend` directory. Use the following template:

```env
NODE_ENV=development
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.../luxeshop?retryWrites=true&w=majority

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_NAME=LuxeShop
FROM_EMAIL=noreply@luxeshop.com
```

### 5. Running the Application (One-Command Boot)
The project is configured using `concurrently` in the backend to start both the frontend and backend servers simultaneously.

```bash
cd backend
npm run dev
```

* **Frontend runs on:** `http://localhost:5173`
* **Backend API runs on:** `http://localhost:5000`

*(Note: The frontend is configured to proxy `/api` requests seamlessly to `http://localhost:5000` to prevent CORS issues).*

---

## 🛡️ The Database Fail-Safe Mechanism (Important)

If you are running this project on a local network or VPN that blocks outbound DNS SRV resolution to MongoDB Atlas (`querySrv ECONNREFUSED`), the backend is engineered to **never crash**.

Instead, it catches the network error and automatically provisions a local **MongoDB Memory Server**. 
1. It downloads a lightweight local instance of MongoDB.
2. It boots it in memory on a random port.
3. It automatically executes the `seedData.js` script to populate the local engine with 50 premium dummy products, categories, and an Admin user.
4. It connects your API instantly.

**Pre-seeded Admin Account (Use this to test login instantly):**
* **Email:** `admin@luxeshop.com`
* **Password:** `Admin@123`

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & get token | Public |
| `GET` | `/api/auth/me` | Get current logged-in user | Private |
| `GET` | `/api/products` | Get all products (supports query params) | Public |
| `GET` | `/api/products/:id` | Get single product by ID | Public |
| `GET` | `/api/categories` | Get all categories | Public |

*(More endpoints exist for cart, orders, and admin controls within the router definitions).*

---

## 🎨 Design Philosophy

LuxeShop was not built to be a standard template. It was designed from the ground up to mimic the premium aesthetics found on high-end tech and luxury brand websites.

* **"Text-Glow" Utility:** A custom CSS class ensuring headlines radiate light into the dark background.
* **Glassmorphism Layering:** The `glass-card` CSS utility layers transparent, blurred backgrounds with subtle 1px white/neon borders to simulate frosted glass resting on top of the black canvas.
* **Component Precision:** The `ProductCard` utilizes exactly a 1:1 image aspect ratio container, ensuring uniform grid layouts regardless of the original image dimensions. Quick action buttons dynamically slide in upon mouse hover.

---

<div align="center">
  <p>Built with ❤️ for E-Commerce Excellence.</p>
</div>
