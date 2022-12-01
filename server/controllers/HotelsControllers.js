const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const HotelsControllersProvider = {
    // [POST] /api/hotels
    create: async (req, res) => {
        const newHotel = new Hotel(req.body)
        try {
            const savedHotel = await newHotel.save();
            return res.status(200).json(savedHotel);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [PUT] /api/hotels/:id
    update: async (req, res) => {
        try {
            const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, 
                {$set: req.body},
                {new: true}
            );
            return res.status(200).json(updateHotel);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [DELETE] /api/hotels/:id
    delete: async (req, res) => {
        try {
            await Hotel.findByIdAndDelete(req.params.id);
            return res.status(200).json("Hotel has been deleted");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/hotels/:id
    get: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id);
            return res.status(200).json(hotel);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/hotels
    getAll: async (req, res, next) => {
        const {min, max, ...others} = req.query;
        try {
            const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1, $lt: max || 999}}).limit(req.query.limit);            
            return res.status(200).json(hotels);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/hotels/countByCity?cities=berlin,marid,london
    countByCity: async (req, res, next) => {
        try {
            const cities = req.query.cities.split(',');
            const list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({city: city});
            }))
            return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/hotels/countByType
    countByType: async (req, res) => {
        try {
            const hotelCount = await Hotel.countDocuments({type: 'hotel'}) 
            const apartmentCount = await Hotel.countDocuments({type: 'apartment'}) 
            const resortCount = await Hotel.countDocuments({type: 'resort'}) 
            const villaCount = await Hotel.countDocuments({type: 'villa'}) 
            const cabinCount = await Hotel.countDocuments({type: 'cabin'}) 
            return res.status(200).json([
                {type: 'hotel', count: hotelCount},
                {type: 'apartment', count: apartmentCount},
                {type: 'resort', count: resortCount},
                {type: 'villa', count: villaCount},
                {type: 'cabin', count: cabinCount}
            ])
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/hotels/room/:id
    getHotelRoom: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id);
            const list = await Promise.all(
                hotel.rooms.map(room => (
                    Room.findById(room)
                ))
            );
            return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = HotelsControllersProvider;