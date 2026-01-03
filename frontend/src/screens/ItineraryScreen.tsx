import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import { itineraryDays } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface ItineraryScreenProps {
    onNavigate: (screen: string) => void;
}

export const ItineraryScreen: React.FC<ItineraryScreenProps> = ({ onNavigate }) => {
    const totalBudget = itineraryDays.reduce(
        (sum, day) => sum + parseInt(day.totalCost.replace('$', '')),
        0
    );

    const getTypeColors = (type: string) => {
        switch (type) {
            case 'Activity': return { bg: colors.sunsetLight, text: colors.sunsetDark };
            case 'Dining': return { bg: colors.sandLight, text: colors.sandDark };
            case 'Accommodation': return { bg: colors.oceanLight, text: colors.oceanDark };
            default: return { bg: colors.travelBg, text: colors.oceanDark };
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title="Trip Itinerary"
                showBack
                onBack={() => onNavigate('myTrips')}
                rightAction={
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Text>🔗</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Text>📥</Text>
                        </TouchableOpacity>
                    </View>
                }
            />


            <View style={styles.overview}>
                <View style={styles.overviewItem}>
                    <Text style={styles.overviewIcon}>📍</Text>
                    <Text style={styles.overviewText}>Paris, France</Text>
                </View>
                <View style={styles.overviewItem}>
                    <Text style={styles.overviewIcon}>⏱️</Text>
                    <Text style={styles.overviewText}>5 Days</Text>
                </View>
                <View style={styles.overviewItem}>
                    <Text style={styles.overviewIcon}>💰</Text>
                    <Text style={styles.overviewText}>${totalBudget}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {itineraryDays.map((day, dayIndex) => (
                    <View key={day.day}>

                        <View style={styles.dayHeader}>
                            <View style={styles.dayBadge}>
                                <Text style={styles.dayBadgeText}>D{day.day}</Text>
                            </View>
                            <View style={styles.dayInfo}>
                                <Text style={styles.dayTitle}>Day {day.day}</Text>
                                <Text style={styles.dayDate}>{day.date}</Text>
                            </View>
                            <View style={styles.dayBudget}>
                                <Text style={styles.dayBudgetLabel}>Daily Budget</Text>
                                <Text style={styles.dayBudgetValue}>{day.totalCost}</Text>
                            </View>
                        </View>


                        <View style={styles.timeline}>
                            <View style={styles.timelineLine} />
                            {day.activities.map((activity, idx) => {
                                const typeColors = getTypeColors(activity.type);
                                return (
                                    <View key={idx} style={styles.activityRow}>
                                        <View style={[styles.timelineDot, { borderColor: typeColors.bg }]} />
                                        <View style={styles.activityCard}>
                                            <View style={styles.activityHeader}>
                                                <View>
                                                    <View style={styles.activityMeta}>
                                                        <View style={[styles.typeBadge, { backgroundColor: typeColors.bg }]}>
                                                            <Text style={[styles.typeText, { color: typeColors.text }]}>{activity.type}</Text>
                                                        </View>
                                                        <Text style={styles.activityTime}>{activity.time}</Text>
                                                    </View>
                                                    <Text style={styles.activityName}>{activity.name}</Text>
                                                    <View style={styles.locationRow}>
                                                        <Text style={styles.locationIcon}>📍</Text>
                                                        <Text style={styles.locationText}>{activity.location}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.activityCost}>
                                                    <Text style={styles.costValue}>{activity.cost}</Text>
                                                    <Text style={styles.costDuration}>{activity.duration}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>


                        {dayIndex < itineraryDays.length - 1 && (
                            <View style={styles.connector}>
                                <View style={styles.connectorCircle}>
                                    <Text style={styles.connectorIcon}>↓</Text>
                                </View>
                            </View>
                        )}
                    </View>
                ))}


                <View style={styles.totalCard}>
                    <View>
                        <Text style={styles.totalLabel}>Total Trip Budget</Text>
                        <Text style={styles.totalValue}>${totalBudget}</Text>
                    </View>
                    <Button variant="sunset" onPress={() => onNavigate('buildItinerary')}>
                        Edit Itinerary
                    </Button>
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
    headerActions: {
        flexDirection: 'row',
    },
    headerButton: {
        padding: spacing.sm,
    },
    overview: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    overviewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.lg,
    },
    overviewIcon: {
        marginRight: spacing.xs,
    },
    overviewText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    content: {
        padding: spacing.md,
        paddingBottom: spacing.xxl * 2,
    },
    dayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dayBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.oceanBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayBadgeText: {
        color: colors.white,
        fontWeight: '600',
    },
    dayInfo: {
        flex: 1,
        marginLeft: spacing.sm,
    },
    dayTitle: {
        ...typography.h3,
        color: colors.oceanDark,
    },
    dayDate: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    dayBudget: {
        alignItems: 'flex-end',
    },
    dayBudgetLabel: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    dayBudgetValue: {
        ...typography.body,
        color: colors.sunsetOrange,
        fontWeight: '600',
    },
    timeline: {
        marginLeft: spacing.lg,
        paddingLeft: spacing.lg,
        position: 'relative',
    },
    timelineLine: {
        position: 'absolute',
        left: spacing.lg - 1,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: colors.oceanLight,
    },
    activityRow: {
        flexDirection: 'row',
        marginBottom: spacing.md,
    },
    timelineDot: {
        position: 'absolute',
        left: spacing.lg - 8,
        top: spacing.md,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.white,
        borderWidth: 2,
    },
    activityCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadows.md,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activityMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    typeBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.full,
        marginRight: spacing.sm,
    },
    typeText: {
        ...typography.caption,
        fontWeight: '500',
    },
    activityTime: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    activityName: {
        ...typography.h4,
        color: colors.oceanDark,
        marginBottom: spacing.xs,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        fontSize: 12,
        marginRight: spacing.xs,
    },
    locationText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    activityCost: {
        alignItems: 'flex-end',
    },
    costValue: {
        ...typography.body,
        color: colors.sunsetOrange,
        fontWeight: '600',
    },
    costDuration: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    connector: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    connectorCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.sandLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectorIcon: {
        color: colors.sandDark,
        fontSize: 18,
    },
    totalCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: colors.oceanBlue,
        marginTop: spacing.lg,
        ...shadows.lg,
    },
    totalLabel: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    totalValue: {
        ...typography.h2,
        color: colors.oceanDark,
    },
});
