const db = require("../config/db.config");
const {Sequelize, DataTypes} = require("sequelize");

const User = db.define("user", {
    firstname: {
        type: DataTypes.STRING
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    avatarUrl: {
        type: DataTypes.STRING
    },
    job: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = User;