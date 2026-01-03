import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { ongoingTrips, upcomingTrips } from '../data/mockData';
import { colors, spacing, typography, borderRadius } from '../theme';

interface CalendarScreenProps {
    onNavigate: (screen: string) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ onNavigate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const navigateMonth = (direction: number) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === currentMonth.getMonth() &&
            today.getFullYear() === currentMonth.getFullYear()
        );
    };

    // Sample trip days (simplified)
    const tripDays = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const renderCalendarDays = () => {
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const hasTrip = tripDays.includes(day);
            days.push(
                <TouchableOpacity
                    key={day}
                    style={[styles.dayCell, isToday(day) && styles.todayCell]}
                >
                    <Text style={[styles.dayNumber, isToday(day) && styles.todayNumber]}>
                        {day}
                    </Text>
                    {hasTrip && <View style={styles.tripDot} />}
                </TouchableOpacity>
            );
        }

        return days;
    };

    const allTrips = [...ongoingTrips, ...upcomingTrips];

    return (
        <View style={styles.container}>
            <Header title="Calendar" />
            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.calendarCard}>

                    <View style={styles.monthNav}>
                        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.navButton}>
                            <Text style={styles.navIcon}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </Text>
                        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.navButton}>
                            <Text style={styles.navIcon}>›</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.dayHeaders}>
                        {dayNames.map((day) => (
                            <Text key={day} style={styles.dayHeader}>{day}</Text>
                        ))}
                    </View>


                    <View style={styles.calendarGrid}>{renderCalendarDays()}</View>


                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={styles.legendDot} />
                            <Text style={styles.legendText}>Trip Day</Text>
                        </View>
                    </View>
                </Card>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Trips</Text>
                    {allTrips.map((trip) => (
                        <Card
                            key={trip.id}
                            onPress={() => onNavigate('itinerary')}
                            style={styles.tripCard}
                        >
                            <View style={styles.tripRow}>
                                <View style={styles.tripInfo}>
                                    <Text style={styles.tripTitle}>{trip.title}</Text>
                                    <Text style={styles.tripDates}>📅 {trip.dates}</Text>
                                </View>
                                <Tag color="ocean">{trip.destination.split(',')[0]}</Tag>
                            </View>
                        </Card>
                    ))}
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
        padding: spacing.md,
        paddingBottom: spacing.xxl * 2,
    },
    calendarCard: {
        marginBottom: spacing.lg,
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    navButton: {
        padding: spacing.sm,
    },
    navIcon: {
        fontSize: 28,
        color: colors.oceanBlue,
        fontWeight: '300',
    },
    monthTitle: {
        ...typography.h3,
        color: colors.text,
    },
    dayHeaders: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    dayHeader: {
        flex: 1,
        textAlign: 'center',
        ...typography.caption,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todayCell: {
        backgroundColor: colors.oceanBlue + '20',
        borderRadius: borderRadius.md,
    },
    dayNumber: {
        ...typography.body,
        color: colors.text,
    },
    todayNumber: {
        color: colors.oceanBlue,
        fontWeight: '600',
    },
    tripDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.sunsetOrange,
        marginTop: 2,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.sunsetOrange,
        marginRight: spacing.xs,
    },
    legendText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    section: {
        marginTop: spacing.md,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
        marginBottom: spacing.md,
    },
    tripCard: {
        marginBottom: spacing.sm,
    },
    tripRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tripInfo: {},
    tripTitle: {
        ...typography.body,
        color: colors.oceanDark,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    tripDates: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
});
