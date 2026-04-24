import numpy as np
import hashlib

class ChaosEncryptionEngine:
    def __init__(self):
        self.default_params = {
            'r': 3.8,  # Logistic map parameter
            'a': 1.2,  # Henon map parameter
            'b': 0.3,  # Henon map parameter
            'c': 0.5,  # Tent map parameter
            'd': 0.7   # Sine map parameter
        }

    def generate_optimal_parameters(self):
        """Generate parameters optimized for high entropy"""
        return {
            'r': np.random.uniform(3.72, 3.99),
            'a': np.random.uniform(1.0, 1.5),
            'b': np.random.uniform(0.2, 0.4),
            'c': np.random.uniform(0.4, 0.6),
            'd': np.random.uniform(0.6, 0.8)
        }

    def logistic_map(self, x, r, iterations=1):
        """1D Chaotic Logistic Map"""
        for _ in range(iterations):
            x = r * x * (1 - x)
        return x % 1.0

    def henon_map(self, x, y, a, b, iterations=1):
        """2D Chaotic Henon Map"""
        for _ in range(iterations):
            x_new = 1 - a * (x ** 2) + y
            y_new = b * x
            x, y = x_new % 1.0, y_new % 1.0
        return x, y

    def tent_map(self, x, c, iterations=1):
        """1D Chaotic Tent Map"""
        for _ in range(iterations):
            if x < 0.5:
                x = c * x
            else:
                x = c * (1 - x)
        return x % 1.0

    def sine_map(self, x, d, iterations=1):
        """1D Chaotic Sine Map"""
        for _ in range(iterations):
            x = d * np.sin(np.pi * x)
        return x % 1.0

    def generate_keystream(self, shape, params):
        """Generate 5D chaotic keystream"""
        size = np.prod(shape)
        keystream = np.zeros(size)

        x0 = 0.3  # Initial condition
        y0 = 0.4

        for i in range(size):
            # Apply 5 chaotic maps sequentially
            x = self.logistic_map(x0, params['r'])
            x, y = self.henon_map(x, y0, params['a'], params['b'])
            x = self.tent_map(x, params['c'])
            x = self.sine_map(x, params['d'])

            keystream[i] = int((x * 1000) % 256)

            x0 = x
            y0 = y

        return keystream.astype(np.uint8).reshape(shape)

    def encrypt_image(self, image, params=None):
        """Encrypt image using 5D chaotic system"""
        if params is None:
            params = self.default_params

        # Normalize image to [0, 1]
        img_normalized = image.astype(float) / 255.0

        # Generate keystream
        keystream = self.generate_keystream(image.shape, params)
        keystream_normalized = keystream.astype(float) / 255.0

        # XOR-based encryption combined with chaos
        encrypted = np.bitwise_xor(
            (img_normalized * 255).astype(np.uint8),
            keystream
        ).astype(float) / 255.0

        return encrypted

    def decrypt_image(self, encrypted_image, params=None):
        """Decrypt image using 5D chaotic system"""
        if params is None:
            params = self.default_params

        # Generate same keystream
        keystream = self.generate_keystream(encrypted_image.shape, params)
        keystream_normalized = keystream.astype(float) / 255.0

        # XOR-based decryption (XOR is self-inverse)
        decrypted = np.bitwise_xor(
            (encrypted_image * 255).astype(np.uint8),
            keystream
        ).astype(float) / 255.0

        return decrypted
