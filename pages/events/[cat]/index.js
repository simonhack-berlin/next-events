import EventList from '@/components/events/event-list';
import NumberEvents from '@/components/events/number-events';
import { Fragment } from 'react';

const EventsCategoryPage = (props) => {
    const { data, length, category } = props;
    return (
      <Fragment>
        <NumberEvents length={length} category={category}/>
        {data.map((event) => {
            data.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
            return (
                <EventList
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  image={event.image}
                  category={event.category}
                  registrations={event.max_registrations}
                  registrationsNumber={event.emails_registered.length}
                />
            )
        })}
      </Fragment>
    )
}

export async function getStaticProps(context) {
    const id = context.params.cat;
    const {all_events} = await import('data/data.json');

    const data = all_events.filter(ev => ev.category === id);
    const length = data.length;

    return {
        props: {
            data: data,
            length: length,
            category: id
        },
        revalidate: 30 // That means that every 30 sec. we regenerate this page for a new incoming request.
    }
}

export async function getStaticPaths() {
    const data = await import('data/data.json');
    const paths = data.events_categories.map(event => ({
        params: {
            cat: event.id
        }
    }));

    return {
        paths: paths,
        fallback: false
    }
}

export default EventsCategoryPage;
