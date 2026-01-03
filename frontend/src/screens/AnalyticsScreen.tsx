import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface AnalyticsScreenProps {
    onNavigate: (screen: string) => void;
}

const analyticsData = {
    totalTrips: 12,
    countriesVisited: 8,
    totalSpent: '$24,500',
    topDestinations: [
        { name: 'Paris', visits: 3 },
        { name: 'Tokyo', visits: 2 },
        { name: 'Dubai', visits: 2 },
        { name: 'Bali', visits: 1 },
    ],
    monthlySpending: [
        { month: 'Jan', amount: 2500 },
        { month: 'Feb', amount: 1800 },
        { month: 'Mar', amount: 3200 },
        { month: 'Apr', amount: 2100 },
        { month: 'May', amount: 2800 },
        { month: 'Jun', amount: 1500 },
    ],
    categoryBreakdown: [
        { category: 'Flights', amount: 8500, percent: 35 },
        { category: 'Hotels', amount: 7200, percent: 29 },
        { category: 'Activities', amount: 4800, percent: 20 },
        { category: 'Food', amount: 3000, percent: 12 },
        { category: 'Other', amount: 1000, percent: 4 },
    ],
};

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onNavigate }) => {
    const maxAmount = Math.max(...analyticsData.monthlySpending.map(m => m.amount));

    return (
        <View style={styles.container}>
            <Header title="Travel Stats" />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>✈️</Text>
                        <Text style={styles.statValue}>{analyticsData.totalTrips}</Text>
                        <Text style={styles.statLabel}>Total Trips</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>🌍</Text>
                        <Text style={styles.statValue}>{analyticsData.countriesVisited}</Text>
                        <Text style={styles.statLabel}>Countries</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>💰</Text>
                        <Text style={styles.statValue}>{analyticsData.totalSpent}</Text>
                        <Text style={styles.statLabel}>Total Spent</Text>
                    </Card>
                </View>


                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Monthly Spending</Text>
                    <View style={styles.chart}>
                        {analyticsData.monthlySpending.map((item) => {
                            const height = (item.amount / maxAmount) * 100;
                            return (
                                <View key={item.month} style={styles.chartBar}>
                                    <View style={styles.barContainer}>
                                        <View style={[styles.bar, { height: `${height}%` }]} />
                                    </View>
                                    <Text style={styles.barLabel}>{item.month}</Text>
                                    <Text style={styles.barValue}>${(item.amount / 1000).toFixed(1)}k</Text>
                                </View>
                            );
                        })}
                    </View>
                </Card>


                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Destinations</Text>
                    {analyticsData.topDestinations.map((dest, index) => {
                        const maxVisits = analyticsData.topDestinations[0].visits;
                        const width = (dest.visits / maxVisits) * 100;
                        return (
                            <View key={dest.name} style={styles.destRow}>
                                <View style={styles.destInfo}>
                                    <Text style={styles.destRank}>{index + 1}</Text>
                                    <Text style={styles.destName}>{dest.name}</Text>
                                </View>
                                <View style={styles.destBarBg}>
                                    <View style={[styles.destBar, { width: `${width}%` }]} />
                                </View>
                                <Text style={styles.destVisits}>{dest.visits}</Text>
                            </View>
                        );
                    })}
                </Card>


                <Card style={styles.section}>
                    <Text style={styles.sectionTitle}>Spending by Category</Text>
                    {analyticsData.categoryBreakdown.map((cat) => (
                        <View key={cat.category} style={styles.catRow}>
                            <View style={styles.catInfo}>
                                <Text style={styles.catName}>{cat.category}</Text>
                                <Text style={styles.catAmount}>${cat.amount.toLocaleString()}</Text>
                            </View>
                            <View style={styles.catBarBg}>
                                <View style={[styles.catBar, { width: `${cat.percent}%` }]} />
                            </View>
                            <Text style={styles.catPercent}>{cat.percent}%</Text>
                        </View>
                    ))}
                </Card>
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
    statsGrid: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        marginHorizontal: -spacing.xs,
    },
    statCard: {
        flex: 1,
        marginHorizontal: spacing.xs,
        alignItems: 'center',
        padding: spacing.md,
    },
    statIcon: {
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    statValue: {
        ...typography.h3,
        color: colors.oceanBlue,
    },
    statLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    section: {
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
        marginBottom: spacing.md,
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
    },
    chartBar: {
        flex: 1,
        alignItems: 'center',
    },
    barContainer: {
        flex: 1,
        width: '60%',
        justifyContent: 'flex-end',
        marginBottom: spacing.xs,
    },
    bar: {
        backgroundColor: colors.sunsetOrange,
        borderRadius: borderRadius.sm,
        minHeight: 4,
    },
    barLabel: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    barValue: {
        ...typography.caption,
        color: colors.text,
        fontWeight: '600',
    },
    destRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    destInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 80,
    },
    destRank: {
        ...typography.body,
        color: colors.textSecondary,
        width: 24,
    },
    destName: {
        ...typography.body,
        color: colors.text,
    },
    destBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: colors.travelBg,
        borderRadius: 4,
        marginHorizontal: spacing.sm,
        overflow: 'hidden',
    },
    destBar: {
        height: '100%',
        backgroundColor: colors.oceanBlue,
        borderRadius: 4,
    },
    destVisits: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        width: 30,
        textAlign: 'right',
    },
    catRow: {
        marginBottom: spacing.sm,
    },
    catInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xs,
    },
    catName: {
        ...typography.body,
        color: colors.text,
    },
    catAmount: {
        ...typography.body,
        color: colors.oceanDark,
        fontWeight: '600',
    },
    catBarBg: {
        height: 8,
        backgroundColor: colors.travelBg,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: spacing.xs,
    },
    catBar: {
        height: '100%',
        backgroundColor: colors.sand,
        borderRadius: 4,
    },
    catPercent: {
        ...typography.caption,
        color: colors.textSecondary,
        textAlign: 'right',
    },
});
