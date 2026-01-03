import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { suggestedPlaces } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { tripService } from '../api/trips';

interface CreateTripScreenProps {
    onNavigate: (screen: string, params?: any) => void;
}

export const CreateTripScreen: React.FC<CreateTripScreenProps> = ({ onNavigate }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateTrip = async () => {
        if (!destination || !startDate || !endDate) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const newTrip = await tripService.createTrip({
                title: `Trip to ${destination}`,
                destination,
                startDate,
                endDate,
                status: 'Planning'
            });
            onNavigate('buildItinerary', { tripId: newTrip.id, tripName: newTrip.title });
        } catch (error) {
            console.error("Create Trip Error", error);
            Alert.alert("Error", "Failed to create trip.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Create New Trip" showBack onBack={() => onNavigate('dashboard')} />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.card}>
                    <View style={styles.inputRow}>
                        <Icon name="calendar-range" size={20} color={colors.oceanBlue} style={styles.inputIcon} />
                        <View style={styles.inputFlex}>
                            <Input
                                label="Start Date"
                                placeholder="YYYY-MM-DD"
                                value={startDate}
                                onChangeText={setStartDate}
                            />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <Icon name="map-marker" size={20} color={colors.sunsetOrange} style={styles.inputIcon} />
                        <View style={styles.inputFlex}>
                            <Input
                                label="Select a Place"
                                placeholder="Search for destinations..."
                                value={destination}
                                onChangeText={setDestination}
                            />
                        </View>
                    </View>

                    <View style={styles.inputRow}>
                        <Icon name="calendar-check" size={20} color={colors.oceanBlue} style={styles.inputIcon} />
                        <View style={styles.inputFlex}>
                            <Input
                                label="End Date"
                                placeholder="YYYY-MM-DD"
                                value={endDate}
                                onChangeText={setEndDate}
                            />
                        </View>
                    </View>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Suggestions for Places to Visit</Text>
                    <View style={styles.grid}>
                        {suggestedPlaces.map((place) => (
                            <TouchableOpacity key={place.id} style={styles.placeCard} onPress={() => setDestination(place.name)}>
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
                    <Button
                        variant="sunset"
                        fullWidth
                        size="lg"
                        onPress={handleCreateTrip}
                        loading={loading}
                    >
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
