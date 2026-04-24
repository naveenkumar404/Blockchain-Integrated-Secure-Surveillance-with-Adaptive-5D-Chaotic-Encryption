import os
import sys
import numpy as np
from flask import Flask, request, jsonify, send_file
from PIL import Image
import io
import json
import hashlib
from encryption_engine import ChaosEncryptionEngine
from security_metrics import SecurityMetrics

app = Flask(__name__)

encryption_engine = ChaosEncryptionEngine()
security_metrics = SecurityMetrics()

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'Python encryption service is running'}), 200

@app.route('/encrypt', methods=['POST'])
def encrypt():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image_file = request.files['image']
        parameters = request.form.get('parameters', '{}')
        
        try:
            params = json.loads(parameters)
        except:
            params = {}

        # Open image
        img = Image.open(io.BytesIO(image_file.read()))
        img_array = np.array(img)

        # Flatten for initial entropy check
        flat_array = img_array.flatten()

        # Check entropy
        entropy = security_metrics.calculate_entropy(flat_array)

        # If entropy is low, regenerate parameters
        if entropy < 7.9:
            params = encryption_engine.generate_optimal_parameters()

        # Encrypt using 5D chaotic system
        encrypted_array = encryption_engine.encrypt_image(img_array, params)

        # Convert back to image
        encrypted_array_uint8 = (encrypted_array * 255).astype(np.uint8)
        encrypted_img = Image.fromarray(encrypted_array_uint8)

        # Save to bytes
        img_bytes = io.BytesIO()
        encrypted_img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        encrypted_data_base64 = img_bytes.getvalue().hex()

        # Calculate metrics
        flat_encrypted = encrypted_array.flatten()
        npcr = security_metrics.calculate_npcr(flat_array, flat_encrypted)
        uaci = security_metrics.calculate_uaci(flat_array, flat_encrypted)
        correlation = security_metrics.calculate_correlation(flat_array, flat_encrypted)

        return jsonify({
            'success': True,
            'encrypted_data': encrypted_data_base64,
            'path': f'/encrypted/{hashlib.md5(image_file.filename.encode()).hexdigest()}.png',
            'entropy': float(entropy),
            'npcr': float(npcr),
            'uaci': float(uaci),
            'correlation': float(correlation),
            'parameters': params
        }), 200

    except Exception as e:
        print(f"Encryption error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/decrypt', methods=['POST'])
def decrypt():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image_file = request.files['image']
        parameters = request.form.get('parameters', '{}')

        try:
            params = json.loads(parameters)
        except:
            params = {}

        # Open encrypted image
        img = Image.open(io.BytesIO(image_file.read()))
        img_array = np.array(img) / 255.0

        # Decrypt using 5D chaotic system
        decrypted_array = encryption_engine.decrypt_image(img_array, params)

        # Convert back to image
        decrypted_array_uint8 = (decrypted_array * 255).astype(np.uint8)
        decrypted_img = Image.fromarray(decrypted_array_uint8)

        # Save to bytes
        img_bytes = io.BytesIO()
        decrypted_img.save(img_bytes, format='PNG')
        img_bytes.seek(0)
        decrypted_data_base64 = img_bytes.getvalue().hex()

        return jsonify({
            'success': True,
            'decrypted_data': decrypted_data_base64,
            'message': 'Image decrypted successfully'
        }), 200

    except Exception as e:
        print(f"Decryption error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image_file = request.files['image']

        # Open image
        img = Image.open(io.BytesIO(image_file.read()))
        img_array = np.array(img)
        flat_array = img_array.flatten()

        # Calculate all metrics
        entropy = security_metrics.calculate_entropy(flat_array)
        
        return jsonify({
            'success': True,
            'entropy': float(entropy),
            'status': 'Good' if entropy > 7.9 else 'Low - Regenerate parameters'
        }), 200

    except Exception as e:
        print(f"Analysis error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = os.getenv('ENCRYPTION_SERVICE_PORT', 5001)
    app.run(host='0.0.0.0', port=int(port), debug=False)
