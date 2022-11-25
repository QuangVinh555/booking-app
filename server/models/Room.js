const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const RoomSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    maxPeople: {
        type: Number,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    roomNumbers: [{number: Number, unavailableDates: {type: [Date]}}]
     
}, {timestamps: true});

module.exports = mongoose.model("Room", RoomSchema);