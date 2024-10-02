const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database configuration

const Ticket = sequelize.define('Ticket', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    comments: {
        type: DataTypes.TEXT, // Use TEXT to store JSON as a string
        allowNull: false,
        defaultValue: '[]', // Default to an empty array represented as a JSON string
        get() {
            const rawValue = this.getDataValue('comments');
            return JSON.parse(rawValue); // Automatically parse the JSON string when accessing the field
        },
        set(value) {
            this.setDataValue('comments', JSON.stringify(value)); // Automatically stringify the value when setting the field
        }
    }
}, {
    // Other model options
});

module.exports = Ticket;
