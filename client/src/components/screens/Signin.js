import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { userContext } from '../../App'
import M from 'materialize-css'


const Signin = () => {
    const { state, dispatch } = useContext(userContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const PostData = () => {
        // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //     M.toast({ html: 'invalid email', classes: "#c62828 red darken-3" })
        //     return
        // }
        fetch("/signin", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    M.toast({ html: "signed in", classes: "#c62828 green darken-3" })
                    history.push('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field" >
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3" onClick={() => PostData()} >Login</button>
                <h5>
                    <Link to="/signup">Dont have account</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin