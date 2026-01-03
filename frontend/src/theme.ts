// GlobeTrotter React Native Theme
// Travel-inspired color palette: Ocean, Sunset, Sand

export const colors = {
    // Ocean Blue - Primary
    oceanBlue: '#0A7EA4',
    oceanLight: '#57B8D8',
    oceanDark: '#044A5C',

    // Sand - Neutral/Warm
    sand: '#D4A574',
    sandLight: '#E8C9A3',
    sandDark: '#A67C52',

    // Sunset Orange - Accent
    sunsetOrange: '#F2784B',
    sunsetLight: '#FF9B77',
    sunsetDark: '#D55A30',

    // Background & Surfaces
    travelBg: '#F8FAFB',
    white: '#FFFFFF',
    black: '#000000',

    // Text
    text: '#044A5C',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    textInverse: '#FFFFFF',

    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Border
    border: 'rgba(0, 0, 0, 0.1)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
};

export const typography = {
    h1: {
        fontSize: 28,
        fontWeight: '600' as const,
        lineHeight: 36,
    },
    h2: {
        fontSize: 22,
        fontWeight: '600' as const,
        lineHeight: 30,
    },
    h3: {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 26,
    },
    h4: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 24,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: '400' as const,
        lineHeight: 16,
    },
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    },
};
