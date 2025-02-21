const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisIsASecrete@12";

const fetchuser = (req,res,next) =>{
    const token = req.header('auth-token'); 
    if(!token){
        res.status(401).send({error:"please provide the correct authentication token"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        // res.json(data.user);
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error:"Please provide the correct authentication token"});
    }
}

module.exports = fetchuser;