import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../api/auth';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextData {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('auth_token');
            const storedUser = await AsyncStorage.getItem('auth_user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to load auth data', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: any) => {
        try {
            const response = await authService.login(credentials);
            const { token: newToken, user: newUser } = response;

            setToken(newToken);
            setUser(newUser);

            await AsyncStorage.setItem('auth_token', newToken);
            await AsyncStorage.setItem('auth_user', JSON.stringify(newUser));
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const register = async (data: any) => {
        try {
            await authService.register(data);
            // Auto login after register if backend supports it, or just return
        } catch (error) {
            console.error('Registration failed', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('auth_user');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
