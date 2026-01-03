import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
    rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    showBack = false,
    onBack,
    rightAction,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {showBack ? (
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                {rightAction ? rightAction : <View style={styles.placeholder} />}
            </View>
        </View>
    );
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingTop: STATUSBAR_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        minHeight: 56,
    },
    backButton: {
        padding: spacing.sm,
        marginLeft: -spacing.sm,
    },
    backIcon: {
        fontSize: 24,
        color: colors.oceanDark,
    },
    title: {
        ...typography.h2,
        color: colors.oceanDark,
        flex: 1,
        textAlign: 'center',
    },
    placeholder: {
        width: 40,
    },
});
