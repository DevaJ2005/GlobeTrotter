import { client } from './client';

export const communityService = {
    getFeed: async () => {
        const response = await client.get('/community/feed');
        return response.data;
    },

    likePost: async (postId: number) => {
        const response = await client.post(`/community/posts/${postId}/like`);
        return response.data;
    },

    commentPost: async (postId: number, text: string) => {
        const response = await client.post(`/community/posts/${postId}/comments`, { text });
        return response.data;
    }
};
