import EventList from "@/components/events/eventList";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

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
