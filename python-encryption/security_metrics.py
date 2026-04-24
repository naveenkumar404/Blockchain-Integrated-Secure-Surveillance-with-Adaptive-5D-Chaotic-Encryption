import numpy as np
import math

class SecurityMetrics:
    @staticmethod
    def calculate_entropy(data):
        """Calculate Shannon entropy"""
        if len(data) == 0:
            return 0

        hist, _ = np.histogram(data, bins=256, range=(0, 256))
        hist = hist[hist > 0]
        prob = hist / len(data)
        entropy = -np.sum(prob * np.log2(prob))

        return entropy

    @staticmethod
    def calculate_npcr(original, encrypted):
        """Calculate Number of Pixel Change Rate"""
        if len(original) != len(encrypted):
            raise ValueError('Arrays must have same length')

        diff_count = np.sum(original != encrypted)
        npcr = (diff_count / len(original)) * 100

        return npcr

    @staticmethod
    def calculate_uaci(original, encrypted):
        """Calculate Unified Average Changing Intensity"""
        if len(original) != len(encrypted):
            raise ValueError('Arrays must have same length')

        sum_diff = np.sum(np.abs(original - encrypted)) / 255.0
        uaci = (sum_diff / len(original)) * 100

        return uaci

    @staticmethod
    def calculate_correlation(original, encrypted):
        """Calculate correlation coefficient"""
        if len(original) != len(encrypted):
            raise ValueError('Arrays must have same length')

        n = len(original)
        sum_x = np.sum(original)
        sum_y = np.sum(encrypted)
        sum_xy = np.sum(original * encrypted)
        sum_x2 = np.sum(original ** 2)
        sum_y2 = np.sum(encrypted ** 2)

        numerator = n * sum_xy - sum_x * sum_y
        denominator = np.sqrt((n * sum_x2 - sum_x ** 2) * (n * sum_y2 - sum_y ** 2))

        if denominator == 0:
            return 0

        correlation = numerator / denominator

        return correlation

    @staticmethod
    def calculate_psnr(original, encrypted):
        """Calculate Peak Signal-to-Noise Ratio"""
        if len(original) != len(encrypted):
            raise ValueError('Arrays must have same length')

        mse = np.mean((original - encrypted) ** 2)

        if mse == 0:
            return float('inf')

        psnr = 10 * math.log10(255.0 ** 2 / mse)

        return psnr

    @staticmethod
    def key_sensitivity_test(encrypted_key1, encrypted_key2):
        """Test key sensitivity"""
        if len(encrypted_key1) != len(encrypted_key2):
            return {'error': 'Encrypted images must have same length'}

        diff_count = np.sum(encrypted_key1 != encrypted_key2)
        sensitivity = (diff_count / len(encrypted_key1)) * 100

        return {
            'sensitive': sensitivity > 99,
            'diffPercentage': sensitivity,
            'recommendation': 'Key is sensitive' if sensitivity > 99 else 'Needs improvement'
        }
