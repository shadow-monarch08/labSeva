const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/User'); // Importing the user schema
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisIsASecrete@12";
const fetchuser = require("../middleware/fetchuser");

app.use(express.json());
//Route-1: To crreate new user and check if the entered user already exists or not
router.post('/createUser',
    async (req, res) => {
        let success = false;
        try {
            //to check if there is a pre existing user with the email 
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).send({"success":success, errors: [{msg:"User already exist"}] });
            }
            var salt = bcrypt.genSaltSync(10);
            var encryptedPass = bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptedPass,
            })
            let data = {
                user: {
                    id: user.id
                }
            };
            success=true;
            var authToken = jwt.sign(data, JWT_SECRET);
            res.json({"success":success, authToken });
            // return res.status(200).send({ Success: "User hass been created" });

        } catch (error) {
            res.status(500).send({"success":success, errors: [{msg:"Somthing went wrong"}] });
        }
    })

//Route-2:To login existing user and check wheather the entered credentials are correct or not
router.post('/loginUser',
    async (req, res) => {
        let success = false;
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });//Featches all the data of the user if the given email id matches
            if (!user) {
                return res.status(400).send({ "success":success,"error": "The Given credentials are invalid" })
            }
            //Checks if the entered password is correct or not
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).send({ "success" : success,"error": "Given credentials are invalid" })
            }
            let data = {
                user: {
                    id: user.id
                }
            };
            success = true;
            var authToken = jwt.sign(data, JWT_SECRET);
            res.send({"success":success, authToken });
        } catch (error) {
            return res.status(500).send({"success":success, error: "Somthing went wrong" });
        }
    })


router.get('/fetchuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).send({user})
    } catch (error) {
        console.log(error);
        res.status(500).send("Some internal error occured");
    }
})

module.exports = router