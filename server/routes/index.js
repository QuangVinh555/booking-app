const authRoute = require('./auth');
const hotelsRoute = require('./hotels');
const roomsRoute = require('./rooms');
const usersRoute = require('./users');
const route = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/hotels", hotelsRoute);
    app.use("/api/rooms", roomsRoute);
    app.use("/api/users", usersRoute);
}

module.exports = route;