import React from 'react';
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
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { suggestedPlaces } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface CreateTripScreenProps {
    onNavigate: (screen: string) => void;
}

export const CreateTripScreen: React.FC<CreateTripScreenProps> = ({ onNavigate }) => {
    return (
        <View style={styles.container}>
            <Header title="Create New Trip" showBack onBack={() => onNavigate('dashboard')} />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.card}>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputIcon}>📅</Text>
                        <View style={styles.inputFlex}>
                            <Input label="Start Date" placeholder="YYYY-MM-DD" />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.inputIcon}>📍</Text>
                        <View style={styles.inputFlex}>
                            <Input label="Select a Place" placeholder="Search for destinations..." />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.inputIcon}>📅</Text>
                        <View style={styles.inputFlex}>
                            <Input label="End Date" placeholder="YYYY-MM-DD" />
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Suggestions for Places to Visit</Text>
                    <View style={styles.grid}>
                        {suggestedPlaces.map((place) => (
                            <TouchableOpacity key={place.id} style={styles.placeCard}>
                                <View style={styles.placeImageContainer}>
                                    <Image source={{ uri: place.image }} style={styles.placeImage} />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                                        style={styles.placeOverlay}
                                    />
                                    <Text style={styles.placeName}>{place.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>


                <View style={styles.actions}>
                    <Button variant="sunset" fullWidth size="lg" onPress={() => onNavigate('buildItinerary')}>
                        Continue to Build Itinerary
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
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.lg,
        ...shadows.lg,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    inputIcon: {
        fontSize: 16,
        marginTop: spacing.xl,
        marginRight: spacing.sm,
    },
    inputFlex: {
        flex: 1,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
        marginBottom: spacing.md,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    placeCard: {
        width: '50%',
        padding: spacing.xs,
    },
    placeImageContainer: {
        height: 160,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        ...shadows.md,
    },
    placeImage: {
        width: '100%',
        height: '100%',
    },
    placeOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    placeName: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
        right: spacing.sm,
        ...typography.bodySmall,
        color: colors.white,
    },
    actions: {
        paddingBottom: spacing.xxl,
    },
});
