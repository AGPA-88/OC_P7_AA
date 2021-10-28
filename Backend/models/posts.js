// const mongoose = require('mongoose');

// const postSchema = mongoose.Schema({
//   userId: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String},
//   readerUsers: { type: [String], required: true  }
// });

// var ThingModel = mongoose.model('post', postSchema );
// module.exports = ThingModel

////////////////////////////////////////////////////////////////////////////////////

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