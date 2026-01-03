import { client } from './client';

export const tripService = {
    getAllTrips: async (status?: string) => {
        const params = status ? { status } : {};
        const response = await client.get('/trips', { params });
        return response.data;
    },
    getTripDetails: async (id: number) => {
        const response = await client.get(`/trips/${id}`);
        return response.data;
    },
    createTrip: async (tripData: any) => {
        const response = await client.post('/trips', tripData);
        return response.data;
    },
    getItinerary: async (tripId: number) => {
        const response = await client.get(`/trips/${tripId}/itinerary`);
        return response.data;
    },
    // Sections
    addSection: async (tripId: number, sectionData: any) => {
        const response = await client.post(`/trips/${tripId}/sections`, sectionData);
        return response.data;
    },
    // Activities
    addActivity: async (tripId: number, activityData: any) => {
        const response = await client.post(`/trips/${tripId}/activities`, activityData);
        return response.data;
    }
};
