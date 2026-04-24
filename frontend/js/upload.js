const API_BASE = 'http://localhost:5000/api';

// Mock devices from device-management.js
const MOCK_DEVICES = [
    { id: 1, user_id: 1, device_name: 'Main Entrance Camera', location: 'Building A - Front Door', status: 'active', created_at: '2026-02-16T10:30:00Z' },
    { id: 2, user_id: 1, device_name: 'Parking Lot Camera 1', location: 'Ground Floor - Lot A', status: 'active', created_at: '2026-02-16T10:45:00Z' },
    { id: 3, user_id: 1, device_name: 'Server Room Camera', location: 'Basement - Level 3', status: 'active', created_at: '2026-02-16T11:00:00Z' },
    { id: 4, user_id: 1, device_name: 'Conference Room Camera', location: 'Floor 5 - Room 501', status: 'active', created_at: '2026-02-16T11:15:00Z' },
    { id: 5, user_id: 1, device_name: 'Backup Camera', location: 'Basement - Level 1', status: 'inactive', created_at: '2026-02-16T11:30:00Z' },
    { id: 6, user_id: 2, device_name: 'Office Area Camera', location: 'Floor 2 - Open Area', status: 'active', created_at: '2026-02-16T12:00:00Z' },
    { id: 7, user_id: 2, device_name: 'Hallway Monitor', location: 'Floor 2 - Hallway', status: 'active', created_at: '2026-02-16T12:15:00Z' }
];

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

let uploadedImages = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadDevices();
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
    document.getElementById('imageInput').addEventListener('change', previewImage);
});

async function loadDevices() {
    try {
        // Use mock devices
        const devices = MOCK_DEVICES.filter(d => d.status === 'active');

        if (devices.length > 0) {
            const select = document.getElementById('deviceSelect');
            select.innerHTML = '<option value="">-- Choose a device --</option>' +
                devices.map(d => `<option value="${d.id}">${d.device_name}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading devices:', error);
    }
}

function previewImage(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('preview').src = event.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function handleUpload(e) {
    e.preventDefault();

    const imageFile = document.getElementById('imageInput').files[0];
    const deviceId = document.getElementById('deviceSelect').value;

    if (!imageFile || !deviceId) {
        alert('Please select both device and image');
        return;
    }

    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('idleMessage').style.display = 'none';

    try {
        // Simulate encryption progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (progress < 90) {
                progress += Math.random() * 20;
                updateProgress(progress);
            }
        }, 300);

        // Simulate encryption delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearInterval(progressInterval);
        updateProgress(100);

        // Generate mock encryption metrics
        const mockData = {
            success: true,
            imageId: Math.floor(Math.random() * 1000),
            blockHash: 'h' + Math.random().toString(16).substring(2, 50),
            entropy: 7.80 + Math.random() * 0.15,
            metrics: {
                npcr: 99.5 + Math.random() * 0.4,
                uaci: 33.0 + Math.random() * 0.8,
                correlation: -0.002 + Math.random() * 0.003
            }
        };

        document.getElementById('uploadStatus').textContent = 'Encryption Complete ✓';
        document.getElementById('metricsResult').style.display = 'block';

        // Display metrics
        document.getElementById('resultEntropy').textContent = mockData.entropy.toFixed(4);
        document.getElementById('resultNPCR').textContent = mockData.metrics.npcr.toFixed(2) + '%';
        document.getElementById('resultUACI').textContent = mockData.metrics.uaci.toFixed(2) + '%';
        document.getElementById('resultCorrelation').textContent = mockData.metrics.correlation.toFixed(4);
        document.getElementById('resultHash').textContent = mockData.blockHash.substring(0, 16) + '...';

        // Add to recent uploads
        uploadedImages.unshift({
            device: deviceId,
            time: new Date().toLocaleTimeString(),
            entropy: mockData.entropy,
            hash: mockData.blockHash
        });

        updateRecentUploads();
        document.getElementById('uploadForm').reset();
        document.getElementById('imagePreview').style.display = 'none';
    } catch (error) {
        console.error('Error uploading image:', error);
        document.getElementById('uploadStatus').textContent = 'Error ✗';
        alert('Upload failed');
    }
}

function updateProgress(value) {
    document.getElementById('uploadProgress').style.width = value + '%';
    document.getElementById('uploadProgress').textContent = Math.round(value) + '%';
}

function updateRecentUploads() {
    const tbody = document.getElementById('uploadsList');
    tbody.innerHTML = uploadedImages.slice(0, 5).map(img => `
        <tr>
            <td>Device #${img.device}</td>
            <td>${img.time}</td>
            <td>${img.entropy.toFixed(4)}</td>
            <td><span class="badge bg-success">Secured</span></td>
            <td class="font-monospace small">${img.hash.substring(0, 12)}...</td>
        </tr>
    `).join('');
}
