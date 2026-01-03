import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme';

type TagColor = 'ocean' | 'sunset' | 'sand' | 'success' | 'neutral';

interface TagProps {
    children: React.ReactNode;
    color?: TagColor;
}

export const Tag: React.FC<TagProps> = ({ children, color = 'ocean' }) => {
    const colorMap: Record<TagColor, { bg: string; text: string }> = {
        ocean: { bg: colors.oceanLight, text: colors.oceanDark },
        sunset: { bg: colors.sunsetLight, text: colors.sunsetDark },
        sand: { bg: colors.sandLight, text: colors.sandDark },
        success: { bg: '#D1FAE5', text: '#065F46' },
        neutral: { bg: colors.travelBg, text: colors.textSecondary },
    };

    return (
        <View style={[styles.tag, { backgroundColor: colorMap[color].bg }]}>
            <Text style={[styles.text, { color: colorMap[color].text }]}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        alignSelf: 'flex-start',
    },
    text: {
        ...typography.caption,
        fontWeight: '500',
    },
});
