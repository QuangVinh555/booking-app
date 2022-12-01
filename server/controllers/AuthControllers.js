const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AuthControllersProvider = {

    // [POST] /api/auth/register
    register: async (req, res, next) => {
        try {
            const salt = bcrypt.genSaltSync(10); 
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                ...req.body,
                password: hashPassword
            });
            await newUser.save();
            return res.status(200).json("User has been created");
        } catch (error) {
            next(error);
        }
    },

    // [POST] /api/auth/login
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user){
                return res.status(404).json("User not found");
            }
            const confirmPassword = await bcrypt.compare(req.body.password, user.password);
            if(!confirmPassword){
                return res.status(404).json("Wrong password or username");
            }
            const {password, isAdmin, ...other} = user._doc;

            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);
                            // ten cookie   , gia tri  
            // return res.cookie("access_token", token, { 
            //     httpOnly: true,
            // }).status(200).json({details:{...other}, isAdmin});
            return res.status(200).json({details:{...other}, isAdmin, token});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthControllersProvider;