import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import { colors, borderRadius, spacing } from '../theme';

interface ButtonProps {
    children: React.ReactNode;
    onPress?: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'sunset';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
}) => {
    const getButtonStyle = (): ViewStyle => {
        const base: ViewStyle = {
            borderRadius: borderRadius.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const variants: Record<string, ViewStyle> = {
            primary: { backgroundColor: colors.oceanBlue },
            secondary: { backgroundColor: colors.sand },
            outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.oceanBlue },
            sunset: { backgroundColor: colors.sunsetOrange },
        };

        const sizes: Record<string, ViewStyle> = {
            sm: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
            md: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
            lg: { paddingHorizontal: spacing.xl, paddingVertical: spacing.lg },
        };

        return {
            ...base,
            ...variants[variant],
            ...sizes[size],
            ...(fullWidth && { width: '100%' }),
            ...(disabled && { opacity: 0.5 }),
        };
    };

    const getTextStyle = (): TextStyle => {
        const textColors: Record<string, string> = {
            primary: colors.white,
            secondary: colors.white,
            outline: colors.oceanBlue,
            sunset: colors.white,
        };

        const textSizes: Record<string, number> = {
            sm: 14,
            md: 16,
            lg: 18,
        };

        return {
            color: textColors[variant],
            fontSize: textSizes[size],
            fontWeight: '600',
        };
    };

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'outline' ? colors.oceanBlue : colors.white} size="small" />
            ) : (
                <Text style={getTextStyle()}>{children}</Text>
            )}
        </TouchableOpacity>
    );
};
