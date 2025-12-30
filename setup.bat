@echo off
echo Setting up FITZDO E-Commerce Application...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
echo.

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
echo.

echo Setup complete!
echo.
echo To start the application:
echo 1. Backend: cd backend && npm run seed && npm run dev
echo 2. Frontend: cd frontend && npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
pause