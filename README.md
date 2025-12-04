# 🎰 Sistema de Predicción de Compras - Casino Santo Tomás

Sistema completo de gestión y predicción de stock para la cafetería del Casino Santo Tomás usando **Machine Learning**.

## ✨ Características

- 🤖 **Predicción de stock** con Random Forest
- 📊 **Gestión de productos y ventas** con MySQL
- 🔄 **API REST** completa en Node.js
- 🐍 **Microservicio de ML** en Python/Flask
- 📈 **Estadísticas** de ventas en tiempo real

---

## 🚀 Inicio Rápido

### 1. Requisitos Previos

- **Python 3.10+** (https://python.org)
- **Node.js 18+** (https://nodejs.org)
- **MySQL 5.7+** (https://mysql.com)

### 2. Configuración

```bash
# 1. Crear base de datos MySQL
mysql -u root -p < database/schema.sql

# 2. Configurar .env
# Edita el archivo .env con tus credenciales de MySQL

# 3. Doble click en:
INICIAR_TODO.bat
```

¡Listo! El sistema estará corriendo en:
- 🐍 ML API: http://localhost:5000
- 🟢 Backend: http://localhost:3000

---

## 📡 API Endpoints

### Predicciones (Machine Learning)

```bash
# Predecir stock para un producto
POST /api/predictions/predict
{
  "producto": "Café Americano",
  "dia_semana": "lunes",
  "mes": "enero"
}

# Predicción automática (todos los productos)
GET /api/predictions/predict/auto

# Predicción por lote
POST /api/predictions/predict/batch
{
  "productos": ["Café Latte", "Té", "Muffin"]
}

# Info del modelo
GET /api/predictions/model/info
```

### Productos

```bash
GET    /api/products           # Listar todos
POST   /api/products           # Crear nuevo
GET    /api/products/:id       # Obtener uno
PUT    /api/products/:id       # Actualizar
DELETE /api/products/:id       # Eliminar
```

### Ventas

```bash
GET  /api/sales                # Listar todas
POST /api/sales                # Registrar venta
GET  /api/sales/stats          # Estadísticas
GET  /api/sales/rango          # Por fechas
```

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│          FRONTEND (Futuro)              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Backend Node.js (Puerto 3000)       │
│  - Express.js                           │
│  - MySQL (Productos/Ventas)             │
│  - API REST                             │
└──────────────┬──────────────────────────┘
               │ HTTP
┌──────────────▼──────────────────────────┐
│   ML API Python (Puerto 5000)           │
│  - Flask                                │
│  - Random Forest Model                  │
│  - Scikit-learn                         │
└─────────────────────────────────────────┘
```

---

## 📊 Modelo de Machine Learning

- **Tipo:** Random Forest Regressor
- **Árboles:** 100
- **Features:** 4 (producto, día, mes, cantidad histórica)
- **Productos:** 11 tipos diferentes
- **Precisión:** Optimizado para predicción de stock

---

## 📂 Estructura del Proyecto

```
├── ml_api/                    # 🐍 API Python + Modelo ML
│   ├── app.py
│   ├── modelo_stock_rf.joblib
│   ├── codificador_productos.joblib
│   └── requirements.txt
├── src/                       # 🟢 Backend Node.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── saleController.js
│   │   └── predictionController.js
│   ├── routes/
│   └── app.js
├── database/
│   └── schema.sql
├── INICIAR_TODO.bat          # ⭐ Script inicio rápido
├── GUIA_DE_USO.md            # 📖 Guía completa
└── package.json
```

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Predecir stock de mañana

```bash
curl -X POST http://localhost:3000/api/predictions/predict \
  -H "Content-Type: application/json" \
  -d '{
    "producto": "Café Latte",
    "dia_semana": "miercoles",
    "mes": "diciembre"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "producto": "Café Latte",
    "stock_recomendado": 85
  }
}
```

### Ejemplo 2: Ver predicciones del día

```bash
curl http://localhost:3000/api/predictions/predict/auto
```

### Ejemplo 3: Registrar venta

```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "producto_id": 1,
    "cantidad": 2,
    "metodo_pago": "Tarjeta"
  }'
```

---

## 🛠️ Tecnologías

### Backend
- Node.js 18+
- Express.js
- MySQL2
- Axios

### Machine Learning
- Python 3.10+
- Flask
- Scikit-learn
- Joblib
- NumPy

---

## 📖 Documentación

- [Guía de Uso Completa](GUIA_DE_USO.md)
- [Guía de Instalación](INSTALACION.md)
- [Registro de Cambios](CAMBIOS.md)

---

## 🆘 Solución de Problemas

### Error: "Python no reconocido"
Reinstala Python y marca "Add to PATH" durante la instalación.

### Error: "Cannot connect to database"
Verifica tus credenciales en el archivo `.env`

### Error: "ML API not available"
Asegúrate de que el servidor Python esté corriendo en el puerto 5000.

Ver [GUIA_DE_USO.md](GUIA_DE_USO.md) para más detalles.

---

## 🚀 Próximos Pasos

- [ ] Crear frontend con React/Vue
- [ ] Agregar autenticación JWT
- [ ] Dashboard de analíticas
- [ ] Notificaciones de stock bajo
- [ ] Deploy en producción

---

## 👥 Autores

Universidad Santo Tomás - Ingeniería Informática:
- Renato Romo
- Samuel Carrasco
- Hayutson Palominos
- Jorge Lecaro
- José Cornejo

---

## 📄 Licencia

ISC

---

⭐ **¿Te gusta el proyecto?** ¡Dale una estrella!
