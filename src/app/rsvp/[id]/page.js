
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // adjust path if needed
import { useParams } from "next/navigation";

export default function RSVPPage() {
  const params = useParams();
  const eventId = params?.id; // comes from URL like /events/[id]
  const [status, setStatus] = useState("yes"); // default
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Auth error:", userError.message);
      setMessage("Error getting user. Please log in.");
      return;
    }

    if (!user) {
      setMessage("You must be logged in to RSVP.");
      return;
    }

    // ✅ insert into rsvps table
    const { data, error } = await supabase.from("rsvps").insert([
      {
        user_id: user.id, // Supabase user id
        event_id: eventId, // from params
        status: status, // yes / no / maybe
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message, error.details);
      setMessage("Failed to save RSVP. Try again.");
    } else {
      console.log("RSVP saved:", data);
      setMessage("✅ Your RSVP has been recorded!");
    }
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
  <h1 className="text-xl font-bold mb-4">RSVP for Event {eventId}</h1>

  <form onSubmit={handleSubmit} className="space-y-4">
    <label className="block">
      <span className="text-gray-300">Your Response:</span>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="block w-full mt-1 border border-gray-600 bg-gray-900 text-white rounded p-2"
      >
        <option value="yes">✅ Yes</option>
        <option value="no">❌ No</option>
        <option value="maybe">🤔 Maybe</option>
      </select>
    </label>

    <button
      type="submit"
      className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
    >
      Submit RSVP
    </button>
  </form>

  {message && <p className="mt-4 text-green-400">{message}</p>}
</div>
  );
}
