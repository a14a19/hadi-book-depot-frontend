import axios from "axios";
import { useState } from "react";

const BASEURL = 'http://localhost:8080';
const apiBaseURL = 'http://localhost:8888';

function SignInSignUp() {

    const [user, setUser] = useState({ email: "", password: "" })

    const handleClick = () => {
        axios.post(`${BASEURL}/auth/user`, {
            "email": user.email,
            "password": user.password
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <button onClick={handleClick}>
                Check
            </button>
        </div>
    )
}

export default SignInSignUp;