import EventList from "@/components/events/eventList";
import connectDb from "../lib/mongodbConnect.js";
import EventsModel from "../models/eventsModel.js";
import Head from "next/head.js";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <>
      <div>
        <Head>
          <title>Events Home Page</title>
          <meta
            name="description"
            content="View open events"
            key="description"
          />
        </Head>
        <EventList items={featuredEvents} />
      </div>
    </>
  );
}

export default HomePage;

export async function getStaticProps() {
  try {
    await connectDb();

    const result = await EventsModel.find(
      { isFeatured: true }
      // { _id: 0 }
    ).lean();

    // Either Convert _id to string or remove '_id' field from query.
    // Nextjs will throw an error otherwise.
    const events = result.map((event) => {
      return JSON.parse(JSON.stringify(event));
    });

    return {
      props: {
        featuredEvents: events,
      },
      revalidate: 10800,
    };
  } catch (error) {
    console.log(error);
  }
}
