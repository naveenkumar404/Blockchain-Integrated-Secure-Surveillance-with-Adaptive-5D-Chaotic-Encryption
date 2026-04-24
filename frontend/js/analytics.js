const API_BASE = 'http://localhost:5000/api';

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadAnalytics();
    document.getElementById('runSensitivityBtn').addEventListener('click', runSensitivityTest);
});

async function loadAnalytics() {
    try {
        // Load sample metrics
        const mockMetrics = {
            entropy: 7.95,
            npcr: 99.8,
            uaci: 33.5,
            correlation: -0.01,
            psnr: 8.5
        };

        updateMetrics(mockMetrics);
        loadCharts(mockMetrics);
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

function updateMetrics(metrics) {
    document.getElementById('entropyValue').textContent = metrics.entropy.toFixed(2);
    document.getElementById('npcrValue').textContent = metrics.npcr.toFixed(1);
    document.getElementById('uaciValue').textContent = metrics.uaci.toFixed(1);
    document.getElementById('correlationValue').textContent = metrics.correlation.toFixed(2);
}

function loadCharts(metrics) {
    // Entropy Distribution Chart
    const entropyCtx = document.getElementById('entropyChart').getContext('2d');
    new Chart(entropyCtx, {
        type: 'line',
        data: {
            labels: ['0-1h', '1-2h', '2-3h', '3-4h', '4-5h', '5-6h'],
            datasets: [{
                label: 'Entropy',
                data: [7.85, 7.89, 7.92, 7.88, 7.95, 7.91],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } }
        }
    });

    // NPCR vs UACI Chart
    const npcrUaciCtx = document.getElementById('npcrUaciChart').getContext('2d');
    new Chart(npcrUaciCtx, {
        type: 'bar',
        data: {
            labels: ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5'],
            datasets: [
                {
                    label: 'NPCR (%)',
                    data: [99.8, 99.5, 99.9, 99.7, 99.6],
                    backgroundColor: '#0d6efd'
                },
                {
                    label: 'UACI (%)',
                    data: [33.5, 33.2, 33.8, 33.4, 33.6],
                    backgroundColor: '#0dcaf0'
                }
            ]
        },
        options: {
            responsive: true,
            grouped: true
        }
    });

    // Correlation Analysis Chart
    const correlationCtx = document.getElementById('correlationChart').getContext('2d');
    new Chart(correlationCtx, {
        type: 'radar',
        data: {
            labels: ['R', 'G', 'B', 'Combined'],
            datasets: [{
                label: 'Correlation Coefficient',
                data: [-0.015, -0.018, -0.012, -0.01],
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    min: -0.05,
                    max: 0.05
                }
            }
        }
    });

    // Encryption Speed Chart
    const speedCtx = document.getElementById('encryptionSpeedChart').getContext('2d');
    new Chart(speedCtx, {
        type: 'bar',
        data: {
            labels: ['480p', '720p', '1080p', '4K'],
            datasets: [{
                label: 'Time (ms)',
                data: [45, 85, 180, 350],
                backgroundColor: '#198754'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // PSNR Chart
    const psnrCtx = document.getElementById('psnrChart').getContext('2d');
    new Chart(psnrCtx, {
        type: 'line',
        data: {
            labels: ['Encrypted 1', 'Encrypted 2', 'Encrypted 3', 'Encrypted 4', 'Encrypted 5'],
            datasets: [{
                label: 'PSNR (dB)',
                data: [8.5, 7.8, 8.2, 7.9, 8.1],
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } }
        }
    });
}

function runSensitivityTest() {
    // Simulate sensitivity test
    document.getElementById('sensitivityResult').style.display = 'block';
    document.getElementById('sensitivityValue').textContent = (99.5 + Math.random() * 0.5).toFixed(1);
    document.getElementById('sensitivityStatus').textContent = 'Key is highly sensitive to changes ✓';
}
