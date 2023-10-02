import EventList from "@/components/events/eventList";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";
import connectDb from "@/lib/mongodbConnect";
import EventsModel from "@/models/eventsModel";

function EventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <div>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={events} />
      </div>
    </>
  );
}

export default EventsPage;

export async function getStaticProps() {
  try {
    await connectDb();

    const result = await EventsModel.find({}, { _id: 0 }).lean();
    console.log(result);

    return {
      props: {
        events: result,
      },
      revalidate: 10800,
    };
  } catch (error) {
    console.log(error);
  }
}
