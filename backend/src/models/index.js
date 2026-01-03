const User = require('./user.model');
const Trip = require('./trip.model');
const Section = require('./section.model');
const Activity = require('./activity.model');

// Associations
User.hasMany(Trip, { foreignKey: 'userId', as: 'trips' });
Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Trip.hasMany(Section, { foreignKey: 'tripId', as: 'sections', onDelete: 'CASCADE' });
Section.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

Trip.hasMany(Activity, { foreignKey: 'tripId', as: 'activities', onDelete: 'CASCADE' });
Activity.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });

module.exports = {
    User,
    Trip,
    Section,
    Activity
};
