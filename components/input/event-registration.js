import { useState } from "react";
import NewRegistration from "./new-registration";
import BackButton from "../ui/back-button";
import Button from "../ui/button";
import classes from './event-registration.module.css';

export default function EventRegistration(props) {
    const [showForm, setShowForm] = useState(false);

    function toggleFormHandler() {
        setShowForm((prevStatus) => !prevStatus);
    }

    return (
        <section className={classes.registration}>
            <BackButton />
            <Button onClick={toggleFormHandler}>
                {showForm ? 'Hide Registration Form' : 'Register For This Event'}
            </Button>
            {showForm && <NewRegistration />}
        </section>
    );
}
