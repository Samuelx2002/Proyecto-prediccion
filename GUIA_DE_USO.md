# 🚀 GUÍA DE USO - Sistema Completo con Machine Learning

## 📦 INSTALACIÓN INICIAL

### 1. Instalar Python

**Opción A: Desde el sitio oficial**
1. Ve a https://www.python.org/downloads/
2. Descarga Python 3.10 o superior
3. ⚠️ **IMPORTANTE:** Durante la instalación, marca "Add Python to PATH"
4. Instala normalmente

**Verificar instalación:**
```bash
python --version
pip --version
```

### 2. Instalar Node.js

1. Ve a https://nodejs.org/
2. Descarga la versión LTS
3. Instala normalmente
4. Reinicia tu computadora

**Verificar instalación:**
```bash
node --version
npm --version
```

### 3. Instalar MySQL

1. Descarga desde https://dev.mysql.com/downloads/installer/
2. Instala MySQL Server
3. Configura contraseña para el usuario root
4. Ejecuta el script `database/schema.sql` para crear la base de datos

---

## 🎯 INICIAR EL SISTEMA

### Opción 1: Inicio Automático (Recomendado)

**Doble click en:** `INICIAR_TODO.bat`

Esto abrirá 2 ventanas:
- 🐍 API de Machine Learning (Puerto 5000)
- 🟢 Backend Node.js (Puerto 3000)

### Opción 2: Inicio Manual

**Terminal 1 - API de Machine Learning:**
```bash
cd ml_api
pip install -r requirements.txt
python app.py
```

**Terminal 2 - Backend Node.js:**
```bash
npm install
npm start
```

---

## 📡 ENDPOINTS DISPONIBLES

### 🔹 PREDICCIONES (Machine Learning)

#### 1. Predecir stock para UN producto
```bash
POST http://localhost:3000/api/predictions/predict

Body:
{
  "producto": "Café Americano",
  "dia_semana": "lunes",
  "mes": "enero",
  "cantidad_historica": 50
}

Respuesta:
{
  "success": true,
  "data": {
    "producto": "Café Americano",
    "stock_recomendado": 75,
    "dia_semana": 0,
    "mes": 1
  }
}
```

#### 2. Predecir stock para VARIOS productos
```bash
POST http://localhost:3000/api/predictions/predict/batch

Body:
{
  "productos": ["Café Americano", "Té", "Muffin"],
  "dia_semana": "martes",
  "mes": "febrero"
}

Respuesta:
{
  "success": true,
  "data": [
    {
      "producto": "Café Americano",
      "stock_recomendado": 80
    },
    {
      "producto": "Té",
      "stock_recomendado": 45
    },
    {
      "producto": "Muffin",
      "stock_recomendado": 60
    }
  ]
}
```

#### 3. Predicción AUTOMÁTICA (todos los productos del día)
```bash
GET http://localhost:3000/api/predictions/predict/auto

Respuesta:
{
  "success": true,
  "data": {
    "fecha": "2024-11-29",
    "dia_semana": 4,
    "mes": 11,
    "predicciones": [
      {
        "producto": "Café Americano",
        "stock_recomendado": 85
      },
      {
        "producto": "Café Latte",
        "stock_recomendado": 70
      },
      ...
    ]
  }
}
```

#### 4. Información del modelo
```bash
GET http://localhost:3000/api/predictions/model/info

Respuesta:
{
  "success": true,
  "data": {
    "tipo": "Random Forest Regressor",
    "n_estimadores": 100,
    "n_features": 4,
    "productos_soportados": 11
  }
}
```

#### 5. Verificar estado del servicio ML
```bash
GET http://localhost:3000/api/predictions/status
```

---

### 🔹 PRODUCTOS

```bash
GET    /api/products           # Listar todos
GET    /api/products/:id       # Obtener uno
POST   /api/products           # Crear nuevo
PUT    /api/products/:id       # Actualizar
DELETE /api/products/:id       # Eliminar
```

---

### 🔹 VENTAS

```bash
GET  /api/sales                # Listar todas
GET  /api/sales/:id            # Obtener una
POST /api/sales                # Registrar venta
GET  /api/sales/stats          # Estadísticas
GET  /api/sales/rango          # Por rango de fechas
```

---

## 💡 EJEMPLOS DE USO

### Ejemplo 1: Obtener predicción para mañana

```bash
curl -X POST http://localhost:3000/api/predictions/predict \
  -H "Content-Type: application/json" \
  -d '{
    "producto": "Café Latte",
    "dia_semana": "miercoles",
    "mes": "diciembre"
  }'
```

### Ejemplo 2: Ver predicciones de hoy

```bash
curl http://localhost:3000/api/predictions/predict/auto
```

### Ejemplo 3: Registrar una venta

```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "producto_id": 1,
    "cantidad": 3,
    "metodo_pago": "Efectivo"
  }'
```

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
Modelo_predicciones_Casino_Santo_Tomas/
│
├── ml_api/                          # 🐍 API de Machine Learning (Python)
│   ├── app.py                       # Servidor Flask
│   ├── modelo_stock_rf.joblib       # Modelo entrenado
│   ├── codificador_productos.joblib # Codificador
│   └── requirements.txt             # Dependencias Python
│
├── src/                             # 🟢 Backend Node.js
│   ├── config/
│   │   └── database.js              # Conexión MySQL
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── saleController.js
│   │   └── predictionController.js  # ⭐ Nuevo
│   ├── routes/
│   │   ├── products.js
│   │   ├── sales.js
│   │   └── predictions.js           # ⭐ Nuevo
│   └── app.js                       # Servidor principal
│
├── database/
│   └── schema.sql                   # Base de datos MySQL
│
├── INICIAR_TODO.bat                 # ⭐ Script de inicio automático
├── start_ml_api.bat                 # Iniciar solo Python
├── start_backend.bat                # Iniciar solo Node.js
├── .env                             # Configuración
└── package.json                     # Dependencias Node.js
```

---

## 🔧 CONFIGURACIÓN

### Archivo `.env`

```env
# Node.js
PORT=3000

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=casino_santo_tomas

# API de ML (Python)
ML_API_URL=http://localhost:5000
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: "Python no reconocido"
- Reinstala Python y marca "Add to PATH"
- Reinicia tu computadora

### Error: "pip no reconocido"
- Ejecuta: `python -m pip install -r requirements.txt`

### Error: "Cannot connect to ML API"
- Asegúrate de que el servidor Python esté corriendo (puerto 5000)
- Verifica que no haya firewall bloqueando

### Error: "Module not found"
- En la carpeta ml_api ejecuta: `pip install -r requirements.txt`
- En la raíz ejecuta: `npm install`

---

## 📊 PRODUCTOS SOPORTADOS POR EL MODELO

1. Café Americano
2. Café Latte
3. Cappuccino
4. Chocolate Caliente
5. Coca-Cola
6. Muffin
7. Papitas
8. Pepsi
9. Souffles (Suffles)
10. Sándwich
11. Té

---

## 🎓 TECNOLOGÍAS UTILIZADAS

- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Machine Learning:** Python + Flask + Scikit-learn
- **Modelo:** Random Forest Regressor
- **Comunicación:** REST API + Axios

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Importar datos históricos del CSV
2. ✅ Usar predicciones para optimizar stock
3. 📊 Crear dashboard visual
4. 📱 Desarrollar app móvil
5. ☁️ Deploy en la nube

---

¡Sistema listo para usar! 🎉
