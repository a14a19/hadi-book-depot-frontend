import classes from './sidebar.module.scss';
import LibraryContext from '../context/context-api';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function SideBar() {

    const { sidebar, setSidebar } = useContext(LibraryContext)
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const handleClick = () => {
        navigate('/sign-in');
    }

    return (
        <>
            {
                sidebar
                &&
                <aside className={classes.aside}>
                    <i role='button' className="fa-solid fa-arrow-left my-back-arrow" onClick={() => setSidebar(current => !current)}></i>
                    <h3>Hadi</h3>
                    <span>Book Depot.</span>
                    <input placeholder='Search for books' />
                    <select>
                        <option value='Categories'>Categories</option>
                    </select>
                    {

                    <button onClick={() => navigate('/upload')}>Admin Upload</button>
                    }
                    <button onClick={() => handleClick()}>Logout</button>
                </aside>
            }
        </>
    )
}

export default SideBar;