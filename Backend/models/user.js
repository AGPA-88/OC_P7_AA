// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstname: { type: String },
//   lastname: { type: String },
//   avatarUrl: { type: String },
//   job: { type: String },
//   description : { type: String }
// });

// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('User', userSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////
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