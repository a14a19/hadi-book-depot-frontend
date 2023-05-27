import classes from './signupConfirmation.module.scss';

import { Link } from "react-router-dom";

function SignUpCnf() {
    return (
        <section className={classes.signupcnf}>
            <div className={classes.container}>
                <h3>Hadi Book Depot.</h3>
                <p>
                Back to
                <Link to="/sign-in">Login</Link>
                </p>
            </div>
        </section>
    )
}

export default SignUpCnf;