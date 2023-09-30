import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";
import EventSummary from "../../components/eventDetail/eventSummary";
import EventLogistics from "../../components/eventDetail/eventLogistics";
import EventContent from "../../components/eventDetail/eventContent";
import ErrorAlert from "@/components/ui/errorAlert";

function SpecificEventPage() {
  const router = useRouter();

  let { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event Found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
