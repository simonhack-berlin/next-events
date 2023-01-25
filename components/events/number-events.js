import BackButton from "../ui/back-button";
import Button from "../ui/button";
import classes from "./number-events.module.css";

export default function NumberEvents(props) {
    const { length, category } = props;

    return (
        <section className={classes.info}>
            {!length && <h2>There are currently no scheduled events</h2>}
            {length === 1 && <h2>{length} {category} event</h2>}
            {length > 1 && <h2>{length} {category} events</h2>} 
            <BackButton />
            <Button link='/events'>All events</Button>
        </section>
    )   
} 
