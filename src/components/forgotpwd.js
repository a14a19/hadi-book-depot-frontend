import classes from "./forgotpwd.module.scss";

import LibraryContext from '../context/context-api';
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPwd() {

    const [resetEmail, setResetEmail] = useState('')

    const { BASEAPI } = useContext(LibraryContext);

    const handleReset = (e) => {
        e.preventDefault();
        console.log(resetEmail);
        // if (resetEmail !== '') {
            axios.post(`${BASEAPI}/auth/forgot-password`, {
                email: resetEmail
            }, {
                withCredentials: true
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        // }
    }

    return (
        <section className={classes.forgotPwd}>
            <div className={classes.container}>
                <p>
                    Please enter your email associated with your account to reset the password.
                </p>
                <form className={classes.forgot}>
                    <input type="email" placeholder="Email" onChange={(e) => setResetEmail(e.target.value.toLowerCase().trim())} />
                    <button onClick={(e) => handleReset(e)}>Reset Password</button>
                    <Link to="/sign-in" className='mt-2'><i role='button' className="fa-solid fa-arrow-left"></i></Link>
                </form>
            </div>
        </section>
    )
}

export default ForgotPwd;