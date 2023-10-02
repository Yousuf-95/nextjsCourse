import EventList from "@/components/events/eventList";
import connectDb from "../lib/mongodbConnect.js";
import EventsModel from "../models/eventsModel.js";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <>
      <div>
        <ul>
          <EventList items={featuredEvents} />
        </ul>
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

    // Eirther Convert _id to string or remove '_id' field from query.
    // Nextjs will throw an error otherwise.
    const events = result.map((event) => {
      return JSON.parse(JSON.stringify(event));
    });

    return {
      props: {
        featuredEvents: events,
      },
      revalidate: 10800
    };
  } catch (error) {
    console.log(error);
  }
}
