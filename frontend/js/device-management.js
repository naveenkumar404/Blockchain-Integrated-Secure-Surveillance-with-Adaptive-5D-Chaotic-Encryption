const API_BASE = 'http://localhost:5000/api';

// Mock devices data
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

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadDevices();
    document.getElementById('addDeviceForm').addEventListener('submit', handleAddDevice);
});

async function loadDevices() {
    try {
        // Use mock data
        const devices = MOCK_DEVICES;

        if (devices.length > 0) {
            const tbody = document.getElementById('devicesList');
            tbody.innerHTML = devices.map(device => `
                <tr>
                    <td>#${device.id}</td>
                    <td><strong>${device.device_name}</strong></td>
                    <td>${device.location}</td>
                    <td>
                        <span class="badge ${device.status === 'active' ? 'badge-success' : 'badge-danger'}">
                            ${device.status}
                        </span>
                    </td>
                    <td>5D Chaos</td>
                    <td>${new Date(device.created_at).toLocaleString()}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="showDeviceHealth(${device.id})">Health</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteDevice(${device.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading devices:', error);
    }
}

async function handleAddDevice(e) {
    e.preventDefault();

    const deviceName = document.getElementById('deviceName').value;
    const deviceLocation = document.getElementById('deviceLocation').value;

    // Add to mock data
    const newDevice = {
        id: MOCK_DEVICES.length + 1,
        user_id: 1,
        device_name: deviceName,
        location: deviceLocation,
        status: 'active',
        created_at: new Date().toISOString()
    };
    MOCK_DEVICES.push(newDevice);

    alert('Device added successfully!');
    document.getElementById('addDeviceForm').reset();
    await loadDevices();
}

function showDeviceHealth(deviceId) {
    // Mock health data
    document.getElementById('cpuUsage').textContent = Math.floor(Math.random() * 40 + 20);
    document.getElementById('memoryUsage').textContent = Math.floor(Math.random() * 50 + 30);
    document.getElementById('networkLatency').textContent = Math.floor(Math.random() * 10 + 2);
    document.getElementById('frameRate').textContent = Math.floor(Math.random() * 20 + 25);
    document.getElementById('uptime').textContent = Math.floor(Math.random() * 100 + 50) + ' days';

    const modal = new bootstrap.Modal(document.getElementById('deviceModal'));
    modal.show();
}

async function deleteDevice(deviceId) {
    if (confirm('Are you sure you want to delete this device?')) {
        // Remove from mock data
        const index = MOCK_DEVICES.findIndex(d => d.id === deviceId);
        if (index > -1) {
            MOCK_DEVICES.splice(index, 1);
        }
        alert('Device deleted');
        await loadDevices();
    }
}
