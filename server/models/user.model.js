const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email :{
        type: String,
        require: true,
        lowercase: true,
        unique:[true, 'This Username is taken'],
        validate:{
            validator: function(v){
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(v)
            },
            message: "Please enter a valid email"
        }

    },
    fullname: {
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: [true, 'pPassword is required'],
        minlength:[6, 'Password must be at least 6 characters long']
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)