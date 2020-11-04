const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mdlware = require('../middleware/reqlogin')
const Post = mongoose.model("Post")

router.get('/allpost', mdlware, (req, res) => {
    Post.find()
        .populate("postedby", "_id , name")
        .populate("comments.postedby", "_id name")   //so we will not recive only id but the whole data of user name email
        .then(posts => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })
})
router.get('/getsubpost', mdlware, (req, res) => {
    Post.find({ postedby: { $in: req.user.following } })
        .populate("postedby", "_id , name")
        .populate("comments.postedby", "_id name")   //so we will not recive only id but the whole data of user name email
        .then(posts => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })
})
router.post('/createpost', mdlware, (req, res) => {
    const { title, body, pic } = req.body
    if (!title || !body || !pic) {
        return res.status(422).json({ error: "Please add all fields" })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo: pic,
        postedby: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(err => {
            console.log(err)
        })
})
router.get('/mypost', mdlware, (req, res) => {
    Post.find({ postedby: req.user._id })
        .populate("postedby", "_id name")
        .then(mypost => {
            res.json({ mypost })
        })
        .catch(err => {
            console.log(err)
        })
    // console.log(postedby)
})
router.put('/like', mdlware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})
router.put('/unlike', mdlware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})
router.put('/comment', mdlware, (req, res) => {
    const comment = {
        text: req.body.text,
        postedby: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("comments.postedby", "_id name")
        .populate("postedby", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})
router.delete('/deletepost/:postId', mdlware, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedby", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            } if (post.postedby._id.toString() == req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
})


module.exports = router






// router.delete('/deletecomment/:commentId', mdlware, (req, res) => {
//     Post.findOne({ _id: req.params.commentId })
//         .populate("postedby", "_id")
//         .exec((err, post) => {
//             if (err || !comment) {
//                 return res.status(422).json({ error: err })
//             } if (post.postedby._id.toString() == req.user._id.toString()) {
//                 post.remove()
//                     .then(result => {
//                         res.json(result)
//                     }).catch(err => {
//                         console.log(err)
//                     })
//             }
//         })
// })