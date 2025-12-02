-- Crear base de datos
CREATE DATABASE IF NOT EXISTS casino_santo_tomas;
USE casino_santo_tomas;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('Efectivo', 'Tarjeta', 'Transferencia', 'Junaeb') NOT NULL,
    fecha_venta DATETIME NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar productos iniciales
INSERT INTO productos (nombre, precio, categoria) VALUES
('Café Americano', 1800, 'Bebidas'),
('Café Latte', 2500, 'Bebidas'),
('Cappuccino', 2600, 'Bebidas'),
('Té', 1500, 'Bebidas'),
('Chocolate Caliente', 2800, 'Bebidas'),
('Muffin', 1500, 'Comida'),
('Sándwich', 1200, 'Comida'),
('Pepsi', 1400, 'Bebidas'),
('Coca-Cola', 1400, 'Bebidas'),
('Souffles', 1100, 'Snacks'),
('Papitas', 1200, 'Snacks'),
('Empanada de pino', 1000, 'Comida'),
('Hamburguesa', 2000, 'Comida');

-- Índices para mejorar rendimiento
CREATE INDEX idx_ventas_fecha ON ventas(fecha_venta);
CREATE INDEX idx_ventas_producto ON ventas(producto_id);
CREATE INDEX idx_productos_categoria ON productos(categoria);
