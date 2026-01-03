import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { useAuth } from '../context/AuthContext';

interface LoginScreenProps {
    onNavigate: (screen: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarIcon}>👤</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>Globe Trotter</Text>

                    <View style={styles.card}>
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Button
                            variant="primary"
                            fullWidth
                            onPress={async () => {
                                try {
                                    await login({ username, password });
                                } catch (e) {
                                    console.error(e);
                                    // Error handling TODO
                                }
                            }}
                        >
                            Login
                        </Button>

                        <View style={styles.registerRow}>
                            <Text style={styles.registerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => onNavigate('register')}>
                                <Text style={styles.registerLink}>Register here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.travelBg,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: colors.oceanBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIcon: {
        fontSize: 64,
    },
    title: {
        ...typography.h1,
        color: colors.oceanDark,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        ...shadows.lg,
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    registerText: {
        ...typography.bodySmall,
        color: colors.oceanDark,
    },
    registerLink: {
        ...typography.bodySmall,
        color: colors.sunsetOrange,
        textDecorationLine: 'underline',
    },
});
