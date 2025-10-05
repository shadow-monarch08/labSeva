const express = require('express');
const router = express.Router();
const Notes = require('../models/Contact') // Importing the user schema

//Route-2: To save the notes of the logged-in user
router.post('/contactInfo',
    async (req, res) => {
        try {

            let note = await Notes.create({
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message,
            })
            res.send({note,success:true});
        } catch (error) {
            res.status(404).send({ error: error, success : false })
        }
    })


module.exports = router