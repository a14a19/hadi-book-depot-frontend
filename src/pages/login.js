import classes from './loginPage.module.scss';

import LibraryContext from '../context/context-api';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';

function LoginPage() {

    const { BASEAPI, socket, userLogin, setUserLogin, signIn, setSignIn, signUp, setSignUp } = useContext(LibraryContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('logIn')) {
            authGetUser();
            setUserLogin({ ...userLogin, state: true });
        } else {
            setUserLogin({ ...userLogin, state: false });
        }
    }, [])

    const authGetUser = () => {
        if (localStorage.getItem('a')) {
            axios.get(`${BASEAPI}/user/get/${JSON.parse(localStorage.getItem('logIn')).id}`,
                {
                    withCredentials: true
                }).then(res => {
                    if (res.status === 200 && res.data) {
                        console.log(res.data.data._id);
                        localStorage.setItem('logIn', JSON.stringify({ name: res.data.data.name, id: res.data.data._id, state: true }));
                        setUserLogin({ ...userLogin, state: true, id: res.data.data._id });
                        navigate('/home');
                        socket.emit('newUser', userLogin.name);
                    } else if (res.status === 401 || res.status === 403) {
                        setUserLogin({ ...userLogin, state: false });
                    }
                }).catch(err => {
                    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                        axios.get(`${BASEAPI}/auth/refresh`, { withCredentials: true }).then(res => {
                            if (res.status === 200 && localStorage.getItem('logIn')) {
                                authGetUser();
                            }
                        }).catch(err => {
                            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                                localStorage.removeItem('logIn');
                                setUserLogin({ ...userLogin, state: false });
                            }
                        })
                    }
                })
        }
    }

    const loginBtn = (e) => {
        e.preventDefault()
        axios.post(`${BASEAPI}/auth/user`, {
            "email": signIn.email,
            "password": signIn.password
        }, { withCredentials: true })
            .then(res => {
                setUserLogin({ ...userLogin, id: res.data.msg._id });
                setUserLogin({ ...userLogin, name: res.data.msg.name });
                // localStorage.setItem('a', res.data.msg._id)
                if (res && res.data && res.status === 200) {
                    localStorage.setItem('logIn', JSON.stringify({ name: res.data.msg.name, id: res.data.msg._id, state: true }));
                    console.log(res.data.msg.name, res.data.msg._id);
                    // localStorage.setItem('logIn', true);
                    setTimeout(() => {
                        console.log('successful login');
                        navigate("/home");
                        authGetUser();
                    }, 100)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <section className={classes.loginSignUp}>
            <div className={classes.container}>
                <div className={classes.btnContainer}>
                    <button
                        onClick={() => navigate('/sign-up')}
                    >
                        Sign-Up
                    </button>
                </div>
                <form className={classes.login}>
                    <h2>Sign-In</h2>
                    <input type='email' placeholder='Email' onChange={(e) => setSignIn({ ...signIn, email: e.target.value })} />
                    <input type='password' placeholder='Password' onChange={(e) => setSignIn({ ...signIn, password: e.target.value })} />
                    <button onClick={(e) => loginBtn(e)}>
                        Sign-In
                    </button>
                    <Link to="/reset-password" className='mt-2'>Forgot Password?</Link>
                </form>
            </div>
        </section>
    )
}

export default LoginPage;