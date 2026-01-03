const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'New Trip'
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    budget: {
        type: DataTypes.STRING, // or FLOAT, spec shows "$2,500" string but update shows 3000 number. I'll use String for flexibility or Float/Integer. Spec update body: 3000. Get All: "$2,500". I'll use String to store currency format or INTEGER. I'll use INTEGER/FLOAT for calc and format on FE. Let's use DECIMAL(10, 2) or INTEGER.
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('planning', 'upcoming', 'ongoing', 'completed'),
        defaultValue: 'planning'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    overview: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Trip;
