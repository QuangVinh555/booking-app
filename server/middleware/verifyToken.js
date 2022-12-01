const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
    const token = req.headers.token;
    if(!token) {
        return res.status(401).json("You are not authenticated");
    }
    else{
        const accessToken = token.split(" ")[1]
        // cookie là token
        jwt.verify(accessToken, process.env.JWT, (err,user) => {
            if(err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        })
    }
};

module.exports = verifyToken;


const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not authorized");
        }
    });
};

module.exports = verifyUser;


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not authorized");
        }
    });
};

module.exports = verifyAdmin;