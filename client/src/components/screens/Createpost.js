import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    //------------------so post detail take time to upload but another fetch req dosent w8 for it ---------------------------------------//


    useEffect(() => {

        //--------------------to make req on createpost------------------
        if (url) {

            fetch("/createpost", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({

                    title,
                    body,
                    pic: url

                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    }
                    else {
                        M.toast({ html: "Post Created", classes: "#c62828 green darken-3" })
                        history.push('/')
                    }
                }).catch(err => {
                    console.log(err)
                })

        }

    }, [url])







    //--------------------to post image on cloudinary and gettin url of image to store in db----------------------------------------//
    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "mauuu")
        fetch("https://api.cloudinary.com/v1_1/mauuu/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log(err)
            })

    }




    //--------------------return component---------------------------
    return (
        <div className="card input-filed" style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)} />

            <div className="file-field input-field">
                <div className="btn #4527a0 deep-purple darken-3">
                    <span>File</span>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
                onClick={() => postDetails()}
            >Post</button>
        </div>
    );
}

export default CreatePost