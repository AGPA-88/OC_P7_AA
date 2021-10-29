const db = require("../config/db.config");
const {Sequelize, DataTypes} = require("sequelize");

const ThingModel = db.define("post", {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.NUMBER
    },
    readerUsers: {
        type: DataTypes.STRING
    }
});

module.exports = ThingModel;