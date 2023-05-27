import classes from './loginPage.module.scss';

import LibraryContext from '../context/context-api';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';

function Register() {

    const { BASEAPI, socket, userLogin, setUserLogin, signIn, setSignIn, signUp, setSignUp } = useContext(LibraryContext);

    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const signUpSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASEAPI}/user/register`, {
            "name": signUp.name,
            "email": signUp.email,
            "number": signUp.number,
            "password": signUp.password,
        }, {
            withCredentials: true
        }).then(res => {
            if (res && res.data && res.status === 200) {
                console.log('Successful sign up');
                setSignUp({ ...signUp, email: "", number: "", password: "" })
                navigate("/sign-in");
            }
        }).catch(err => {
            if (err) {
                console.error(err);
            }
            setSignUp({ ...signUp, email: "", number: "", password: "" })
        })
    }

    const onEmailChange = (e) => {
        // console.log(e.target.value)
        axios.head(`${BASEAPI}/user/user-exist`, {
            "email": e.target.value
        }, {
            withCredentials: true
        }).then((res) => {
            // console.log(res, "success")
        }).catch((err) => {
            // console.log(err)
        })
        setSignUp({ ...signUp, email: e.target.value })
    }

    return (
        <section className={classes.loginSignUp}>
            <div className={classes.container}>
                <div className={classes.btnContainer}>
                    <button
                        onClick={() => navigate('/sign-in')}
                    >
                        Sign-In
                    </button>
                </div>
                <form className={classes.signUp} method='post'>
                    <h2>Sign-Up</h2>
                    <input type='text' placeholder='Name' onChange={(e) => setSignUp({ ...signUp, name: e.target.value })} />
                    <input type='email' placeholder='Email' onChange={(e) => onEmailChange(e)} />
                    <input type='number' placeholder='Number' onChange={(e) => setSignUp({ ...signUp, number: e.target.value })} />
                    <input type='password' placeholder='Password' onChange={(e) => setSignUp({ ...signUp, password: e.target.value })} />
                    <input type='password' placeholder='Re-enter Password' />
                    <button
                        type='submit'
                        onClick={(e) => signUpSubmit(e)}
                    >
                        Sign-Up
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Register;