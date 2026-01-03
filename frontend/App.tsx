import React, { useState } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
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

    const handleNavigate = (screen: string) => {
        if (screen === 'dashboard' || screen === 'register') {
            setIsAuthenticated(true);
        }
        setCurrentScreen(screen as Screen);
    };

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
        { id: 'dashboard', label: 'Home', icon: '🏠' },
        { id: 'search', label: 'Explore', icon: '🧭' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'community', label: 'Feed', icon: '👥' },
        { id: 'analytics', label: 'Stats', icon: '📊' },
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
                                <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{item.icon}</Text>
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
        fontSize: 20,
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
