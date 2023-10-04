import EventSummary from "../../components/eventDetail/eventSummary";
import EventLogistics from "../../components/eventDetail/eventLogistics";
import EventContent from "../../components/eventDetail/eventContent";
import ErrorAlert from "@/components/ui/errorAlert";
import EventsModel from "@/models/eventsModel";
import connectDb from "@/lib/mongodbConnect";
import Head from "next/head";

function SpecificEventPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event Found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={event.description}
          key="description"
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default SpecificEventPage;

export async function getStaticProps(context) {
  await connectDb();

  const eventId = context.params.eventId;
  const eventDetails = await EventsModel.findOne(
    { id: eventId },
    { _id: 0 }
  ).lean();

  if (!eventDetails) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: eventDetails,
    },
  };
}

export async function getStaticPaths() {
  await connectDb();

  const events = await EventsModel.find({ isFeatured: true }, { _id: 0 });
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
