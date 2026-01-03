import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';
import { regionalDestinations, suggestedPlaces } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface SearchResultsScreenProps {
    onNavigate: (screen: string) => void;
}

const categories = ['All', 'Cities', 'Activities', 'Hotels', 'Experiences'];

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({ onNavigate }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const allResults = [...regionalDestinations, ...suggestedPlaces];

    return (
        <View style={styles.container}>
            <Header title="Explore" showBack onBack={() => onNavigate('dashboard')} />


            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search destinations, activities..."
                        placeholderTextColor={colors.textMuted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={styles.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>


            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryChip,
                            selectedCategory === category && styles.categoryChipActive,
                        ]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.categoryTextActive,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Destinations</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {regionalDestinations.map((dest) => (
                            <TouchableOpacity
                                key={dest.id}
                                style={styles.destCard}
                                onPress={() => onNavigate('createTrip')}
                            >
                                <Image source={{ uri: dest.image }} style={styles.destImage} />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                                    style={styles.destOverlay}
                                />
                                <Text style={styles.destName}>{dest.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>All Destinations</Text>
                    <View style={styles.grid}>
                        {allResults.map((item) => (
                            <TouchableOpacity
                                key={`${item.id}-${item.name}`}
                                style={styles.gridCard}
                                onPress={() => onNavigate('createTrip')}
                            >
                                <View style={styles.gridImageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.gridImage} />
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0,0,0,0.6)']}
                                        style={styles.destOverlay}
                                    />
                                </View>
                                <View style={styles.gridContent}>
                                    <Text style={styles.gridName} numberOfLines={1}>{item.name}</Text>
                                    <Tag color="ocean">Explore</Tag>
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
    searchContainer: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.white,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.travelBg,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: spacing.sm,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    clearIcon: {
        fontSize: 16,
        color: colors.textMuted,
        padding: spacing.xs,
    },
    categoryScroll: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        backgroundColor: colors.travelBg,
        marginRight: spacing.sm,
    },
    categoryChipActive: {
        backgroundColor: colors.oceanBlue,
    },
    categoryText: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    categoryTextActive: {
        color: colors.white,
        fontWeight: '600',
    },
    content: {
        padding: spacing.md,
        paddingBottom: spacing.xxl * 2,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.oceanDark,
        marginBottom: spacing.md,
    },
    destCard: {
        width: 160,
        height: 120,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    destImage: {
        width: '100%',
        height: '100%',
    },
    destOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    destName: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
        ...typography.body,
        color: colors.white,
        fontWeight: '500',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    gridCard: {
        width: '50%',
        padding: spacing.xs,
    },
    gridImageContainer: {
        height: 140,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    gridContent: {
        backgroundColor: colors.white,
        padding: spacing.sm,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
        ...shadows.sm,
    },
    gridName: {
        ...typography.bodySmall,
        color: colors.oceanDark,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
});
