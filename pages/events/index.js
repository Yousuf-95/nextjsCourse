import EventList from "@/components/events/eventList";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/eventsSearch";
import { useRouter } from "next/router";

function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

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
