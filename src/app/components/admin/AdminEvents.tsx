"use client";

import React, { useState, useEffect } from "react";
import { BaseEvent } from "@/model/event"; 
import EventModal from "./EventModal";

export default function AdminEvents() {
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // NOTE: Replace '/api/events' with the actual URL your backend dev gives you later
        const response = await fetch("/api/events"); 
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data); // Put the database data into our table
      } catch (error) {
        console.error("Error fetching events, falling back to dummy data:", error);
        
        // Fallback dummy data so you can keep building the UI while the backend is WIP
        setEvents([
          { 
            id: 1, 
            name: "Thingyan Festival", 
            description: "Myanmar New Year Water Festival celebration.",
            event_time: new Date("2026-04-13T10:00:00"), 
            image_path: "",
            image_url: "",
            registration_link: "https://forms.gle/example1",
            recap_link: "",
            created_at: new Date(),
            type: "UPCOMING" as any 
          } as BaseEvent,
          { 
            id: 2, 
            name: "Freshmen Welcome", 
            description: "Welcoming the new batch of students.",
            event_time: new Date("2026-08-15T18:00:00"), 
            image_path: "",
            image_url: "",
            registration_link: "",
            recap_link: "https://youtube.com/example2",
            created_at: new Date(),
            type: "PAST" as any
          } as BaseEvent,
        ]);
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

  const handleSaveEvent = async (newEvent: Partial<BaseEvent>) => {
    // 1. Ideally, here you would do a POST request to '/api/events'
    // const response = await fetch('/api/events', { method: 'POST', body: JSON.stringify(newEvent) });
    
    // 2. For now, we will just simulate it by adding it to our local state!
    const fakeId = Math.floor(Math.random() * 10000); 
    setEvents((prev) => [...prev, { ...newEvent, id: fakeId } as BaseEvent]);
    
    // 3. Close the modal
    setIsModalOpen(false);
  };

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
              <th className="pb-3 font-semibold">Date & Time</th>
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
                    timeStyle: "short",
                  })}
                </td>
                
                {/* Show Event Type (e.g., UPCOMING / PAST) */}
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    String(event.type) === "UPCOMING" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {String(event.type)}
                  </span>
                </td>
                
                {/* Action Buttons */}
                <td className="flex gap-4 py-4">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                  <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
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