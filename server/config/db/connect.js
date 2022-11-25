const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_URL}`)
        console.log("Connected to MongoDB");   
    } catch (error) {
        console.log("Connected failed: " + error);    
        process.exit(1);
    }
}

module.exports = connect;
