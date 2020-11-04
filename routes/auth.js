const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/key')
// const requireLogin = require('../middleware/reqlogin')



router.post('/signup', (req, res) => {
    const { name, email, password, pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please Fill All the details" })
    }
    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "user already exists" })
        }
        bcrypt.hash(password, 12).then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword,
                name,
                pic
            })

            user.save().then(user => {
                res.json({ message: "saved succesfully" })
            }).catch(err => {
                console.log(err)
            })
        })

    }).catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "please provide email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invald or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(domatch => {
                    if (domatch) {

                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, followers, following, pic } = savedUser
                        res.json({ token, user: { _id, name, email, followers, following, pic } })
                    } else {
                        return res.status(422).json({ error: "Invalid Password" })
                    }
                }).catch(err => {
                    console.log(err)
                })
        })
})
module.exports = router