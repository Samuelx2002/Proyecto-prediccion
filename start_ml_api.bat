@echo off
echo ========================================
echo Iniciando API de Machine Learning
echo ========================================
echo.

cd ml_api

echo Instalando dependencias de Python...
pip install -r requirements.txt

echo.
echo Iniciando servidor Python en puerto 5000...
python app.py

pause
