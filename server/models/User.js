const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
<<<<<<< HEAD
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: String,  // Stored as "dd-mm-yyyy"
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
=======
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    date : {
        type : Date,
        default : Date.now,
    }
  });

  const user = mongoose.model('user',UserSchema);
  module.exports = user;
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
