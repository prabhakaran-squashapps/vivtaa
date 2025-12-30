# FITZDO E-Commerce Application

A full-stack e-commerce web application built with React.js, Node.js, Express, and MongoDB. Features user authentication, product browsing, shopping cart, and responsive design.

## 🚀 Live Demo
- **Frontend**: [Deployed on Vercel/Netlify]
- **Backend**: [Deployed on Render/Railway]

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Testing](#testing)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes

### 🛍️ Product Management
- Product listing with pagination (12 items per page)
- Product detail pages
- Search functionality
- Category filtering
- 35+ products across 7 categories

### 🛒 Shopping Cart
- Add/remove products
- Quantity management
- Cart persistence (localStorage)
- Total price calculation
- Clear cart functionality

### 📱 Responsive Design
- **Desktop**: Full sidebar, multi-column layout
- **Tablet**: Responsive grid, optimized spacing
- **Mobile**: Slide-out sidebar, touch-friendly UI
- **Small Mobile**: Single column, compact design

### 🎨 UI/UX
- Clean, modern design (Amazon/Flipkart style)
- Loading states and error handling
- Professional typography and spacing
- Hover effects and smooth transitions

## 🛠️ Tech Stack

### Frontend
- **React.js** with TypeScript
- **CSS3** for styling (no external UI library)
- **Axios** for API calls
- **React Router** for navigation
- **LocalStorage** for cart persistence

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables

### Database
- **MongoDB Atlas** (Cloud database)
- 7 product categories
- 35+ sample products
- User authentication schema

## 📁 Project Structure

```
fitzdo-ecommerce/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useCart.ts
│   │   ├── pages/
│   │   │   ├── CartPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProductDetailPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── products.js
│   ├── .env
│   ├── package.json
│   ├── seedProducts.js
│   └── server.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/fitzdo-ecommerce.git
cd fitzdo-ecommerce
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_jwt_secret_key" >> .env
echo "PORT=5000" >> .env

# Seed database with sample products
node seedProducts.js

# Start backend server
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start frontend development server
npm start
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get Products (with Pagination)
```http
GET /api/products?page=1&limit=12&search=iphone&category=Mobile
```

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 35,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Get Categories
```http
GET /api/products/categories
```

### Sample Product Data
```json
{
  "_id": "product_id",
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "category": "Mobile",
  "price": 999,
  "image": "https://images.unsplash.com/...",
  "description": "Latest iPhone with advanced features",
  "specifications": "6.1-inch display, A17 Pro chip, 128GB storage",
  "rating": 4.8
}
```

## 📱 Screenshots

### Desktop View
![Desktop Product Listing](screenshots/desktop-products.png)
![Desktop Product Detail](screenshots/desktop-detail.png)

### Tablet View
![Tablet Layout](screenshots/tablet-view.png)

### Mobile View
![Mobile Products](screenshots/mobile-products.png)
![Mobile Cart](screenshots/mobile-cart.png)

## 🧪 Testing

### Manual Testing Checklist
- ✅ User registration and login
- ✅ Product listing and pagination
- ✅ Search and category filtering
- ✅ Product detail pages
- ✅ Add to cart functionality
- ✅ Cart management (add/remove/update)
- ✅ Responsive design on all devices
- ✅ Error handling and loading states

### Test User Credentials
```
Email: test@example.com
Password: test123
```

## 🌟 Key Features Demonstrated

### Technical Skills
- **Full-Stack Development**: Complete MERN stack implementation
- **Authentication**: Secure JWT-based auth system
- **Database Design**: MongoDB schemas and relationships
- **API Development**: RESTful APIs with pagination
- **Frontend Architecture**: Component-based React structure
- **State Management**: React hooks and localStorage
- **Responsive Design**: Mobile-first CSS approach

### Best Practices
- **Security**: Password hashing, JWT tokens, input validation
- **Performance**: Pagination, lazy loading, optimized queries
- **UX/UI**: Loading states, error handling, intuitive navigation
- **Code Quality**: TypeScript, modular components, clean architecture
- **Scalability**: Organized folder structure, reusable components

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel
```

### Backend (Render)
```bash
# Deploy to Render with environment variables
```

## 📞 Contact Information

**Developer**: [Your Name]  
**Email**: [your.email@example.com]  
**LinkedIn**: [linkedin.com/in/yourprofile]  
**GitHub**: [github.com/yourusername]  

---

## 📄 License
This project is created for interview purposes and demonstration of technical skills.

---

**Built with ❤️ for FITZDO E-Commerce Platform**