import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput as RNTextInput,
    StyleSheet,
    TextInputProps as RNTextInputProps,
} from 'react-native';
import { colors, borderRadius, spacing, typography } from '../theme';

interface InputProps extends Omit<RNTextInputProps, 'onChange'> {
    label?: string;
    value?: string;
    onChangeText?: (value: string) => void;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    value,
    onChangeText,
    error,
    placeholder,
    secureTextEntry,
    keyboardType,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <RNTextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
        width: '100%',
    },
    label: {
        ...typography.body,
        color: colors.text,
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.oceanLight,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.white,
    },
    inputFocused: {
        borderColor: colors.oceanBlue,
        borderWidth: 2,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        ...typography.caption,
        color: colors.error,
        marginTop: spacing.xs,
    },
});
