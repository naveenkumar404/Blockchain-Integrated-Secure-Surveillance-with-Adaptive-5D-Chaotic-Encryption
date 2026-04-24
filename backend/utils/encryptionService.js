const crypto = require('crypto');
const axios = require('axios');

class EncryptionService {
  static async callPythonEncryptionService(imageBuffer, parameters = {}) {
    try {
      const formData = new FormData();
      formData.append('image', new Blob([imageBuffer]));
      formData.append('parameters', JSON.stringify(parameters));

      const response = await axios.post(
        `${process.env.PYTHON_SERVICE_URL}/encrypt`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error calling Python encryption service:', error.message);
      throw error;
    }
  }

  static async callPythonDecryptionService(encryptedBuffer, parameters = {}) {
    try {
      const formData = new FormData();
      formData.append('image', new Blob([encryptedBuffer]));
      formData.append('parameters', JSON.stringify(parameters));

      const response = await axios.post(
        `${process.env.PYTHON_SERVICE_URL}/decrypt`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error calling Python decryption service:', error.message);
      throw error;
    }
  }

  static calculateHash(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  static generateRandomKey(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }
}

module.exports = EncryptionService;
