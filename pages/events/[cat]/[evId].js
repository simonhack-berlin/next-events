import EventDetail from '@/components/event-detail/event-detail';

const EventDetailPage = ({data}) => {

    return (
        <EventDetail 
            title={data.title}
            image={data.image}
            imageAlt={data.title}
            description={data.description}
            date={data.date}
            registrations={data.max_registrations}
            registrationsNumber={data.emails_registered.length}
        />
    )
}

export default EventDetailPage;

export async function getStaticPaths() {
    const {all_events} = await import('data/data.json');

    const allPaths = all_events.map(path => {
        return {
            params: {
                cat: path.category,
                evId: path.id
            }
        }
    });

    return {
        paths: allPaths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.evId;
    const {all_events} = await import('data/data.json');
    const eventData = all_events.filter(event => event.id === id);
    return {
        props: { data: eventData[0] },
        revalidate: 30 // That means that every 30 sec. we regenerate this page for a new incoming request.
    }
}
