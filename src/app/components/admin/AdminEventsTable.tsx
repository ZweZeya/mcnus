"use client";

import React, { useState } from "react";
import { BaseEvent, NewEvent } from "@/model/event";
import EventModal from "./EventModal";
import { deleteEventAction, createEventAction, updateEventAction } from "@/actions/event.actions";

export default function AdminEventsTable({ initialEvents } : { initialEvents : BaseEvent[]}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BaseEvent | null>(null);

  const handleEditClick = (event: BaseEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = async (eventData: BaseEvent | NewEvent) => {
    if ('id' in eventData) {
      // This is an update to an existing event
      const formData = new FormData()

      formData.append("id", eventData.id.toString())
      formData.append("name", eventData.name)
      formData.append("description", eventData.description || "")
      formData.append("event_time", eventData.event_time.toISOString())
      formData.append("type", eventData.type)
      formData.append("registration_link", eventData.registration_link || "")
      formData.append("recap_link", eventData.recap_link || "")
      formData.append("created_at", eventData.created_at.toISOString())
      formData.append("image_file", eventData.image_file || "")
      formData.append("current_image_path", eventData.image_path || "")

        const result = await updateEventAction(formData);

      if (result.success) {
        alert("Event updated successfully!");
        window.location.reload();
      } else {
        alert("Failed to update event: " + result.error);
      }
    } else {
      // This is a new event creation
      const formData = new FormData()

      formData.append("name", eventData.name)
      formData.append("description", eventData.description || "")
      formData.append("event_time", eventData.event_time.toISOString())
      formData.append("type", eventData.type)
      formData.append("registration_link", eventData.registration_link || "")
      formData.append("recap_link", eventData.recap_link || "")
      formData.append("created_at", eventData.created_at.toISOString())
      formData.append("image_file", eventData.image_file || "")

      const result = await createEventAction(formData);

      if (result.success) {
        alert("Event created successfully!");
      } else {
        alert("Failed to create event: " + result.error);
      }
    }
    setIsModalOpen(false)
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
        onClose={handleCloseModal} 
        onSave={handleSaveEvent} 
        eventToEdit={editingEvent}
      />

      {/* Events Table */}
      <div className="bg-white shadow-sm rounded-lg p-4 text-black overflow-x-auto">
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
            {initialEvents.map((event) => (
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
                    onClick={() => handleEditClick(event)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this event?")) {
                        const result = await deleteEventAction(event);
                        if (result.success) {
                          alert("Event deleted successfully!");
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
            {initialEvents.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No events found. Click `&quot;` + Create New Event `&quot;` to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}