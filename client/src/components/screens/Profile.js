import React, { useEffect, useState, useContext } from 'react'
import { userContext } from '../../App'
const Profile = () => {
    const [pics, setPics] = useState([])
    const { state, dispatch } = useContext(userContext)
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")



    //-------------------------------------getting data------------------------------//
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setPics(result.mypost)
            })
    }, [])
    //---------------------------------updating pic---------------------------//
    useEffect(() => {
        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name", "mauuu")
            fetch("https://api.cloudinary.com/v1_1/mauuu/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
                .then(data => {

                    console.log(data)
                    // localStorage.setItem("user", JSON.stringify({ ...state, pic: data.url }))
                    // dispatch({ type: "UPDATEPIC", payload: data.url })
                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                            // window.location.reload()
                        })

                })
                .catch(err => {
                    console.log(err)
                })

        }

    }, [image])
    const updatepic = (file) => {
        setImage(file)

    }



    //-----------------------------frontend-----------------------------//
    return (
        <div>

            <div style={{
                maxWidth: "550px",
                margin: "0px auto",
                borderBottom: "1px solid",
                display: "flex",
                flexDirection: "row"
            }}>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    width: "50%",

                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "Loading.."}
                        />
                    </div>

                    <div className="file-field input-field">
                        <div className="btn #4527a0 deep-purple darken-3">
                            <span>Upload Pic</span>
                            <input
                                type="file"
                                onChange={(e) => updatepic(e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>


                <div>
                    <h4>{state ? state.name : "..loading"}</h4>
                    <h5>{state ? state.email : "..loading"}</h5>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                        <h6>{pics.length} Posts</h6>
                        <h6>{state ? state.following.length : "0"} Following</h6>
                        <h6>{state ? state.followers.length : "0"} Followers</h6>
                    </div>
                </div>

            </div>


            <div className="gallery">
                {
                    pics.map(item => {
                        return (
                            <img className="item" key={item._id} src={item.photo} alt={item.title} />

                        )
                    })
                }



            </div>

        </div>
    )
}

export default Profile