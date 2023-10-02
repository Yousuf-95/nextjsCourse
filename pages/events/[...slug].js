import EventList from "@/components/events/eventList";
import ResultsTitle from "@/components/resultsTitle/resultsTitle";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/errorAlert";
import connectDb from "@/lib/mongodbConnect";
import EventsModel from "@/models/eventsModel";

function CatchAllRoutes(props) {
  const { filteredEvents } = props;

  if (props?.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default CatchAllRoutes;

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      hasError: true,
    };
  }

  await connectDb();

  const events = await EventsModel.find({}, { _id: 0 }).lean();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  return {
    props: {
      filteredEvents,
      year: filteredYear,
      month: filteredMonth,
    },
  };
}
