# 🎨 DASHBOARD WEB - GUÍA DE USO

## 📍 UBICACIÓN

El dashboard está en: `public/dashboard.html`

## 🚀 CÓMO USARLO

### **PASO 1: Iniciar los servidores**

Necesitas tener **ambos servidores corriendo**:

#### Terminal 1: Backend Node.js
```bash
cd ruta/al/proyecto
npm start
```
Esto inicia el servidor en **puerto 3000**

#### Terminal 2: API de Machine Learning
```bash
cd ruta/al/proyecto/ml_api
python app.py
```
Esto inicia el servidor en **puerto 5000**

### **PASO 2: Abrir el dashboard**

1. Ve a la carpeta `public/`
2. **Doble click** en `dashboard.html`
3. Se abrirá en tu navegador

¡Listo! Ya puedes usar el dashboard.

---

## 🎯 FUNCIONALIDADES

### 📊 **Pestaña: Predicciones**

#### 🔮 Predicción Individual
- Selecciona un producto
- Elige el día de la semana
- Elige el mes
- Click en "Predecir Stock"
- **Resultado:** Te dice cuántas unidades necesitas

#### 🎯 Predicción Automática
- Click en "Generar Predicciones del Día"
- **Resultado:** Predicciones para TODOS los productos

#### 📊 Gráfico de Predicción
- Se actualiza automáticamente
- Compara cantidad histórica vs stock recomendado

---

### 📦 **Pestaña: Productos**

#### ➕ Agregar Producto
- Nombre del producto
- Precio
- Categoría
- Click en "Agregar Producto"

#### 📋 Lista de Productos
- Ve todos los productos disponibles
- Precios y categorías
- Click en "Actualizar Lista" para refrescar

---

### 💰 **Pestaña: Ventas**

#### Registrar Venta
- Selecciona producto
- Cantidad
- Método de pago (Efectivo, Tarjeta, Transferencia, Junaeb)
- Click en "Registrar Venta"

#### 📜 Últimas Ventas
- Ve las últimas 10 ventas
- Fecha, hora, producto, cantidad, total
- Click en "Actualizar" para refrescar

---

### 📈 **Pestaña: Estadísticas**

- Total de ventas realizadas
- Monto total vendido
- Gráfico de barras con top 5 productos más vendidos
- Click en "Cargar Estadísticas"

---

## 🎨 CARACTERÍSTICAS VISUALES

- ✅ **Indicadores de estado:** Ve si los servidores están online/offline
- 🎨 **Diseño moderno:** Colores morados y blancos
- 📊 **Gráficos interactivos:** Chart.js
- ✨ **Animaciones suaves**
- 📱 **Responsive:** Funciona en cualquier tamaño de pantalla
- 🔔 **Notificaciones:** Mensajes de éxito/error

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### ❌ "Backend Offline"
- Verifica que el servidor Node.js esté corriendo en puerto 3000
- Ejecuta: `npm start` en la raíz del proyecto

### ❌ "ML API Offline"
- Verifica que el servidor Python esté corriendo en puerto 5000
- Ejecuta: `python app.py` en la carpeta `ml_api/`

### ❌ "Error de conexión"
- Asegúrate de que AMBOS servidores estén corriendo
- Verifica que no haya firewall bloqueando los puertos
- Revisa que las URLs sean correctas (localhost:3000 y localhost:5000)

### ❌ "No carga los productos"
- Verifica que la base de datos MySQL esté corriendo
- Ejecuta el script `database/schema.sql` para crear las tablas

---

## 💡 TIPS DE USO

1. **Primero inicia los servidores**, luego abre el dashboard
2. **Los indicadores de estado** te dicen si algo no está funcionando
3. **Las predicciones requieren** que la ML API esté online
4. **Los productos y ventas** solo requieren que el backend esté online
5. **Puedes tener el dashboard abierto** en múltiples pestañas

---

## 🎯 CASOS DE USO PRÁCTICOS

### Gerente planifica el día siguiente:
1. Abre el dashboard
2. Click en "Predicción Automática"
3. Ve las predicciones para todos los productos
4. Anota o imprime las cantidades recomendadas
5. Hace los pedidos según las predicciones

### Cajero registra ventas:
1. Cliente compra 2 cafés
2. Cajero abre pestaña "Ventas"
3. Selecciona "Café Americano"
4. Cantidad: 2
5. Método: "Efectivo"
6. Click "Registrar Venta"
7. Sistema calcula automáticamente el total

### Administrador revisa estadísticas:
1. Abre pestaña "Estadísticas"
2. Click "Cargar Estadísticas"
3. Ve total de ventas y monto
4. Revisa gráfico de productos más vendidos
5. Toma decisiones basadas en los datos

---

## 🔄 ACTUALIZAR EL DASHBOARD

Si haces cambios al dashboard:
1. Edita el archivo `dashboard.html`
2. Guarda los cambios
3. Refresca el navegador (F5)

No necesitas reiniciar los servidores.

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas:
1. Revisa que los servidores estén corriendo
2. Mira la consola del navegador (F12) para ver errores
3. Verifica las URLs en el código
4. Lee `SOLUCION_PROBLEMAS.md`

---

¡Disfruta del dashboard! 🎉
