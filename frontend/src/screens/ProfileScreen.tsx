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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from '../components/Header';
import { Tag } from '../components/Tag';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { useAuth } from '../context/AuthContext';
import { tripService } from '../api/trips';
import { authService } from '../api/auth';

interface ProfileScreenProps {
    onNavigate: (screen: string, params?: any) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<any>(user);
    const [trips, setTrips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch fresh profile and trips
                const [profileRes, tripsRes] = await Promise.all([
                    authService.getProfile(),
                    tripService.getAllTrips()
                ]);

                setProfile(profileRes);
                setTrips(Array.isArray(tripsRes) ? tripsRes : []);
            } catch (error) {
                console.error("Profile fetch error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleLogout = async () => {
        await logout();
        // Navigation to login handled by App.tsx effect
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.oceanBlue} />
            </View>
        );
    }

    // Derived stats
    const upcomingCount = trips.filter((t: any) => t.status === 'Upcoming').length;
    const completedCount = trips.filter((t: any) => t.status === 'Completed').length;
    // Mock countries count or derive if we had that data
    const countriesCount = profile?.stats?.countriesVisited || 0;

    return (
        <View style={styles.container}>
            <Header
                title="My Profile"
                showBack
                onBack={() => onNavigate('dashboard')}
                rightAction={
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={{ color: colors.sunsetOrange }}>Logout</Text>
                    </TouchableOpacity>
                }
            />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            {profile?.avatar ? (
                                <Image source={{ uri: profile.avatar }} style={{ width: 96, height: 96, borderRadius: 48 }} />
                            ) : (
                                <Icon name="account-circle" size={96} color={colors.textSecondary} />
                            )}
                        </View>
                        <View style={styles.profileInfo}>
                            <View style={styles.profileHeader}>
                                <View>
                                    <Text style={styles.profileName}>{profile?.name || user?.name}</Text>
                                    <Text style={styles.profileRole}>Travel Enthusiast</Text>
                                </View>
                                <TouchableOpacity style={styles.editButton}>
                                    <Icon name="pencil-outline" size={18} color={colors.oceanBlue} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contactInfo}>
                                <View style={styles.contactRow}>
                                    <Icon name="email-outline" size={14} color={colors.textSecondary} style={styles.contactIcon} />
                                    <Text style={styles.contactText}>{profile?.email || user?.email}</Text>
                                </View>
                                <View style={styles.contactRow}>
                                    <Icon name="phone-outline" size={14} color={colors.textSecondary} style={styles.contactIcon} />
                                    <Text style={styles.contactText}>{profile?.phone || 'Add phone'}</Text>
                                </View>
                                <View style={styles.contactRow}>
                                    <Icon name="map-marker-outline" size={14} color={colors.textSecondary} style={styles.contactIcon} />
                                    <Text style={styles.contactText}>{profile?.location || 'Add location'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.oceanBlue }]}>{completedCount}</Text>
                            <Text style={styles.statLabel}>Trips Completed</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.sunsetOrange }]}>{countriesCount}</Text>
                            <Text style={styles.statLabel}>Countries Visited</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.sand }]}>{upcomingCount}</Text>
                            <Text style={styles.statLabel}>Upcoming Trips</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Planning</Text>
                    <View style={styles.grid}>
                        {trips.filter((t: any) => t.status === 'Planning').map((trip: any) => (
                            <TouchableOpacity
                                key={trip.id}
                                style={styles.miniCard}
                                onPress={() => onNavigate('buildItinerary')}
                            >
                                <Image source={{ uri: trip.image }} style={styles.miniImage} />
                                <View style={styles.miniContent}>
                                    <Text style={styles.miniTitle} numberOfLines={1}>{trip.title}</Text>
                                    <Text style={styles.miniSubtitle} numberOfLines={1}>{trip.destination}</Text>
                                    <Tag color="sunset">Planning</Tag>
                                </View>
                            </TouchableOpacity>
                        ))}
                        {trips.filter((t: any) => t.status === 'Planning').length === 0 && (
                            <Text style={{ color: colors.textSecondary }}>No trips in planning.</Text>
                        )}
                    </View>
                </View>


                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>History</Text>
                        <TouchableOpacity onPress={() => onNavigate('myTrips')}>
                            <Text style={styles.sectionLink}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.grid}>
                        {trips.filter((t: any) => t.status === 'Completed').slice(0, 3).map((trip: any) => (
                            <TouchableOpacity
                                key={trip.id}
                                style={styles.miniCard}
                                onPress={() => onNavigate('itinerary', { tripId: trip.id })}
                            >
                                <Image source={{ uri: trip.image }} style={styles.miniImage} />
                                <View style={styles.miniContent}>
                                    <Text style={styles.miniTitle} numberOfLines={1}>{trip.title}</Text>
                                    <Text style={styles.miniSubtitle} numberOfLines={1}>{trip.destination}</Text>
                                    <View style={styles.dateRow}>
                                        <Icon name="calendar-blank" size={12} color={colors.textSecondary} style={styles.dateIcon} />
                                        <Text style={styles.dateText}>{trip.startDate}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
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
    content: {
        paddingBottom: spacing.xxl * 2,
    },
    profileCard: {
        backgroundColor: colors.white,
        padding: spacing.lg,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: colors.oceanLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    profileName: {
        ...typography.h2,
        color: colors.oceanDark,
    },
    profileRole: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    editButton: {
        padding: spacing.sm,
    },
    contactInfo: {
        gap: spacing.xs,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        marginRight: spacing.sm,
    },
    contactText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: spacing.lg,
        paddingTop: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.oceanLight,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    statLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    section: {
        padding: spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
        marginBottom: spacing.md,
    },
    sectionLink: {
        ...typography.bodySmall,
        color: colors.sunsetOrange,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    miniCard: {
        width: '33.33%',
        padding: spacing.xs,
    },
    miniImage: {
        height: 96,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
    },
    miniContent: {
        backgroundColor: colors.white,
        padding: spacing.sm,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
        ...shadows.sm,
    },
    miniTitle: {
        ...typography.caption,
        color: colors.oceanDark,
        fontWeight: '600',
        marginBottom: 2,
    },
    miniSubtitle: {
        ...typography.caption,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateIcon: {
        marginRight: 4,
    },
    dateText: {
        ...typography.caption,
        color: colors.textSecondary,
        fontSize: 10,
    },
});
