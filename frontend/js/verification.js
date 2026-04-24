const API_BASE = 'http://localhost:5000/api';

// Mock blockchain data
const MOCK_BLOCKS = [
    { id: 1, timestamp: '2026-02-18T14:00:00Z', previous_hash: '0000', current_hash: '0000a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b', nonce: 1000 },
    { id: 2, timestamp: '2026-02-18T14:15:00Z', previous_hash: '0000a1b2', current_hash: '0001b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c', nonce: 1001 },
    { id: 3, timestamp: '2026-02-18T14:30:00Z', previous_hash: '0001b2c3', current_hash: '0002c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d', nonce: 1002 },
    { id: 4, timestamp: '2026-02-18T14:45:00Z', previous_hash: '0002c3d4', current_hash: '0003d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e', nonce: 1003 },
    { id: 5, timestamp: '2026-02-18T15:00:00Z', previous_hash: '0003d4e5', current_hash: '0004e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f', nonce: 1004 }
];

function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadBlockchainBlocks();
    document.getElementById('verifyBtn').addEventListener('click', verifyImage);
    document.getElementById('verifyChainBtn').addEventListener('click', verifyChain);
});

async function loadBlockchainBlocks() {
    try {
        const blocks = MOCK_BLOCKS;

        if (blocks.length > 0) {
            const tbody = document.getElementById('blocksList');
            tbody.innerHTML = blocks.map((block, index) => `
                <tr>
                    <td>#${block.id}</td>
                    <td>${new Date(block.timestamp).toLocaleString()}</td>
                    <td class="font-monospace small">${block.previous_hash.substring(0, 8)}...</td>
                    <td class="font-monospace small">${block.current_hash.substring(0, 8)}...</td>
                    <td>${block.nonce}</td>
                    <td><span class="badge badge-success">Valid</span></td>
                </tr>
            `).join('');

            // Populate image select
            const select = document.getElementById('imageSelect');
            select.innerHTML = '<option value="">-- Choose an image --</option>' +
                blocks.map(b => `<option value="${b.id}">Block #${b.id}</option>`).join('');
        }
    } catch (error) {
        console.error('Error loading blocks:', error);
    }
}

async function verifyImage() {
    const blockId = document.getElementById('imageSelect').value;

    if (!blockId) {
        alert('Please select an image');
        return;
    }

    try {
        // Simulate verification
        const verified = Math.random() > 0.1; // 90% verification success rate

        document.getElementById('verificationResult').style.display = 'block';

        if (verified) {
            document.getElementById('verifiedAlert').style.display = 'block';
            document.getElementById('tamperedAlert').style.display = 'none';
        } else {
            document.getElementById('verifiedAlert').style.display = 'none';
            document.getElementById('tamperedAlert').style.display = 'block';
        }

        const storedHash = MOCK_BLOCKS[blockId - 1].current_hash.substring(0, 16) + '...';
        const recalculatedHash = storedHash;

        document.getElementById('storedHash').textContent = storedHash;
        document.getElementById('recalculatedHash').textContent = recalculatedHash;
        document.getElementById('hashMatch').innerHTML = 
            `<span class="badge ${verified ? 'badge-success' : 'badge-danger'}">
                ${verified ? 'MATCH ✓' : 'MISMATCH ✗'}
            </span>`;
    } catch (error) {
        console.error('Error verifying image:', error);
        alert('Verification failed');
    }
}

async function verifyChain() {
    try {
        // Mock chain verification
        const blockchainValid = true;
        const totalBlocks = MOCK_BLOCKS.length;
        const validBlocks = MOCK_BLOCKS.length;

        document.getElementById('chainStatus').style.display = 'block';

        if (blockchainValid) {
            document.getElementById('chainValidAlert').style.display = 'block';
            document.getElementById('chainInvalidAlert').style.display = 'none';
            document.getElementById('blockCount').textContent = `Total blocks verified: ${totalBlocks}`;
        } else {
            document.getElementById('chainValidAlert').style.display = 'none';
            document.getElementById('chainInvalidAlert').style.display = 'block';
        }
    } catch (error) {
        console.error('Error verifying chain:', error);
        alert('Chain verification failed');
    }
}
