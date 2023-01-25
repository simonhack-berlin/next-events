import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';

const EventsPage = (props) => {
  const { data } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/date/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}/>
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

export default EventsPage;

export async function getServerSideProps() {
    const data = await import('data/data.json');
    return {
      props: {
        data: data.all_events
      }
    }
  }
