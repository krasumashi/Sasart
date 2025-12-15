const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Data
const MOCK_CLIPS = [
    {
        id: 's_c1',
        title: 'Neon Drive (Server)',
        source: 'tiktok',
        thumbnail: 'linear-gradient(45deg, #f50057, #7c4dff)',
        duration: 15,
        moods: ['Hype', 'Night'],
        creator: '@neon_rider'
    },
    {
        id: 's_c2',
        title: 'Server Coffee',
        source: 'camera',
        thumbnail: 'linear-gradient(135deg, #ff9100, #ffea00)',
        duration: 8,
        moods: ['Calm', 'Morning'],
        creator: 'me'
    }
];

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Sasart Server Running' });
});

app.get('/api/clips', (req, res) => {
    // Simulate DB fetch
    setTimeout(() => {
        res.json(MOCK_CLIPS);
    }, 300);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
