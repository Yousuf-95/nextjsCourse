import EventList from "@/components/events/eventList";
import connectDb from "../lib/mongodbConnect.js";
import EventsModel from "../models/eventsModel.js";

function HomePage(props) {
  const { featuredEvents } = props;
  // let events = JSON.parse(featuredEvents);

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
    // await mongoose.connect("mongodb://127.0.0.1:27017/nextjsCourse");
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

    console.log(events);

    return {
      props: {
        featuredEvents: events,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
