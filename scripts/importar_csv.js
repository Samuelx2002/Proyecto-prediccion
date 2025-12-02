const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function importarCSV() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('📂 Leyendo archivo CSV...');

  const ventas = [];
  
  fs.createReadStream('ventas_cafeteria.csv')
    .pipe(csv())
    .on('data', (row) => {
      ventas.push(row);
    })
    .on('end', async () => {
      console.log(`✅ CSV leído: ${ventas.length} registros encontrados`);
      
      let insertados = 0;
      let errores = 0;

      for (const venta of ventas) {
        try {
          // Buscar el producto por nombre
          const [productos] = await connection.query(
            'SELECT id FROM productos WHERE nombre LIKE ?',
            [`%${venta.producto}%`]
          );

          if (productos.length > 0) {
            const producto_id = productos[0].id;
            
            await connection.query(
              `INSERT INTO ventas (producto_id, cantidad, precio_unitario, total, metodo_pago, fecha_venta) 
               VALUES (?, ?, ?, ?, ?, ?)`,
              [
                producto_id,
                parseInt(venta.cantidad),
                parseFloat(venta.precio),
                parseFloat(venta.total),
                venta.pago,
                venta.fecha
              ]
            );
            insertados++;
          } else {
            console.warn(`⚠️  Producto no encontrado: ${venta.producto}`);
            errores++;
          }
        } catch (error) {
          console.error(`❌ Error al insertar venta:`, error.message);
          errores++;
        }
      }

      console.log('\n' + '='.repeat(50));
      console.log('📊 RESUMEN DE IMPORTACIÓN');
      console.log('='.repeat(50));
      console.log(`✅ Registros insertados: ${insertados}`);
      console.log(`❌ Errores: ${errores}`);
      console.log('='.repeat(50) + '\n');

      await connection.end();
    });
}

importarCSV().catch(console.error);
