import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { communityService } from '../api/community';

interface CommunityScreenProps {
    onNavigate: (screen: string) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onNavigate }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            const data = await communityService.getFeed();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch feed error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (postId: number) => {
        try {
            await communityService.likePost(postId);
            // Optimistic update
            setPosts(posts.map(p =>
                p.id === postId ? { ...p, likes: p.likes + 1 } : p
            ));
        } catch (error) {
            console.error("Like error", error);
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
            <Header title="Community Feed" />
            <ScrollView contentContainerStyle={styles.content}>
                {posts.map((post) => (
                    <Card key={post.id} style={styles.postCard}>

                        <View style={styles.postHeader}>
                            <View style={styles.userInfo}>
                                <View style={styles.avatar}>
                                    {post.user?.avatar ? (
                                        <Image source={{ uri: post.user.avatar }} style={{ width: 44, height: 44, borderRadius: 22 }} />
                                    ) : (
                                        <Icon name="account-circle" size={44} color={colors.textSecondary} />
                                    )}
                                </View>
                                <View>
                                    <Text style={styles.userName}>{post.user?.name || 'Unknown'}</Text>
                                    <View style={styles.locationRow}>
                                        <Icon name="map-marker-outline" size={12} color={colors.textSecondary} style={styles.locationIcon} />
                                        <Text style={styles.locationText}>{post.location}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.timeAgo}>Just now</Text>
                        </View>


                        <Image source={{ uri: post.image }} style={styles.postImage} />


                        <View style={styles.actions}>
                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
                                    <Icon name="heart-outline" size={20} color={colors.oceanDark} style={styles.actionIcon} />
                                    <Text style={styles.actionCount}>{post.likes}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Icon name="comment-outline" size={20} color={colors.oceanDark} style={styles.actionIcon} />
                                    <Text style={styles.actionCount}>{post.comments || 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Icon name="share-variant" size={20} color={colors.oceanDark} style={styles.actionIcon} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Icon name="bookmark-outline" size={20} color={colors.oceanDark} />
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
