# FITZDO E-Commerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully"
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 🛍️ Product Endpoints

### 1. Get Products (with Pagination)
**GET** `/products`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `search` (optional): Search term
- `category` (optional): Filter by category

**Example Request:**
```
GET /api/products?page=2&limit=10&search=iphone&category=Mobile
```

**Response (200):**
```json
{
  "products": [
    {
      "_id": "product_id",
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "category": "Mobile",
      "price": 999,
      "image": "https://images.unsplash.com/...",
      "rating": 4.8
    }
  ],
  "pagination": {
    "currentPage": 2,
    "totalPages": 5,
    "totalProducts": 47,
    "hasNext": true,
    "hasPrev": true
  }
}
```

### 2. Get Product by ID
**GET** `/products/:id`

**Response (200):**
```json
{
  "_id": "product_id",
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "category": "Mobile",
  "price": 999,
  "image": "https://images.unsplash.com/...",
  "description": "The latest iPhone with advanced camera system and A17 Pro chip.",
  "specifications": "6.1-inch display, A17 Pro chip, 128GB storage, Triple camera system",
  "rating": 4.8,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error (404):**
```json
{
  "message": "Product not found"
}
```

### 3. Get Categories
**GET** `/products/categories`

**Response (200):**
```json
[
  "Mobile",
  "Laptop", 
  "Audio",
  "Dress",
  "Fitness & Training",
  "Home & Kitchen",
  "Books"
]
```

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  brand: String (required),
  category: String (required),
  price: Number (required),
  image: String (required),
  description: String (required),
  specifications: String (required),
  rating: Number (required, 1-5),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

### Password Hashing
- Uses bcrypt with salt rounds: 10
- Passwords never stored in plain text

### JWT Authentication
- Token expiration: 24 hours
- Secret key stored in environment variables
- Middleware validates tokens on protected routes

### Input Validation
- Email format validation
- Password minimum length: 6 characters
- MongoDB injection prevention

---

## 📈 Performance Features

### Pagination
- Default: 12 products per page
- Configurable limit parameter
- Efficient MongoDB skip/limit queries

### Database Indexing
- Email field indexed for faster user lookups
- Category field indexed for filtering
- Created date indexed for sorting

### Query Optimization
- Select only required fields for listing
- Full document only for detail pages
- Aggregation for category counts

---

## 🚨 Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

---

## 🧪 Testing Examples

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Products:**
```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=5"
```

**Get Product Details:**
```bash
curl -X GET http://localhost:5000/api/products/PRODUCT_ID
```

### Using Postman
Import the following collection:
```json
{
  "info": {
    "name": "FITZDO E-Commerce API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
            },
            "url": "{{baseUrl}}/auth/register"
          }
        }
      ]
    }
  ]
}
```

---

## 🌍 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitzdo
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Sample Data

The application includes 35 sample products across 7 categories:

- **Mobile** (5 products): iPhone, Samsung, OnePlus, Google Pixel, Xiaomi
- **Laptop** (5 products): MacBook, Dell, ThinkPad, HP, ASUS
- **Audio** (5 products): AirPods, Sony, Bose, JBL, Sennheiser  
- **Dress** (5 products): Summer, Business, Cocktail, Casual, Wedding
- **Fitness & Training** (5 products): Dumbbells, Yoga Mat, Resistance Bands, Treadmill, Kettlebell
- **Home & Kitchen** (5 products): Coffee Maker, Air Fryer, Stand Mixer, Instant Pot, Blender
- **Books** (5 products): Psychology of Money, Atomic Habits, Think and Grow Rich, 7 Habits, Rich Dad Poor Dad

---

**API Version**: 1.0  
**Last Updated**: January 2024  
**Contact**: developer@fitzdo.com