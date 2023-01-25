import EventList from '@/components/events/event-list';

export default function Home(props) {
  const { data } = props;
  return (
    <>
      {data.map((event) => {
          return (
              <EventList
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  description={event.description}
                  image={event.image}
              />
          )
      })}
    </>
  )
}

export async function getServerSideProps() {
  const data = await import('data/data.json');
  return {
    props: {
      data: data.events_categories
    }
  }
}
