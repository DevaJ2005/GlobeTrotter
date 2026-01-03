import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface RegisterScreenProps {
    onNavigate: (screen: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');

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
                    <Text style={styles.title}>Create Account</Text>

                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <Input
                                    label="First Name"
                                    placeholder="First name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <Input
                                    label="Last Name"
                                    placeholder="Last name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                            </View>
                        </View>

                        <Input
                            label="Email Address"
                            placeholder="your.email@example.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Input
                            label="Phone Number"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />

                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <Input
                                    label="City"
                                    placeholder="City"
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <Input
                                    label="Country"
                                    placeholder="Country"
                                    value={country}
                                    onChangeText={setCountry}
                                />
                            </View>
                        </View>

                        <View style={styles.textareaContainer}>
                            <Text style={styles.label}>Additional Information</Text>
                            <TextInput
                                style={styles.textarea}
                                placeholder="Tell us about your travel preferences..."
                                placeholderTextColor={colors.textMuted}
                                value={bio}
                                onChangeText={setBio}
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        <Button
                            variant="sunset"
                            fullWidth
                            onPress={() => onNavigate('dashboard')}
                        >
                            Register Now
                        </Button>

                        <View style={styles.loginRow}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => onNavigate('login')}>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
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
        padding: spacing.lg,
        paddingTop: spacing.xxl,
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
    row: {
        flexDirection: 'row',
        marginHorizontal: -spacing.xs,
    },
    halfInput: {
        flex: 1,
        paddingHorizontal: spacing.xs,
    },
    textareaContainer: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.body,
        color: colors.text,
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    textarea: {
        borderWidth: 1,
        borderColor: colors.oceanLight,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.white,
        minHeight: 100,
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    loginText: {
        ...typography.bodySmall,
        color: colors.oceanDark,
    },
    loginLink: {
        ...typography.bodySmall,
        color: colors.oceanBlue,
        textDecorationLine: 'underline',
    },
});
