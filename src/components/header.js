import classes from './header.module.scss';
import LibraryContext from '../context/context-api';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Header() {

    const { userLogin, signIn, setSignIn, signUp, setSignUp, setSidebar } = useContext(LibraryContext)

    return (
        <header className={classes.header}>
            <div className={classes.title}>
                <h1>Hadi</h1>
                <div className={classes.subTitle}>Book Depot.</div>
            </div>
            <div className={classes.hide}>
                <input placeholder='Search for books' />
                <select>
                    <option value='Categories'>Categories</option>
                </select>
            </div>
            <div>
                {localStorage.getItem('logIn') ?
                    <h4 className='d-inline'>Hello {JSON.parse(localStorage.getItem('logIn')).name} </h4>
                    :
                    <span className={classes.hide}>
                        <Link
                            to='/sign-in'
                            onClick={() => {
                                setSignIn({ ...signIn, state: true })
                                setSignUp({ ...signUp, state: false })
                            }}
                        >
                            Sign-In
                        </Link>
                        /
                        <Link
                            to='/sign-up'
                            onClick={() => {
                                setSignIn({ ...signIn, state: false })
                                setSignUp({ ...signUp, state: true })
                            }}
                        >
                            Sign-Up
                        </Link>
                    </span>
                }
                <i role='button' className="fa-solid fa-bars fs-4" onClick={() => setSidebar(current => !current)}></i>
            </div>
        </header>
    )
}

export default Header;