const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types //to maake an relation between both models


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/mauuu/image/upload/v1602729713/4_pju0yd.jpg"
    },
    followers: [{
        type: ObjectId, ref: "User"
    }],
    following: [{
        type: ObjectId, ref: "User"
    }]
})

mongoose.model("User", userSchema)
