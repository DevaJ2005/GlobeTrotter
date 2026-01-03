import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { tripService } from '../api/trips';

interface BuildItineraryScreenProps {
    onNavigate: (screen: string, params?: any) => void;
    params?: { tripId: number; tripName?: string };
}

export const BuildItineraryScreen: React.FC<BuildItineraryScreenProps> = ({ onNavigate, params }) => {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Form state
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newType, setNewType] = useState('Activity'); // Activity, Dining, Accommodation
    const [newCost, setNewCost] = useState('');

    useEffect(() => {
        // Fetch existing itinerary
        if (params?.tripId) {
            fetchItinerary();
        } else {
            setLoading(false);
        }
    }, [params?.tripId]);

    const fetchItinerary = async () => {
        try {
            const data = await tripService.getItinerary(params!.tripId);
            // Transform API response to our local state which is flat sections for now
            // Or better, just work with days. But the UI is built for sequential sections.
            // For now, let's assume we are adding to Day 1 or just pushing to the list.
            setSections(Array.isArray(data.days) ? data.days.flatMap((d: any) => d.activities) : []);
        } catch (error) {
            console.error("Fetch itinerary error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSection = async () => {
        if (!newTitle || !newLocation) {
            Alert.alert("Missing Info", "Please enter title and location.");
            return;
        }

        try {
            // Add activity to Day 1 (hardcoded for simplicity in this MVP flow)
            await tripService.addActivity(params!.tripId, 1, {
                title: newTitle,
                location: newLocation,
                type: newType,
                cost: parseFloat(newCost) || 0,
                startTime: '09:00',
                endTime: '10:00',
                notes: ''
            });

            setNewTitle('');
            setNewLocation('');
            setNewCost('');
            setModalVisible(false);
            fetchItinerary(); // Refresh
        } catch (error) {
            console.error("Add activity error", error);
            Alert.alert("Error", "Failed to add activity.");
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.oceanBlue} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title={params?.tripName ? `Itinerary: ${params.tripName}` : "Build Itinerary"}
                showBack
                onBack={() => onNavigate(params?.tripId ? 'itinerary' : 'createTrip', { tripId: params?.tripId })}
            />

            <ScrollView contentContainerStyle={styles.content}>
                {sections.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Start adding activities to your trip!</Text>
                    </View>
                ) : (
                    sections.map((section, index) => (
                        <View key={index} style={styles.sectionCard}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{section.title || section.name}</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{section.type}</Text>
                                </View>
                            </View>
                            <Text style={styles.sectionText}>📍 {section.location}</Text>
                            <Text style={styles.sectionText}>💰 ${section.totalCost || section.cost || 0}</Text>
                        </View>
                    ))
                )}

                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>+ Add Activity</Text>
                </TouchableOpacity>

                {sections.length > 0 && (
                    <Button variant="sunset" onPress={() => onNavigate('itinerary', { tripId: params?.tripId })}>
                        View Full Itinerary
                    </Button>
                )}
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>New Activity</Text>

                        <View style={styles.inputSpacing}>
                            <Input label="Title" value={newTitle} onChangeText={setNewTitle} placeholder="e.g. Visit Louvre" />
                        </View>
                        <View style={styles.inputSpacing}>
                            <Input label="Location" value={newLocation} onChangeText={setNewLocation} placeholder="e.g. Paris" />
                        </View>
                        <View style={styles.inputSpacing}>
                            <Input label="Cost" value={newCost} onChangeText={setNewCost} placeholder="0.00" keyboardType="numeric" />
                        </View>

                        <View style={styles.modalActions}>
                            <Button variant="outline" onPress={() => setModalVisible(false)}>Cancel</Button>
                            <View style={{ width: 16 }} />
                            <Button variant="primary" onPress={handleAddSection}>Add</Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
        flex: 1,
    },
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl * 2,
    },
    emptyState: {
        alignItems: 'center',
        padding: spacing.xl,
    },
    emptyText: {
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
    sectionText: {
        ...typography.body,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    badge: {
        backgroundColor: colors.oceanLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.full,
    },
    badgeText: {
        ...typography.caption,
        color: colors.oceanDark,
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
    addButtonText: {
        ...typography.body,
        color: colors.oceanBlue,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        ...shadows.xl,
    },
    modalTitle: {
        ...typography.h2,
        color: colors.oceanDark,
        marginBottom: spacing.lg,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: spacing.lg,
    },
    inputSpacing: {
        marginBottom: spacing.md,
    },
});
