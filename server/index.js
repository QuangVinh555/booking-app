const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connect = require('./config/db/connect');
const route = require('./routes');
const app = express();

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// connect db
connect();

// route
route(app);


const PORT = 8000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})

