import Image from "next/image";
import UsersIcon from "../icons/users-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import Button from "../ui/button";
import classes from "./event-list.module.css";

export default function EventList(props) {
    
    const {
        id,
        title,
        image,
        date,
        registrations,
        registrationsNumber,
        description,
        category
    } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <ul className={classes.list}>
            <li className={classes.item}>
                <Image src={'/' + image} alt={title} width={250} height={160}/>
                <div className={classes.content}>
                    <div className={classes.summary}>
                        <h2>{title}</h2>
                        {description &&  
                        <div className={classes.description}>
                            <p>{description}</p>
                        </div>}
                        {date && 
                        <div className={classes.date}>
                            <DateIcon />
                            <time>{humanReadableDate}</time>
                        </div>
                        }
                        {registrations &&
                        <div className={classes.registrations}>
                            <UsersIcon />
                            <address>{`${registrationsNumber} / ${registrations}`}</address>
                        </div>
                        }
                    </div>
                    <div className={classes.actions}>
                        {category ?
                        <Button link={`/events/${category}/${id}`}>
                            <span>Explore Event</span>
                            <span className={classes.icon}>
                                <ArrowRightIcon />
                            </span>
                        </Button> :
                        <Button link={`/events/${id}`}>
                            <span>Explore Category</span>
                            <span className={classes.icon}>
                                <ArrowRightIcon />
                            </span>
                        </Button>
                        }   
                    </div>
                </div>
            </li>  
        </ul> 
    )
};
