const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING, // "09:00"
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING, // "Dining", "Sightseeing"
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING, // "1h"
        allowNull: true
    },
    tripId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Activity;
