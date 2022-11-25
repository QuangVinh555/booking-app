const User = require('../models/User');

const UsersControllersProvider = {

    // [PUT] /api/users/:id
    update: async (req, res) => {
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            return res.status(200).json(updateUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [DELETE] /api/users/:id
    delete: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted.");
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/users/:id
    get: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // [GET] /api/users
    getAll: async (req, res) => {
        try {
            const user = await User.find();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = UsersControllersProvider;