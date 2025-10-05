const mongoose = require("mongoose");

const scoreInstanceSchema = new mongoose.Schema({
    value: { type: Number, required: true }, // The actual score
    timestamp: { type: Date, default: Date.now } // Time when the score was received
});

const scoreTypeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Metadata defining the score type
    instances: [scoreInstanceSchema] // Array of score instances with timestamps
});

const scoreSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique identifier for the user
    scores: [scoreTypeSchema] // Array of score types, each with multiple instances
});


const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
