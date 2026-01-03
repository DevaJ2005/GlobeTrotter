import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { colors, spacing, typography, borderRadius } from '../theme';
import { useAuth } from '../context/AuthContext';
import { tripService } from '../api/trips';
import { client } from '../api/client';

interface DashboardScreenProps {
    onNavigate: (screen: string, params?: any) => void;
}

const { width } = Dimensions.get('window');

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [stats, setStats] = useState<any>(null);
    const [recentTrips, setRecentTrips] = useState<any[]>([]);
    const [regionalDestinations, setRegionalDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Parallel fetching
                const [tripsRes, regionsRes] = await Promise.all([
                    tripService.getAllTrips(),
                    client.get('/destinations/regional')
                ]);

                // Assuming tripsRes contains all trips, filter/sort locally or use backend query
                // For now, take first 3 real trips or empty if data format differs
                setRecentTrips(Array.isArray(tripsRes) ? tripsRes.slice(0, 3) : []);
                setRegionalDestinations(Array.isArray(regionsRes.data) ? regionsRes.data : []);

                // If user object doesn't have stats, we might need a separate call
                // setStats(user?.stats); 

            } catch (error) {
                console.error("Dashboard fetch error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.oceanBlue} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.hero}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=800' }}
                    style={styles.heroImage}
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                    style={styles.heroOverlay}
                />

                <View style={styles.heroContent}>
                    <View style={styles.heroHeader}>
                        <View>
                            <Text style={styles.heroTitle}>Welcome Back!</Text>
                            <Text style={styles.heroSubtitle}>Where will you go next?</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => onNavigate('profile')}
                        >
                            <Icon name="account-circle" size={24} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Icon name="magnify" size={20} color={colors.textMuted} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search destinations, activities..."
                            placeholderTextColor={colors.textMuted}
                            onFocus={() => onNavigate('search')}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Regional Selections</Text>
                    <TouchableOpacity>
                        <Text style={styles.sectionLink}>View All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {regionalDestinations.map((dest: any) => (
                        <TouchableOpacity
                            key={dest.id}
                            style={styles.destinationCard}
                            onPress={() => onNavigate('createTrip')}
                        >
                            <Image source={{ uri: dest.image }} style={styles.destinationImage} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.6)']}
                                style={styles.destinationOverlay}
                            />
                            <Text style={styles.destinationName}>{dest.name}</Text>
                        </TouchableOpacity>
                    ))}
                    {regionalDestinations.length === 0 && (
                        <Text style={{ marginLeft: spacing.md, color: colors.textSecondary }}>No destinations found.</Text>
                    )}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Your Recent Trips</Text>
                    <TouchableOpacity onPress={() => onNavigate('myTrips')}>
                        <Text style={styles.sectionLink}>See All</Text>
                    </TouchableOpacity>
                </View>
                {recentTrips.map((trip: any) => (
                    <Card key={trip.id} onPress={() => onNavigate('itinerary', { tripId: trip.id, tripName: trip.title })} style={styles.tripCard}>
                        <View style={styles.tripRow}>
                            <Image source={{ uri: trip.image }} style={styles.tripImage} />
                            <View style={styles.tripInfo}>
                                <Text style={styles.tripTitle}>{trip.title}</Text>
                                <View style={styles.tripMeta}>
                                    <Icon name="calendar-blank" size={14} color={colors.textSecondary} style={styles.tripIcon} />
                                    <Text style={styles.tripDates}>
                                        {trip.startDate} - {trip.endDate}
                                    </Text>
                                </View>
                                <Tag color="sand">{trip.status || 'Planned'}</Tag>
                            </View>
                            <Icon name="chevron-right" size={24} color={colors.oceanBlue} />
                        </View>
                    </Card>
                ))}
                {recentTrips.length === 0 && (
                    <Text style={{ marginLeft: spacing.md, color: colors.textSecondary }}>No trips found. Plan one now!</Text>
                )}
            </View>

            <View style={styles.ctaSection}>
                <Button variant="primary" fullWidth size="lg" onPress={() => onNavigate('createTrip')}>
                    <Icon name="map-plus" size={18} color={colors.white} style={{ marginRight: 8 }} /> Plan New Trip
                </Button>
            </View>
        </ScrollView>
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
    hero: {
        height: 280,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    heroContent: {
        position: 'absolute',
        top: spacing.xxl,
        left: spacing.md,
        right: spacing.md,
    },
    heroHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    heroTitle: {
        ...typography.h2,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    heroSubtitle: {
        ...typography.bodySmall,
        color: colors.white,
        opacity: 0.9,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIcon: {
        fontSize: 20,
    },
    searchContainer: {
        position: 'absolute',
        bottom: spacing.lg,
        left: spacing.md,
        right: spacing.md,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    section: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
    },
    sectionLink: {
        ...typography.bodySmall,
        color: colors.sunsetOrange,
    },
    horizontalScroll: {
        marginHorizontal: -spacing.md,
        paddingHorizontal: spacing.md,
    },
    destinationCard: {
        width: 140,
        height: 140,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    destinationImage: {
        width: '100%',
        height: '100%',
    },
    destinationOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    destinationName: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
        ...typography.body,
        color: colors.white,
        fontWeight: '500',
    },
    tripCard: {
        marginBottom: spacing.sm,
        padding: 0,
        overflow: 'hidden',
    },
    tripRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tripImage: {
        width: 100,
        height: 100,
    },
    tripInfo: {
        flex: 1,
        padding: spacing.md,
    },
    tripTitle: {
        ...typography.h4,
        color: colors.oceanDark,
        marginBottom: spacing.xs,
    },
    tripMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    tripIcon: {
        marginRight: spacing.xs,
    },
    tripDates: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    chevron: {
        fontSize: 24,
        color: colors.oceanBlue,
        paddingRight: spacing.md,
    },
    ctaSection: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl * 2,
    },
});
