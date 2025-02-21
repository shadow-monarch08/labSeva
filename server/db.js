const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/chronoDiesease";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connection Successful");
    } catch (error) {
        console.error("Database connection error");
        process.exit(0);
    }
}

module.exports = connectToMongo;