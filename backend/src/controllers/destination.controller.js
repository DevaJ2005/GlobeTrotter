// Regional Destinations Data
const destinations = [
    { id: 1, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', rating: 4.8 },
    { id: 2, name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', rating: 4.9 },
    { id: 3, name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', rating: 4.7 },
    { id: 4, name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400', rating: 4.9 },
    { id: 5, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', rating: 4.8 },
    { id: 6, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', rating: 4.7 },
];

exports.getRegionalSuggestions = (req, res) => {
    // Return destinations with id, name, image, country
    res.json(destinations.slice(0, 5));
};

exports.getSuggestedPlaces = (req, res) => {
    // Return random subset
    res.json(destinations.slice(2, 5));
};

exports.search = (req, res) => {
    const { q, type } = req.query;
    let results = destinations;

    if (q) {
        results = results.filter(d => d.name.toLowerCase().includes(q.toLowerCase()));
    }
    if (type) {
        results = results.filter(d => d.type === type);
    }

    res.json(results);
};
