import classes from './heroBanner.module.scss';
import mirzaghalib from '../images/mirzaghalib.jpg';

function HeroBanner() {
    return (
        <section className={classes.heroBanner}>
            <div>
                <img src={mirzaghalib} alt='' />
            </div>
            <div className={classes.heroContext}>
                Welcome to Hadi Book Depot.
            </div>
        </section>
    )
}

export default HeroBanner;