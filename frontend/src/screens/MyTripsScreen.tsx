import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../components/Header';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { tripService } from '../api/trips';

interface MyTripsScreenProps {
    onNavigate: (screen: string, params?: any) => void;
}

type TabType = 'ongoing' | 'upcoming' | 'completed' | 'planning';

const TripCard: React.FC<{ trip: any; onPress: () => void }> = ({ trip, onPress }) => (
    <TouchableOpacity style={styles.tripCard} onPress={onPress}>
        <View style={styles.tripImageContainer}>
            <Image source={{ uri: trip.image }} style={styles.tripImage} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.tripOverlay} />
            <Text style={styles.tripTitle}>{trip.title}</Text>
        </View>
        <View style={styles.tripContent}>
            <View style={styles.tripRow}>
                <Text style={styles.tripIcon}>📍</Text>
                <Text style={styles.tripText}>{trip.destination}</Text>
            </View>
            <View style={styles.tripRow}>
                <Text style={styles.tripIcon}>📅</Text>
                <Text style={styles.tripText}>{trip.startDate} - {trip.endDate}</Text>
            </View>
            <View style={styles.tripDivider} />
            <Text style={styles.tripOverview} numberOfLines={3}>{trip.description || 'No description available.'}</Text>
        </View>
    </TouchableOpacity>
);

export const MyTripsScreen: React.FC<MyTripsScreenProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<TabType>('planning');
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await tripService.getAllTrips();
                setTrips(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Fetch trips error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    const tabs: { key: TabType; label: string }[] = [
        { key: 'planning', label: 'Planning' },
        { key: 'upcoming', label: 'Upcoming' },
        { key: 'ongoing', label: 'Ongoing' },
        { key: 'completed', label: 'History' },
    ];

    const getTrips = () => {
        // Filter based on status. Note: Backend statuses might differ in casing
        const targetStatus = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
        if (activeTab === 'completed') {
            return trips.filter(t => t.status === 'Completed');
        }
        return trips.filter(t => t.status === targetStatus);
    };

    const getTabColor = (tab: TabType): string => {
        switch (tab) {
            case 'planning': return colors.sunsetOrange;
            case 'ongoing': return colors.oceanBlue;
            case 'upcoming': return colors.oceanLight;
            case 'completed': return colors.sand;
            default: return colors.oceanBlue;
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.oceanBlue} />
            </View>
        );
    }

    const displayedTrips = getTrips();

    return (
        <View style={styles.container}>
            <Header title="My Trips" showBack onBack={() => onNavigate('dashboard')} />

            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.tab,
                            activeTab === tab.key && { backgroundColor: getTabColor(tab.key) },
                        ]}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {displayedTrips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onPress={() => onNavigate(activeTab === 'planning' ? 'buildItinerary' : 'itinerary', { tripId: trip.id, tripName: trip.title })}
                    />
                ))}
                {displayedTrips.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No trips found in this category.</Text>
                        <TouchableOpacity onPress={() => onNavigate('createTrip')}>
                            <Text style={{ color: colors.oceanBlue, marginTop: 8 }}>Plan a new trip</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.travelBg,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: spacing.md,
        marginVertical: spacing.md,
        borderRadius: borderRadius.lg,
        padding: spacing.xs,
        ...shadows.sm,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.md,
    },
    tabText: {
        ...typography.body,
        color: colors.textSecondary,
        fontSize: 12,
    },
    tabTextActive: {
        color: colors.white,
        fontWeight: '600',
    },
    content: {
        padding: spacing.md,
        paddingBottom: spacing.xxl * 2,
    },
    tripCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginBottom: spacing.md,
        ...shadows.md,
    },
    tripImageContainer: {
        height: 180,
        position: 'relative',
    },
    tripImage: {
        width: '100%',
        height: '100%',
    },
    tripOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    tripTitle: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        ...typography.h3,
        color: colors.white,
    },
    tripContent: {
        padding: spacing.md,
    },
    tripRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.xs,
    },
    tripIcon: {
        width: 24,
        marginRight: spacing.xs,
    },
    tripText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        flex: 1,
    },
    tripDivider: {
        height: 1,
        backgroundColor: colors.oceanLight,
        marginVertical: spacing.sm,
    },
    tripOverview: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    emptyText: {
        color: colors.textSecondary,
    }
});
