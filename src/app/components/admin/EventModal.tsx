"use client";

import React, { useState } from "react";
import { BaseEvent } from "@/model/event";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  // We pass a function to handle what happens when the admin clicks "Save"
  onSave: (newEvent: Partial<BaseEvent>) => void; 
}

export default function EventModal({ isOpen, onClose, onSave }: EventModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    event_time: "",
    type: "UPCOMING",
    registration_link: "",
    recap_link: "",
  });

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert the string date back to a Date object before saving
    const newEvent = {
      ...formData,
      event_time: new Date(formData.event_time),
      created_at: new Date(),
    };
    
    onSave(newEvent as Partial<BaseEvent>);
    
    // Reset form after saving
    setFormData({
      name: "", description: "", event_time: "", type: "UPCOMING", registration_link: "", recap_link: ""
    });
  };

  return (
    // The dark transparent overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      
      {/* The white modal box */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Event Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g., Thingyan Festival" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows={3}></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date *</label>
              <input required type="date" name="event_time" value={formData.event_time} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded p-2 bg-white">
                <option value="UPCOMING">Upcoming</option>
                <option value="PAST">Past</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Registration Link</label>
              <input type="url" name="registration_link" value={formData.registration_link} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recap Link</label>
              <input type="url" name="recap_link" value={formData.recap_link} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Save Event
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}