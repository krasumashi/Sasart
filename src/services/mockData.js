/**
 * Mock Data Service for Sasart
 * Simulates local database for clips and menus
 */

const SAMPLE_CLIPS = [
    {
        id: 'c1',
        title: 'Neon Drive',
        source: 'tiktok',
        src: 'mock_video_url', // In a real app, this would be a blob URL or path
        thumbnail: 'linear-gradient(45deg, #f50057, #7c4dff)', // Placeholder
        duration: 15,
        date: '2023-10-25',
        moods: ['Hype', 'Night'],
        creator: '@neon_rider'
    },
    {
        id: 'c2',
        title: 'Morning Coffee',
        source: 'camera',
        src: 'mock_video_url',
        thumbnail: 'linear-gradient(135deg, #ff9100, #ffea00)',
        duration: 8,
        date: '2023-10-26',
        moods: ['Calm', 'Morning'],
        creator: 'me'
    },
    {
        id: 'c3',
        title: 'Gym PR',
        source: 'instagram',
        src: 'mock_video_url',
        thumbnail: 'linear-gradient(to bottom, #212121, #424242)',
        duration: 12,
        date: '2023-10-24',
        moods: ['Hype', 'Gym'],
        creator: '@gym_bro'
    },
    {
        id: 'c4',
        title: 'Rainy Window',
        source: 'tiktok',
        src: 'mock_video_url',
        thumbnail: 'linear-gradient(to top, #37474f, #90caf9)',
        duration: 22,
        date: '2023-10-20',
        moods: ['Calm', 'Sad'],
        creator: '@lofi_girl'
    },
    {
        id: 'c5',
        title: 'Funny Cat',
        source: 'youtube',
        src: 'mock_video_url',
        thumbnail: 'linear-gradient(45deg, #00c853, #69f0ae)',
        duration: 6,
        date: '2023-10-22',
        moods: ['Funny'],
        creator: '@cat_memes'
    },
    {
        id: 'c6',
        title: 'Concert Lights',
        source: 'camera',
        src: 'mock_video_url',
        thumbnail: 'linear-gradient(to right, #651fff, #e040fb)',
        duration: 18,
        date: '2023-10-15',
        moods: ['Hype', 'Memory'],
        creator: 'me'
    }
];

const SAMPLE_MENUS = [
    {
        id: 'm1',
        title: 'Morning Hype',
        count: 12,
        color: 'var(--color-accent)',
        icon: 'Sun',
        clipIds: ['c1', 'c2']
    },
    {
        id: 'm2',
        title: 'Night Calm',
        count: 8,
        color: '#8b5cf6',
        icon: 'Moon',
        clipIds: ['c4']
    },
    {
        id: 'm3',
        title: 'Creative Spark',
        count: 15,
        color: '#ec4899',
        icon: 'TrendingUp',
        clipIds: ['c1', 'c6']
    }
];

export const mockData = {
    getClips: async () => {
        try {
            const response = await fetch('/api/clips');
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (e) {
            console.warn('Falling back to mock data:', e);
            return new Promise(resolve => setTimeout(() => resolve(SAMPLE_CLIPS), 300));
        }
    },
    getMenus: async () => {
        return new Promise(resolve => setTimeout(() => resolve(SAMPLE_MENUS), 300));
    }
};
