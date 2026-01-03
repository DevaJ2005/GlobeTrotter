const { Trip, Section, Activity } = require('../models');

// --- Trips ---

exports.getTrips = async (req, res) => {
    try {
        const { status } = req.query;
        const whereClause = { userId: req.user.id };
        if (status) {
            whereClause.status = status;
        }

        const trips = await Trip.findAll({
            where: whereClause,
            order: [['startDate', 'ASC']]
        });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            where: { id: req.params.id, userId: req.user.id },
            include: [
                { model: Section, as: 'sections' },
                { model: Activity, as: 'activities' }
            ]
        });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createTrip = async (req, res) => {
    try {
        const { destination, startDate, endDate } = req.body;
        const trip = await Trip.create({
            destination, // title defaults to 'New Trip'
            startDate,
            endDate,
            userId: req.user.id,
            status: 'planning'
        });
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        // Update allowed fields
        const allowed = ['title', 'budget', 'status', 'image', 'overview', 'destination', 'startDate', 'endDate'];
        allowed.forEach(field => {
            if (req.body[field] !== undefined) trip[field] = req.body[field];
        });

        await trip.save();
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });
        await trip.destroy();
        res.json({ message: 'Trip deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- Sections ---

exports.getSections = async (req, res) => {
    try {
        // Ensure trip belongs to user
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const sections = await Section.findAll({ where: { tripId: trip.id } });
        res.json(sections);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addSection = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const section = await Section.create({
            ...req.body,
            tripId: trip.id
        });
        res.status(201).json(section);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateSection = async (req, res) => {
    try {
        // Need to verify via Trip link that user owns this section
        const section = await Section.findOne({
            where: { id: req.params.sectionId },
            include: { model: Trip, as: 'trip', where: { userId: req.user.id } }
        });

        if (!section) return res.status(404).json({ message: 'Section not found' });

        await section.update(req.body);
        res.json(section);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const section = await Section.findOne({
            where: { id: req.params.sectionId },
            include: { model: Trip, as: 'trip', where: { userId: req.user.id } }
        });

        if (!section) return res.status(404).json({ message: 'Section not found' });

        await section.destroy();
        res.json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- Activities ---

exports.getActivities = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const whereClause = { tripId: trip.id };
        if (req.query.day) whereClause.day = req.query.day;

        const activities = await Activity.findAll({ where: whereClause });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addActivity = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const activity = await Activity.create({
            ...req.body,
            tripId: trip.id
        });
        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --- Itinerary (Combined) ---

exports.getItinerary = async (req, res) => {
    try {
        const trip = await Trip.findOne({ where: { id: req.params.id, userId: req.user.id } });
        if (!trip) return res.status(404).json({ message: 'Trip not found' });

        const activities = await Activity.findAll({
            where: { tripId: trip.id },
            order: [['day', 'ASC'], ['time', 'ASC']]
        });

        // Group activities by day
        const dayMap = {};
        activities.forEach(activity => {
            const dayNum = activity.day;
            if (!dayMap[dayNum]) {
                dayMap[dayNum] = [];
            }
            dayMap[dayNum].push({
                id: activity.id,
                title: activity.name,
                location: activity.location,
                startTime: activity.time,
                endTime: null, // Can calculate based on duration if needed
                cost: activity.cost,
                type: activity.type,
                duration: activity.duration
            });
        });

        // Convert to array format
        const days = Object.keys(dayMap).map(dayNum => ({
            day: parseInt(dayNum),
            activities: dayMap[dayNum]
        }));

        res.json({
            tripId: trip.id,
            days
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
