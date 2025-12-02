@echo off
echo ========================================
echo Iniciando Backend Node.js
echo ========================================
echo.

echo Instalando dependencias de Node.js...
call npm install

echo.
echo Iniciando servidor Node.js en puerto 3000...
npm start

pause
