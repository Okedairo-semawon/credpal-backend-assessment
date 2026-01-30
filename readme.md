# CredPal Backend Assessment

## 📌 Project Overview
This project is a **Backend CRUD API** built as part of the **CredPal Backend Developer Assessment**.  
It provides user authentication and product management functionality using **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

The API allows registered users to:
- Sign up and log in
- Create, read, update, and delete products
- Restrict product modification to the product creator
- Secure routes using JWT authentication

---

## 🛠️ Tech Stack
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- Postman (API testing)

---

## 📁 Project Structure
src/
├── config/
│ └── db.ts
├── controllers/
│ ├── authController.ts
│ └── productController.ts
├── middlewares/
│ ├── authMiddleware.ts
│ └── validator.ts
├── models/
│ ├── userModel.ts
│ └── productModel.ts
├── routes/
│ └── api.ts
├── function/
│ └── token.ts
├── index.ts
└── server.ts


---

## 🔐 Authentication
- JWT-based authentication
- Protected routes require a valid token
- Only authenticated users can create products
- Only the product creator can update or delete a product

---

## 📦 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user and return JWT |

### Products
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/product/create` | Create a product (Protected) |
| GET | `/api/product/getProducts` | Get all products |
| GET | `/api/product/getProduct/:id` | Get product by ID |
| PUT | `/api/product/update/:id` | Update product (Owner only) |
| DELETE | `/api/product/delete/:id` | Delete product (Owner only) |

---

## ⚙️ Environment Variables
Create a `.env` file in the project root:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/credpal-backend-assessment.git
cd credpal-backend-assessment
npm install
npm run dev
http://localhost:5000

