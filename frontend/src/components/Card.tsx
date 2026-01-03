import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../theme';

interface CardProps extends ViewProps {
    children: React.ReactNode;
    onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style, ...rest }) => {
    if (onPress) {
        return (
            <TouchableOpacity
                style={[styles.card, style]}
                onPress={onPress}
                activeOpacity={0.8}
                {...rest}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.card, style]} {...rest}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        ...shadows.md,
    },
});
