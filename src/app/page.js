// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";

// export default function EventsPage() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     async function fetchEvents() {
//       const { data, error } = await supabase.from("Events").select("*");
//       if (error) console.error(error);
//       else setEvents(data);
//     }
//     fetchEvents();
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>📅 Events</h1>
//       <ul>
//         {events.map((event) => (
//           <li key={event.id} style={{ marginBottom: "1rem" }}>
//             <strong>{event.name}</strong> — {event.description}
//             <br />
//             <a href={`/rsvp/${event.id}`}>RSVP →</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Supabase error:", JSON.stringify(error, null, 2));
      } else {
        setEvents(data);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📅 Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: "1rem" }}>
            <strong>{event.name}</strong> — {event.description}
            <br />
            <a href={`/rsvp/${event.id}`}>RSVP →</a>
          </li>
        ))}
      </ul>
    </div>
  );
}


