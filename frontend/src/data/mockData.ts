// GlobeTrotter Types and Mock Data

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    tripsCompleted: number;
    countriesVisited: number;
    upcomingTrips: number;
}

export interface Trip {
    id: number;
    title: string;
    destination: string;
    dates: string;
    budget: string;
    status: 'Completed' | 'Ongoing' | 'Upcoming' | 'Planning';
    overview: string;
    image: string;
}

export interface Destination {
    id: number;
    name: string;
    image: string;
}

export interface Activity {
    time: string;
    name: string;
    location: string;
    type: 'Travel' | 'Accommodation' | 'Activity' | 'Dining';
    cost: string;
    duration: string;
}

export interface ItineraryDay {
    day: number;
    date: string;
    activities: Activity[];
    totalCost: string;
}

// Mock User
export const mockUser: User = {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, USA',
    tripsCompleted: 12,
    countriesVisited: 8,
    upcomingTrips: 3,
};

// Mock Destinations
export const regionalDestinations: Destination[] = [
    { id: 1, name: 'Paris', image: 'https://images.unsplash.com/photo-1719667702020-83dcb76425f2?w=400' },
    { id: 2, name: 'Tokyo', image: 'https://images.unsplash.com/photo-1684613998803-83fe7787db15?w=400' },
    { id: 3, name: 'Dubai', image: 'https://images.unsplash.com/photo-1734929430032-cd5a371fa079?w=400' },
    { id: 4, name: 'Maldives', image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=400' },
    { id: 5, name: 'Safari', image: 'https://images.unsplash.com/photo-1653293144611-1ff36f8c7c99?w=400' },
];

export const suggestedPlaces: Destination[] = [
    { id: 1, name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=400' },
    { id: 2, name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1684613998803-83fe7787db15?w=400' },
    { id: 3, name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1631684181713-e697596d2165?w=400' },
    { id: 4, name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1661953029179-e1b0dc900490?w=400' },
    { id: 5, name: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1719667702020-83dcb76425f2?w=400' },
    { id: 6, name: 'Dubai', image: 'https://images.unsplash.com/photo-1734929430032-cd5a371fa079?w=400' },
];

// Mock Trips
export const ongoingTrips: Trip[] = [
    {
        id: 1,
        title: 'European Adventure',
        destination: 'Paris, France',
        dates: 'Jan 10-20, 2026',
        budget: '$2,500',
        status: 'Ongoing',
        overview: 'Exploring the romantic streets of Paris, visiting iconic landmarks like the Eiffel Tower and Louvre Museum.',
        image: 'https://images.unsplash.com/photo-1719667702020-83dcb76425f2?w=400',
    },
];

export const upcomingTrips: Trip[] = [
    {
        id: 2,
        title: 'Asian Discovery',
        destination: 'Tokyo & Kyoto, Japan',
        dates: 'Mar 15-28, 2026',
        budget: '$3,200',
        status: 'Upcoming',
        overview: 'Immersing in Japanese culture, from bustling Tokyo streets to serene Kyoto temples.',
        image: 'https://images.unsplash.com/photo-1684613998803-83fe7787db15?w=400',
    },
    {
        id: 3,
        title: 'Desert Safari',
        destination: 'Dubai, UAE',
        dates: 'Apr 5-12, 2026',
        budget: '$2,800',
        status: 'Upcoming',
        overview: 'Experience luxury and adventure with desert safaris and modern architecture.',
        image: 'https://images.unsplash.com/photo-1669024513552-56127b2d0d85?w=400',
    },
];

export const completedTrips: Trip[] = [
    {
        id: 4,
        title: 'Mountain Expedition',
        destination: 'Swiss Alps, Switzerland',
        dates: 'Dec 10-20, 2025',
        budget: '$3,500',
        status: 'Completed',
        overview: 'Conquered mountain peaks, enjoyed skiing, and experienced breathtaking alpine views.',
        image: 'https://images.unsplash.com/photo-1631684181713-e697596d2165?w=400',
    },
    {
        id: 5,
        title: 'Tropical Paradise',
        destination: 'Maldives',
        dates: 'Nov 5-12, 2025',
        budget: '$4,000',
        status: 'Completed',
        overview: 'Relaxed on pristine beaches, snorkeled in crystal clear waters.',
        image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=400',
    },
];

export const previousTrips: Trip[] = [
    {
        id: 1,
        title: 'Iceland Adventure',
        destination: 'Iceland',
        dates: 'Dec 10-20, 2025',
        budget: '$3,000',
        status: 'Completed',
        overview: 'Amazing northern lights and glaciers.',
        image: 'https://images.unsplash.com/photo-1631684181713-e697596d2165?w=400',
    },
    {
        id: 2,
        title: 'Desert Expedition',
        destination: 'Morocco',
        dates: 'Nov 5-12, 2025',
        budget: '$2,500',
        status: 'Completed',
        overview: 'Exploring the Sahara desert.',
        image: 'https://images.unsplash.com/photo-1669024513552-56127b2d0d85?w=400',
    },
    {
        id: 3,
        title: 'Coastal Retreat',
        destination: 'Maldives',
        dates: 'Oct 15-22, 2025',
        budget: '$4,000',
        status: 'Completed',
        overview: 'Beach relaxation.',
        image: 'https://images.unsplash.com/photo-1661953029179-e1b0dc900490?w=400',
    },
];

// Mock Itinerary
export const itineraryDays: ItineraryDay[] = [
    {
        day: 1,
        date: 'Jan 15, 2026',
        activities: [
            { time: '09:00 AM', name: 'Arrive at Airport', location: 'CDG Airport', type: 'Travel', cost: '$0', duration: '1 hour' },
            { time: '11:00 AM', name: 'Check-in at Hotel', location: 'Le Marais District', type: 'Accommodation', cost: '$180', duration: '30 min' },
            { time: '02:00 PM', name: 'Eiffel Tower Visit', location: 'Champ de Mars', type: 'Activity', cost: '$89', duration: '3 hours' },
            { time: '07:00 PM', name: 'Dinner at French Bistro', location: 'Latin Quarter', type: 'Dining', cost: '$65', duration: '2 hours' },
        ],
        totalCost: '$334',
    },
    {
        day: 2,
        date: 'Jan 16, 2026',
        activities: [
            { time: '09:00 AM', name: 'Louvre Museum Tour', location: 'Louvre', type: 'Activity', cost: '$120', duration: '4 hours' },
            { time: '02:00 PM', name: 'Lunch at Café', location: 'Near Louvre', type: 'Dining', cost: '$35', duration: '1 hour' },
            { time: '04:00 PM', name: 'Seine River Cruise', location: 'River Seine', type: 'Activity', cost: '$45', duration: '2 hours' },
            { time: '08:00 PM', name: 'Montmartre Evening Walk', location: 'Montmartre', type: 'Activity', cost: '$0', duration: '2 hours' },
        ],
        totalCost: '$200',
    },
];

export const preplannedTrips: Trip[] = [
    { id: 1, title: 'Summer in Europe', destination: 'Multiple Cities', dates: '', budget: '', status: 'Planning', overview: '', image: 'https://images.unsplash.com/photo-1719667702020-83dcb76425f2?w=400' },
    { id: 2, title: 'African Safari', destination: 'Kenya & Tanzania', dates: '', budget: '', status: 'Planning', overview: '', image: 'https://images.unsplash.com/photo-1653293144611-1ff36f8c7c99?w=400' },
    { id: 3, title: 'Beach Hopping', destination: 'Southeast Asia', dates: '', budget: '', status: 'Planning', overview: '', image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?w=400' },
];
