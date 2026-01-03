import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { mockUser, preplannedTrips, previousTrips } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface ProfileScreenProps {
    onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
    return (
        <View style={styles.container}>
            <Header title="My Profile" showBack onBack={() => onNavigate('dashboard')} />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarIcon}>👤</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <View style={styles.profileHeader}>
                                <View>
                                    <Text style={styles.profileName}>{mockUser.name}</Text>
                                    <Text style={styles.profileRole}>Travel Enthusiast</Text>
                                </View>
                                <TouchableOpacity style={styles.editButton}>
                                    <Text style={styles.editIcon}>✏️</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contactInfo}>
                                <View style={styles.contactRow}>
                                    <Text style={styles.contactIcon}>✉️</Text>
                                    <Text style={styles.contactText}>{mockUser.email}</Text>
                                </View>
                                <View style={styles.contactRow}>
                                    <Text style={styles.contactIcon}>📞</Text>
                                    <Text style={styles.contactText}>{mockUser.phone}</Text>
                                </View>
                                <View style={styles.contactRow}>
                                    <Text style={styles.contactIcon}>📍</Text>
                                    <Text style={styles.contactText}>{mockUser.location}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.oceanBlue }]}>{mockUser.tripsCompleted}</Text>
                            <Text style={styles.statLabel}>Trips Completed</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.sunsetOrange }]}>{mockUser.countriesVisited}</Text>
                            <Text style={styles.statLabel}>Countries Visited</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.sand }]}>{mockUser.upcomingTrips}</Text>
                            <Text style={styles.statLabel}>Upcoming Trips</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preplanned Trips</Text>
                    <View style={styles.grid}>
                        {preplannedTrips.map((trip) => (
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
                    </View>
                </View>


                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Previous Trips</Text>
                        <TouchableOpacity onPress={() => onNavigate('myTrips')}>
                            <Text style={styles.sectionLink}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.grid}>
                        {previousTrips.slice(0, 3).map((trip) => (
                            <TouchableOpacity
                                key={trip.id}
                                style={styles.miniCard}
                                onPress={() => onNavigate('itinerary')}
                            >
                                <Image source={{ uri: trip.image }} style={styles.miniImage} />
                                <View style={styles.miniContent}>
                                    <Text style={styles.miniTitle} numberOfLines={1}>{trip.title}</Text>
                                    <Text style={styles.miniSubtitle} numberOfLines={1}>{trip.destination}</Text>
                                    <View style={styles.dateRow}>
                                        <Text style={styles.dateIcon}>📅</Text>
                                        <Text style={styles.dateText}>{trip.dates}</Text>
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
        backgroundColor: colors.oceanBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarIcon: {
        fontSize: 48,
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
    editIcon: {
        fontSize: 18,
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
        fontSize: 14,
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
        fontSize: 10,
        marginRight: 4,
    },
    dateText: {
        ...typography.caption,
        color: colors.textSecondary,
        fontSize: 10,
    },
});
