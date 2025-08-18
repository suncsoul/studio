
export interface Avatar {
    type: string;
    emoji: string;
    title: string;
    description: string;
}

export const allAvatars: Avatar[] = [
    // Dating Desires
    { type: 'romantic', emoji: '🌹', title: 'The Romantic', description: 'Seeks long-term love' },
    { type: 'spark_chaser', emoji: '⚡', title: 'The Spark Chaser', description: 'Wants passionate flings' },
    { type: 'slow_burner', emoji: '🕯️', title: 'The Slow Burner', description: 'Prefers gradual connections' },
    
    // Mood Vibes
    { type: 'adventurer', emoji: '🗺️', title: 'Weekend Adventurer', description: 'Active & outgoing' },
    { type: 'conversationalist', emoji: '💭', title: 'Deep Conversationalist', description: 'Philosophical chats' },
    { type: 'flirty_teaser', emoji: '😏', title: 'Flirty Teaser', description: 'Playful banter' },

    // Personality Archetypes
    { type: 'listener', emoji: '👂', title: 'The Listener', description: 'Empathetic energy' },
    { type: 'wildcard', emoji: '🎭', title: 'The Wildcard', description: 'Unpredictable fun' },
    { type: 'guru', emoji: '🧠', title: 'The Guru', description: 'Advice-seeker' },
];
