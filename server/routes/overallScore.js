const express = require('express');
const router = express.Router();
const Score = require('../models/OverallScore') // Importing the 
const fetchuser = require("../middleware/fetchuser");

router.post('/overallScore', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const { testType, scoreValue } = req.body;

        let score = await Score.findOne({ userId });

        if (!score) {
            // Create a new user document if not found
            score = new Score({ userId, scores: [] });
        }

        // Find the score type inside the scores array
        let scoreEntry = score.scores.find(s => s.type === testType);

        if (!scoreEntry) {
            // If the score type does not exist, create it
            scoreEntry = { type: testType, instances: [{ value: scoreValue, timestamp: new Date() }] };
            score.scores.push(scoreEntry);
        } else {
            // Add new score instance to existing type
            scoreEntry.instances.push({ value: scoreValue, timestamp: new Date() });
        }

        // Explicitly mark `score.scores` as modified
        score.markModified('scores');

        await score.save();
        res.json({ status: 'success' })

    } catch (error) {
        res.status(400).json({ error: error })
    }
})

router.get('/fetchAllScores', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const score = await Score.findOne({ userId : userId });
        if(score) {
            res.json({ status: 'success', data: JSON.stringify(score.scores) })
        }else {
            res.json({ status: 'error', message: 'No scores found' })
        }
        console.log(score);
        
    } catch (error) {
        res.status(400).send({ error: error })
    }
})
module.exports = router