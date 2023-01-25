import Image from 'next/image';
import { Fragment } from 'react';
import LogisticsItem from './logistics-item';
import UsersIcon from '../icons/users-icon';
import DateIcon from '../icons/date-icon';
import classes from './event-detail.module.css';
import EventRegistration from '../input/event-registration';

const EventDetail = (props) => {
    const {
        title,
        image,
        imageAlt,
        description,
        date,
        registrations,
        registrationsNumber
    } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

  return (
    <Fragment>
        <section className={classes.summary}>
        <h1>{title}</h1>
        </section>
        <section className={classes.logistics}>
            <div className={classes.image}>
                <Image src={`/${image}`} alt={imageAlt} width={350} height={350} />
            </div>
            <ul className={classes.list}>
                <LogisticsItem icon={DateIcon}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={UsersIcon}>
                    <address>{`${registrationsNumber} / ${registrations}`}</address>
                </LogisticsItem>
            </ul>
        </section>
        <section className={classes.content}>
            <p>{description}</p>
        </section>
        <EventRegistration />
    </Fragment>
  );
}

export default EventDetail;
