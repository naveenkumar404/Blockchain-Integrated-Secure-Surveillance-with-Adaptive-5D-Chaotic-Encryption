class SecurityMetrics {
  // Calculate Entropy
  static calculateEntropy(data) {
    const freq = {};
    for (let i = 0; i < data.length; i++) {
      freq[data[i]] = (freq[data[i]] || 0) + 1;
    }

    let entropy = 0;
    for (let byte in freq) {
      const p = freq[byte] / data.length;
      entropy -= p * Math.log2(p);
    }

    return entropy.toFixed(4);
  }

  // Calculate NPCR (Number of Pixel Change Rate)
  static calculateNPCR(original, encrypted) {
    if (original.length !== encrypted.length) {
      throw new Error('Images must have same length');
    }

    let diffCount = 0;
    for (let i = 0; i < original.length; i++) {
      if (original[i] !== encrypted[i]) {
        diffCount++;
      }
    }

    const npcr = (diffCount / original.length) * 100;
    return npcr.toFixed(4);
  }

  // Calculate UACI (Unified Average Changing Intensity)
  static calculateUACI(original, encrypted) {
    if (original.length !== encrypted.length) {
      throw new Error('Images must have same length');
    }

    let sum = 0;
    for (let i = 0; i < original.length; i++) {
      sum += Math.abs(original[i] - encrypted[i]) / 255;
    }

    const uaci = (sum / original.length) * 100;
    return uaci.toFixed(4);
  }

  // Calculate Correlation Coefficient
  static calculateCorrelation(original, encrypted) {
    if (original.length !== encrypted.length) {
      throw new Error('Images must have same length');
    }

    const n = original.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

    for (let i = 0; i < n; i++) {
      sumX += original[i];
      sumY += encrypted[i];
      sumXY += original[i] * encrypted[i];
      sumX2 += original[i] * original[i];
      sumY2 += encrypted[i] * encrypted[i];
    }

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    if (denominator === 0) return 0;

    const correlation = numerator / denominator;
    return correlation.toFixed(4);
  }

  // Key Sensitivity Test
  static keySecurityTest(encryptedWithKey1, encryptedWithKey2) {
    if (encryptedWithKey1.length !== encryptedWithKey2.length) {
      return { error: 'Encrypted images must have same length' };
    }

    let diffCount = 0;
    for (let i = 0; i < encryptedWithKey1.length; i++) {
      if (encryptedWithKey1[i] !== encryptedWithKey2[i]) {
        diffCount++;
      }
    }

    const sensitivity = (diffCount / encryptedWithKey1.length) * 100;
    return {
      sensitive: sensitivity > 99,
      diffPercentage: sensitivity.toFixed(4),
      recommendation: sensitivity > 99 ? 'Key is sensitive to changes' : 'Key sensitivity needs improvement'
    };
  }

  // PSNR (Peak Signal-to-Noise Ratio)
  static calculatePSNR(original, encrypted) {
    if (original.length !== encrypted.length) {
      throw new Error('Images must have same length');
    }

    let mse = 0;
    for (let i = 0; i < original.length; i++) {
      const diff = original[i] - encrypted[i];
      mse += diff * diff;
    }

    mse = mse / original.length;
    
    if (mse === 0) return Infinity;

    const max = 255;
    const psnr = 10 * Math.log10((max * max) / mse);
    
    return psnr.toFixed(4);
  }

  // Compile all metrics
  static getAllMetrics(original, encrypted) {
    try {
      return {
        entropy: this.calculateEntropy(encrypted),
        npcr: this.calculateNPCR(original, encrypted),
        uaci: this.calculateUACI(original, encrypted),
        correlation: this.calculateCorrelation(original, encrypted),
        psnr: this.calculatePSNR(original, encrypted)
      };
    } catch (error) {
      console.error('Error calculating metrics:', error);
      return null;
    }
  }
}

module.exports = SecurityMetrics;
