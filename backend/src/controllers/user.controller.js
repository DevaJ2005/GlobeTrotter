const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Mock stats for now (will implement with Trips later)
        const stats = {
            tripsCompleted: 0,
            countriesVisited: 0,
            upcomingTrips: 0
        };

        res.json({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            avatar: user.avatar,
            stats
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, location } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (location) user.location = location;

        await user.save();

        res.json({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            location: user.location,
            avatar: user.avatar
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Assuming server domain/port. For now relative path or constructs URL
        // In prod, use environment variable for base URL
        const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        user.avatar = avatarUrl;
        await user.save();

        res.json({ message: 'Avatar updated', avatar: avatarUrl });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
