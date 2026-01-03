import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { ongoingTrips, upcomingTrips, completedTrips, Trip } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface MyTripsScreenProps {
    onNavigate: (screen: string) => void;
}

type TabType = 'ongoing' | 'upcoming' | 'completed';

const TripCard: React.FC<{ trip: Trip; onPress: () => void }> = ({ trip, onPress }) => (
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
                <Text style={styles.tripText}>{trip.dates}</Text>
            </View>
            <View style={styles.tripRow}>
                <Text style={styles.tripIcon}>💰</Text>
                <Text style={styles.tripText}>{trip.budget}</Text>
            </View>
            <View style={styles.tripDivider} />
            <Text style={styles.tripOverview} numberOfLines={3}>{trip.overview}</Text>
        </View>
    </TouchableOpacity>
);

export const MyTripsScreen: React.FC<MyTripsScreenProps> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState<TabType>('ongoing');

    const tabs: { key: TabType; label: string }[] = [
        { key: 'ongoing', label: 'Ongoing' },
        { key: 'upcoming', label: 'Upcoming' },
        { key: 'completed', label: 'Completed' },
    ];

    const getTrips = () => {
        switch (activeTab) {
            case 'ongoing': return ongoingTrips;
            case 'upcoming': return upcomingTrips;
            case 'completed': return completedTrips;
            default: return [];
        }
    };

    const getTabColor = (tab: TabType): string => {
        switch (tab) {
            case 'ongoing': return colors.oceanBlue;
            case 'upcoming': return colors.sunsetOrange;
            case 'completed': return colors.sand;
        }
    };

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
                {getTrips().map((trip) => (
                    <TripCard key={trip.id} trip={trip} onPress={() => onNavigate('itinerary')} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.travelBg,
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
});
