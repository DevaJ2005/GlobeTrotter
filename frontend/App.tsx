import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform, BackHandler } from 'react-native';
import { colors } from './src/theme';

// Screens
import {
    LoginScreen,
    RegisterScreen,
    DashboardScreen,
    CreateTripScreen,
    BuildItineraryScreen,
    MyTripsScreen,
    ProfileScreen,
    ItineraryScreen,
    SearchResultsScreen,
    CommunityScreen,
    CalendarScreen,
    AnalyticsScreen,
} from './src/screens';

type Screen =
    | 'login'
    | 'register'
    | 'dashboard'
    | 'createTrip'
    | 'buildItinerary'
    | 'myTrips'
    | 'profile'
    | 'search'
    | 'itinerary'
    | 'community'
    | 'calendar'
    | 'analytics';

// Simple navigation implementation (no external nav library required for basic demo)
const App = () => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [history, setHistory] = useState<Screen[]>([]);

    const handleNavigate = (screen: string) => {
        if (screen === 'dashboard' || screen === 'register') {
            setIsAuthenticated(true);
        }
        setHistory(prev => [...prev, currentScreen]);
        setCurrentScreen(screen as Screen);
    };

    const handleBack = () => {
        if (history.length > 0) {
            const previousScreen = history[history.length - 1];
            setHistory(prev => prev.slice(0, -1));
            setCurrentScreen(previousScreen);
            return true;
        }
        return false;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBack
        );

        return () => backHandler.remove();
    }, [history]);

    const renderScreen = () => {
        const props = { onNavigate: handleNavigate };

        switch (currentScreen) {
            case 'login':
                return <LoginScreen {...props} />;
            case 'register':
                return <RegisterScreen {...props} />;
            case 'dashboard':
                return <DashboardScreen {...props} />;
            case 'createTrip':
                return <CreateTripScreen {...props} />;
            case 'buildItinerary':
                return <BuildItineraryScreen {...props} />;
            case 'myTrips':
                return <MyTripsScreen {...props} />;
            case 'profile':
                return <ProfileScreen {...props} />;
            case 'itinerary':
                return <ItineraryScreen {...props} />;
            case 'search':
                return <SearchResultsScreen {...props} />;
            case 'community':
                return <CommunityScreen {...props} />;
            case 'calendar':
                return <CalendarScreen {...props} />;
            case 'analytics':
                return <AnalyticsScreen {...props} />;
            default:
                return <DashboardScreen {...props} />;
        }
    };

    // Hide bottom nav on certain screens
    const showBottomNav = isAuthenticated && !['login', 'register', 'createTrip', 'buildItinerary', 'myTrips', 'profile', 'itinerary'].includes(currentScreen);

    const navItems = [
        { id: 'dashboard', label: 'Home', icon: 'home-variant' },
        { id: 'search', label: 'Explore', icon: 'compass-outline' },
        { id: 'calendar', label: 'Calendar', icon: 'calendar-month' },
        { id: 'community', label: 'Feed', icon: 'account-group' },
        { id: 'analytics', label: 'Stats', icon: 'chart-bar' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
            {renderScreen()}

            {/* Bottom Navigation */}
            {showBottomNav && (
                <View style={styles.bottomNav}>
                    {navItems.map((item) => {
                        const isActive = currentScreen === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.navItem, isActive && styles.navItemActive]}
                                onPress={() => handleNavigate(item.id)}
                            >
                                <Icon
                                    name={item.icon}
                                    size={24}
                                    color={isActive ? colors.oceanDark : colors.textMuted}
                                    style={[styles.navIcon, isActive && styles.navIconActive]}
                                />
                                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.oceanLight,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        paddingTop: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    navItemActive: {
        backgroundColor: colors.oceanLight,
    },
    navIcon: {
        marginBottom: 4,
        opacity: 0.6,
    },
    navIconActive: {
        opacity: 1,
    },
    navLabel: {
        fontSize: 12,
        color: colors.textMuted,
    },
    navLabelActive: {
        color: colors.oceanDark,
        fontWeight: '600',
    },
});

export default App;
