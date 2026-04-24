// API Base URL
const API_BASE = 'http://localhost:5000/api';

// Mock data for demonstration
const MOCK_DATA = {
    statistics: {
        totalDevices: 7,
        totalEncryptedImages: 7,
        verifiedImages: 7,
        tamperedImages: 0,
        blockchainBlocks: 5,
        blockchainValid: true
    },
    encryptionMetrics: [
        { resolution: '480p', time: 245, npcr: 0.9965, uaci: 33.45 },
        { resolution: '720p', time: 252, npcr: 0.9971, uaci: 33.52 },
        { resolution: '1080p', time: 238, npcr: 0.9958, uaci: 33.38 },
        { resolution: '2K', time: 248, npcr: 0.9968, uaci: 33.48 }
    ],
    entropyData: [
        { month: 'Jan', entropy: 7.82 },
        { month: 'Feb', entropy: 7.85 },
        { month: 'Mar', entropy: 7.88 },
        { month: 'Apr', entropy: 7.91 },
        { month: 'May', entropy: 7.87 },
        { month: 'Jun', entropy: 7.93 }
    ],
    deviceActivity: [
        { device: 'Main Entrance', images: 2 },
        { device: 'Parking Lot', images: 1 },
        { device: 'Server Room', images: 1 },
        { device: 'Conference', images: 1 },
        { device: 'Office Area', images: 1 },
        { device: 'Hallway', images: 1 }
    ]
};

// Get authorization header
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    await loadDashboard();
});

async function loadDashboard() {
    try {
        // Load statistics from mock data
        const stats = MOCK_DATA.statistics;
        
        document.getElementById('totalDevices').textContent = stats.totalDevices;
        document.getElementById('encryptedFiles').textContent = stats.totalEncryptedImages;
        document.getElementById('verifiedFiles').textContent = stats.verifiedImages;
        document.getElementById('tamperedFiles').textContent = stats.tamperedImages;
        document.getElementById('totalBlocks').textContent = stats.blockchainBlocks;
        document.getElementById('chainStatus').textContent = stats.blockchainValid ? 'Valid ✓' : 'Invalid ✗';

        // Load charts
        await loadEncryptionTimeChart();
        await loadEntropyTrendChart();
        await loadDeviceActivityChart();
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}


async function loadEncryptionTimeChart() {
    try {
        const data = MOCK_DATA.encryptionMetrics;
        
        const ctx = document.getElementById('encryptionTimeChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.resolution),
                datasets: [{
                    label: 'Encryption Time (ms)',
                    data: data.map(d => d.time),
                    backgroundColor: '#0d6efd',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    } catch (error) {
        console.error('Error loading encryption time chart:', error);
    }
}

async function loadEntropyTrendChart() {
    try {
        const data = MOCK_DATA.entropyData;
        
        const ctx = document.getElementById('entropyTrendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.month),
                datasets: [{
                    label: 'Entropy Score',
                    data: data.map(d => d.entropy),
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.4,
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        max: 8.5
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading entropy trend chart:', error);
    }
}

async function loadDeviceActivityChart() {
    try {
        const data = MOCK_DATA.deviceActivity;
        
        const ctx = document.getElementById('deviceActivityChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.device),
                datasets: [{
                    data: data.map(d => d.images),
                    backgroundColor: [
                        '#0d6efd', '#198754', '#ffc107', '#dc3545', '#00d4ff', '#667eea'
                    ],
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading device activity chart:', error);
    }
}

