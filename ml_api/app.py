from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde Node.js

# Cargar modelo y codificador
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'modelo_stock_rf.joblib')
ENCODER_PATH = os.path.join(os.path.dirname(__file__), 'codificador_productos.joblib')

try:
    modelo = joblib.load(MODEL_PATH)
    codificador = joblib.load(ENCODER_PATH)
    print("✅ Modelo y codificador cargados exitosamente")
except Exception as e:
    print(f"❌ Error al cargar el modelo: {e}")
    modelo = None
    codificador = None

# Mapeo de días y meses
DIAS_SEMANA = {
    'lunes': 0, 'martes': 1, 'miercoles': 2, 'miércoles': 2,
    'jueves': 3, 'viernes': 4, 'sabado': 5, 'sábado': 5, 'domingo': 6
}

MESES = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
    'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
    'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
}

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': '🤖 API de Predicción de Stock - Casino Santo Tomás',
        'version': '1.0.0',
        'status': 'online' if modelo else 'error',
        'endpoints': {
            'predecir_stock': '/api/predict (POST)',
            'predecir_multiple': '/api/predict/batch (POST)',
            'info_modelo': '/api/model/info (GET)',
            'productos': '/api/products (GET)'
        }
    })

@app.route('/api/products', methods=['GET'])
def get_products():
    """Obtener lista de productos que el modelo reconoce"""
    if codificador is None:
        return jsonify({'error': 'Codificador no disponible'}), 500
    
    productos = codificador.classes_.tolist()
    return jsonify({
        'success': True,
        'productos': productos,
        'total': len(productos)
    })

@app.route('/api/model/info', methods=['GET'])
def model_info():
    """Información del modelo"""
    if modelo is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    
    return jsonify({
        'success': True,
        'modelo': {
            'tipo': 'Random Forest Regressor',
            'n_estimadores': modelo.n_estimators,
            'n_features': modelo.n_features_in_,
            'productos_soportados': len(codificador.classes_)
        }
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Predecir stock necesario para un producto
    
    Body esperado:
    {
        "producto": "Café Americano",
        "dia_semana": "lunes" o 0-6,
        "mes": "enero" o 1-12,
        "cantidad_historica": 50 (opcional, default: 30)
    }
    """
    if modelo is None or codificador is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    
    try:
        data = request.get_json()
        
        # Validar datos requeridos
        if 'producto' not in data:
            return jsonify({'error': 'El campo "producto" es requerido'}), 400
        
        producto = data['producto']
        
        # Validar que el producto exista
        if producto not in codificador.classes_:
            return jsonify({
                'error': f'Producto "{producto}" no reconocido',
                'productos_validos': codificador.classes_.tolist()
            }), 400
        
        # Codificar producto
        producto_encoded = codificador.transform([producto])[0]
        
        # Obtener día de la semana
        dia_semana = data.get('dia_semana', datetime.now().weekday())
        if isinstance(dia_semana, str):
            dia_semana = DIAS_SEMANA.get(dia_semana.lower(), datetime.now().weekday())
        
        # Obtener mes
        mes = data.get('mes', datetime.now().month)
        if isinstance(mes, str):
            mes = MESES.get(mes.lower(), datetime.now().month)
        
        # Cantidad histórica (promedio de ventas anteriores)
        cantidad_historica = data.get('cantidad_historica', 30)
        
        # Preparar features para predicción
        # [producto_encoded, dia_semana, mes, cantidad_historica]
        features = np.array([[producto_encoded, dia_semana, mes, cantidad_historica]])
        
        # Realizar predicción
        prediccion = modelo.predict(features)[0]
        prediccion = max(0, round(prediccion))  # Asegurar que sea positivo y entero
        
        return jsonify({
            'success': True,
            'prediccion': {
                'producto': producto,
                'stock_recomendado': int(prediccion),
                'dia_semana': dia_semana,
                'mes': mes,
                'cantidad_historica_usada': cantidad_historica
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/batch', methods=['POST'])
def predict_batch():
    """
    Predecir stock para múltiples productos
    
    Body esperado:
    {
        "productos": ["Café Americano", "Té", "Muffin"],
        "dia_semana": "lunes",
        "mes": "enero"
    }
    """
    if modelo is None or codificador is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    
    try:
        data = request.get_json()
        
        if 'productos' not in data:
            return jsonify({'error': 'El campo "productos" es requerido'}), 400
        
        productos = data['productos']
        dia_semana = data.get('dia_semana', datetime.now().weekday())
        mes = data.get('mes', datetime.now().month)
        
        # Convertir dia y mes si son strings
        if isinstance(dia_semana, str):
            dia_semana = DIAS_SEMANA.get(dia_semana.lower(), datetime.now().weekday())
        if isinstance(mes, str):
            mes = MESES.get(mes.lower(), datetime.now().month)
        
        predicciones = []
        
        for producto in productos:
            if producto not in codificador.classes_:
                continue
            
            producto_encoded = codificador.transform([producto])[0]
            features = np.array([[producto_encoded, dia_semana, mes, 30]])
            prediccion = modelo.predict(features)[0]
            prediccion = max(0, round(prediccion))
            
            predicciones.append({
                'producto': producto,
                'stock_recomendado': int(prediccion)
            })
        
        return jsonify({
            'success': True,
            'predicciones': predicciones,
            'total': len(predicciones)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict/auto', methods=['GET'])
def predict_auto():
    """Predecir stock para todos los productos del día actual"""
    if modelo is None or codificador is None:
        return jsonify({'error': 'Modelo no disponible'}), 500
    
    try:
        productos = codificador.classes_.tolist()
        dia_semana = datetime.now().weekday()
        mes = datetime.now().month
        
        predicciones = []
        
        for producto in productos:
            producto_encoded = codificador.transform([producto])[0]
            features = np.array([[producto_encoded, dia_semana, mes, 30]])
            prediccion = modelo.predict(features)[0]
            prediccion = max(0, round(prediccion))
            
            predicciones.append({
                'producto': producto,
                'stock_recomendado': int(prediccion)
            })
        
        # Ordenar por stock recomendado (mayor a menor)
        predicciones.sort(key=lambda x: x['stock_recomendado'], reverse=True)
        
        return jsonify({
            'success': True,
            'fecha': datetime.now().strftime('%Y-%m-%d'),
            'dia_semana': dia_semana,
            'mes': mes,
            'predicciones': predicciones,
            'total': len(predicciones)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print('\n' + '='*60)
    print('🤖 API de Predicción de Stock - Casino Santo Tomás')
    print('='*60)
    print('📡 Puerto: 5000')
    print('🌐 URL: http://localhost:5000')
    print('='*60 + '\n')
    
    app.run(host='0.0.0.0', port=5000, debug=True)
