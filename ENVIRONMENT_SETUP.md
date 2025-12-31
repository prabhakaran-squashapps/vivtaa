# Environment Setup

## Backend Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. Update `.env` with your values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `PORT`: Server port (default: 5000)

## Frontend Environment Variables (if needed)

Create `frontend/.env` for React environment variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Note:** Never commit `.env` files to version control!