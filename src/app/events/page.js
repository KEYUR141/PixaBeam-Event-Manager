import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function EventsPage() {
  // Fetch all events from Supabase
  const { data: events, error } = await supabase
    .from("Events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return <p className="p-4 text-red-500">Error: {error.message}</p>;
  }

  if (!events || events.length === 0) {
    return <p className="p-4">No events found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📅 Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500">
              📍 {event.location} | 🗓 {new Date(event.date).toLocaleDateString()}
            </p>
            <Link
              href={`/rsvp/${event.id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              RSVP →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
