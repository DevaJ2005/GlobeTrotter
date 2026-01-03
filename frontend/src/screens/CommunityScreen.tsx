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
import { colors, spacing, typography, borderRadius, shadows } from '../theme';

interface CommunityScreenProps {
    onNavigate: (screen: string) => void;
}

const communityPosts = [
    {
        id: 1,
        user: { name: 'Sarah Miller', avatar: '👩' },
        location: 'Santorini, Greece',
        image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=400',
        caption: 'Sunset views that take your breath away! 🌅',
        likes: 234,
        comments: 42,
        timeAgo: '2h ago',
    },
    {
        id: 2,
        user: { name: 'John Davis', avatar: '👨' },
        location: 'Tokyo, Japan',
        image: 'https://images.unsplash.com/photo-1684613998803-83fe7787db15?w=400',
        caption: 'Found this amazing temple in Kyoto! The architecture is incredible 🏯',
        likes: 189,
        comments: 28,
        timeAgo: '5h ago',
    },
    {
        id: 3,
        user: { name: 'Emma Wilson', avatar: '👩‍🦰' },
        location: 'Swiss Alps',
        image: 'https://images.unsplash.com/photo-1631684181713-e697596d2165?w=400',
        caption: 'Mountain adventures at their finest! ⛰️',
        likes: 312,
        comments: 56,
        timeAgo: '1d ago',
    },
];

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onNavigate }) => {
    return (
        <View style={styles.container}>
            <Header title="Community Feed" />
            <ScrollView contentContainerStyle={styles.content}>
                {communityPosts.map((post) => (
                    <Card key={post.id} style={styles.postCard}>

                        <View style={styles.postHeader}>
                            <View style={styles.userInfo}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarEmoji}>{post.user.avatar}</Text>
                                </View>
                                <View>
                                    <Text style={styles.userName}>{post.user.name}</Text>
                                    <View style={styles.locationRow}>
                                        <Text style={styles.locationIcon}>📍</Text>
                                        <Text style={styles.locationText}>{post.location}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                        </View>


                        <Image source={{ uri: post.image }} style={styles.postImage} />


                        <View style={styles.actions}>
                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>❤️</Text>
                                    <Text style={styles.actionCount}>{post.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>💬</Text>
                                    <Text style={styles.actionCount}>{post.comments}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionIcon}>🔗</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.actionIcon}>🔖</Text>
                            </TouchableOpacity>
                        </View>


                        <Text style={styles.caption}>{post.caption}</Text>
                    </Card>
                ))}
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
    postCard: {
        marginBottom: spacing.md,
        padding: 0,
        overflow: 'hidden',
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.oceanLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.sm,
    },
    avatarEmoji: {
        fontSize: 24,
    },
    userName: {
        ...typography.body,
        color: colors.oceanDark,
        fontWeight: '600',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    locationText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    timeAgo: {
        ...typography.caption,
        color: colors.textMuted,
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    actionIcon: {
        fontSize: 20,
        marginRight: 4,
    },
    actionCount: {
        ...typography.bodySmall,
        color: colors.textSecondary,
    },
    caption: {
        ...typography.body,
        color: colors.text,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
});
