// Mock Data
const destinations = [
    { id: 1, name: 'Paris, France', type: 'destination', image: 'https://via.placeholder.com/300', rating: 4.8 },
    { id: 2, name: 'Tokyo, Japan', type: 'destination', image: 'https://via.placeholder.com/300', rating: 4.9 },
    { id: 3, name: 'New York, USA', type: 'destination', image: 'https://via.placeholder.com/300', rating: 4.7 },
    { id: 4, name: 'Santorini, Greece', type: 'destination', image: 'https://via.placeholder.com/300', rating: 4.9 },
    { id: 5, name: 'Bali, Indonesia', type: 'destination', image: 'https://via.placeholder.com/300', rating: 4.8 },
];

exports.getRegionalSuggestions = (req, res) => {
    // Return random subset
    res.json(destinations.slice(0, 3));
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
