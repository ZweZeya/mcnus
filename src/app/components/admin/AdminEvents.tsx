"use client";

import React, { useState, useEffect } from "react";
import { BaseEvent } from "@/model/event";
import EventModal from "./EventModal";
import { deleteEventAction, createEventAction, updateEventAction } from "@/actions/event.actions";
import { eventService } from "@/services/event.service";
import { useRouter } from "next/navigation";

export default function AdminEvents() {
  const router = useRouter()
  
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BaseEvent | null>(null); // For tracking which event is being edited

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const types = ["upcoming", "past"]

        const promises = types.map(type => eventService.getEvents(type))
        const results = await Promise.all(promises)

        const eventData = results.flat()
        setEvents(eventData)
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false); // Turn off the loading spinner
      }
    };

    fetchEvents();
  }, []);

  // Show a loading message while we wait for the data
  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading events...</div>;
  }

  const handleSaveEvent = async (eventData: Partial<BaseEvent>) => {
    if (eventData.id) {
      // This is an update to an existing event
      const result = await updateEventAction(eventData as BaseEvent);

      if (result.success) {
        alert("Event updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update event: " + result.error);
      }
    } else {
      // This is a new event creation
      const result = await createEventAction(eventData);

      if (result.success) {
        alert("Event created successfully!");
        window.location.reload();
      } else {
        alert("Failed to create event: " + result.error);
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Manage Events</h1>

      {/* Create Event Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700 transition"
      >
        + Create New Event
      </button>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
      />

      {/* Events Table */}
      <div className="bg-white shadow rounded-lg p-4 text-black overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-3 font-semibold">Event Name</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 font-medium">{event.name}</td>

                {/* Format the date to be human-readable */}
                <td className="py-4 text-gray-600">
                  {new Date(event.event_time).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
                </td>

                {/* Show Event Type (e.g., UPCOMING / PAST) */}
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${String(event.type).toUpperCase() === "UPCOMING" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {String(event.type).toUpperCase()}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="flex gap-4 py-4">
                  <button
                    onClick={async () => {
                      setEditingEvent(event);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 font-medium">
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this event?")) {
                        const result = await deleteEventAction(event);
                        if (result.success) {
                          alert("Event deleted successfully!");
                          setEvents((prev) => prev.filter((e) => e.id !== event.id));
                        } else {
                          alert("Failed to delete event from the database: " + result.error);
                        }
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Show a message if the array is completely empty */}
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No events found. Click "+ Create New Event" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}