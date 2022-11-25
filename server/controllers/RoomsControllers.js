const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

const RoomControllersProvider = {

    // [POST] /api/rooms/:hotelId
    create: async (req, res) => {
        try {
            const hotelId = req.params.hotelId;
            const newRoom = new Room(req.body);

            const savedRoom = await newRoom.save();
            await Hotel.findByIdAndUpdate(hotelId, 
                {$push: {rooms: savedRoom._id}});
            
            return res.status(200).json("Room has been created");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [PUT] /api/rooms/:id
    update: async (req, res) => {
        try {
            const updateRoom = await Room.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            return res.status(200).json(updateRoom);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [DELETE] /api/rooms/:id
    delete: async (req, res) => {
        try {
            await Room.findByIdAndDelete(req.params.id)
            return res.status(200).json("Room has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/rooms/:id
    getRoom: async (req, res) => {
        try {
            const room = await Room.findById(req.params.id)
            return res.status(200).json(room);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/rooms
    getAllRooms: async (req, res) => {
        try {
            const room = await Room.find();
            return res.status(200).json(room);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = RoomControllersProvider;