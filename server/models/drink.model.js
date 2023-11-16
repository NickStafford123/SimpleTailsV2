const mongoose = require('mongoose')

const DrinkSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    recipe:{
        type: String,
        required: true
    },
    liquor:{
        type: String,
        required:true,
        enum: ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey']
    },
    picture: {
        type: String,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Drink', DrinkSchema)