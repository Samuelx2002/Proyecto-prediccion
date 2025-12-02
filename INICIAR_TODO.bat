@echo off
echo ========================================
echo Sistema de Prediccion Casino Santo Tomas
echo ========================================
echo.
echo Este script iniciara:
echo   1. API de Machine Learning (Python) - Puerto 5000
echo   2. Backend Node.js - Puerto 3000
echo.
echo Abriendo ambos servicios...
echo.

start "ML API - Python" cmd /k "cd ml_api && pip install -r requirements.txt && python app.py"

timeout /t 3 /nobreak >nul

start "Backend - Node.js" cmd /k "npm install && npm start"

echo.
echo ========================================
echo Servicios iniciados!
echo ========================================
echo.
echo API ML:      http://localhost:5000
echo Backend:     http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar esta ventana
echo (Los servicios seguiran corriendo en las otras ventanas)
pause >nul
