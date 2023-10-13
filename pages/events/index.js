import EventList from "@/components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import connectDb from "@/lib/mongodbConnect";
import EventsModel from "@/models/eventsModel";
import Head from "next/head";

function EventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="View open events" key="description" />
      </Head>
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
