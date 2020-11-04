const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types //to maake an relation between both models


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        text: String,
        postedby: { type: ObjectId, ref: "User" },

    }],
    postedby: {
        type: ObjectId,   //so the type of this model is to reffer to another model
        ref: "User"
    }
})

mongoose.model("Post", postSchema)