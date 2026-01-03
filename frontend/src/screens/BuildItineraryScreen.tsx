import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Tag } from '../components/Tag';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface BuildItineraryScreenProps {
    onNavigate: (screen: string) => void;
}

interface Section {
    id: number;
    title: string;
}

export const BuildItineraryScreen: React.FC<BuildItineraryScreenProps> = ({ onNavigate }) => {
    const [sections, setSections] = useState<Section[]>([
        { id: 1, title: 'Section 1' },
        { id: 2, title: 'Section 2' },
    ]);

    const addSection = () => {
        setSections([...sections, { id: sections.length + 1, title: `Section ${sections.length + 1}` }]);
    };

    return (
        <View style={styles.container}>
            <Header title="Build Your Itinerary" showBack onBack={() => onNavigate('createTrip')} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.description}>
                    Create stops for your journey. Each section represents a destination or activity.
                </Text>


                {sections.map((section, index) => (
                    <View key={section.id} style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Stop {index + 1}</Text>
                            <Tag color="sand">Day {index + 1}</Tag>
                        </View>

                        <Input label="Location / Activity" placeholder="e.g., Eiffel Tower, Louvre Museum" />

                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <Text style={styles.label}>📅 Start Date</Text>
                                <Input placeholder="YYYY-MM-DD" />
                            </View>
                            <View style={styles.halfInput}>
                                <Text style={styles.label}>📅 End Date</Text>
                                <Input placeholder="YYYY-MM-DD" />
                            </View>
                        </View>

                        <Text style={styles.label}>💵 Budget (USD)</Text>
                        <Input placeholder="500" keyboardType="numeric" />

                        <Input label="Notes" placeholder="Additional details..." />
                    </View>
                ))}


                <TouchableOpacity style={styles.addButton} onPress={addSection}>
                    <Text style={styles.addIcon}>➕</Text>
                    <Text style={styles.addText}>Add Another Section</Text>
                </TouchableOpacity>


                <View style={styles.actions}>
                    <Button variant="primary" fullWidth size="lg" onPress={() => onNavigate('myTrips')}>
                        Save Itinerary
                    </Button>
                    <View style={styles.spacer} />
                    <Button variant="outline" fullWidth size="lg" onPress={() => onNavigate('itinerary')}>
                        Preview Itinerary
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
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl * 2,
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    sectionCard: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        ...shadows.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.oceanLight,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: -spacing.xs,
    },
    halfInput: {
        flex: 1,
        paddingHorizontal: spacing.xs,
    },
    label: {
        ...typography.body,
        color: colors.text,
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.oceanLight,
        marginBottom: spacing.lg,
    },
    addIcon: {
        fontSize: 20,
        marginRight: spacing.sm,
        color: colors.oceanBlue,
    },
    addText: {
        ...typography.body,
        color: colors.oceanBlue,
    },
    actions: {
        marginTop: spacing.md,
    },
    spacer: {
        height: spacing.sm,
    },
});
