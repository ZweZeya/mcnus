"use client";

import React, { useState, useEffect } from "react";
import { EventType, NewEvent, BaseEvent } from "@/model/event";
import { TextSm } from "../common/textComponents";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEvent: NewEvent) => void;
  eventToEdit: BaseEvent | null
}

const defaultForm = {
  name: "",
  description: "",
  event_time: "",
  type: "UPCOMING",
  registration_link: "",
  recap_link: "",
};

export default function EventModal({ isOpen, onClose, onSave, eventToEdit }: EventModalProps) {

  // State for the single image upload
  const [formData, setFormData] = useState(defaultForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && eventToEdit) {
      const eventDate = new Date(eventToEdit.event_time);
      eventDate.setMinutes(eventDate.getMinutes() - eventDate.getTimezoneOffset()); 
      const formattedDate = eventDate.toISOString().slice(0, 10);

      setFormData({
        name: eventToEdit.name,
        description: eventToEdit.description || "",
        event_time: formattedDate,
        type: String(eventToEdit.type),
        registration_link: eventToEdit.registration_link || "",
        recap_link: eventToEdit.recap_link || "",
      });
      setPreviewUrl(eventToEdit.image_url || null);
    } else if (isOpen && !eventToEdit) {
      setFormData(defaultForm);
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [isOpen, eventToEdit]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      ...formData,
      ...(eventToEdit?.id ? { id: eventToEdit.id } : {}),
      event_time: new Date(formData.event_time),
      created_at: new Date(),
      image_file: selectedFile || undefined,
      image_path: eventToEdit?.image_path || null,
      type: formData.type as EventType
    };
    
    onSave(newEvent);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-2xl font-bold mb-4">
          {eventToEdit ? "Edit Event" : "Create New Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <TextSm>Event Name *</TextSm>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded p-2" placeholder="e.g., Thingyan Festival" />
          </div>

          <div>
            <TextSm>Description</TextSm>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded p-2" rows={3}></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <TextSm>Date *</TextSm>
              <input required type="date" name="event_time" value={formData.event_time} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <TextSm>Status</TextSm>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded p-2 bg-white">
                <option value="UPCOMING">Upcoming</option>
                <option value="PAST">Past</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <TextSm>Registration Link</TextSm>
              <input type="url" name="registration_link" value={formData.registration_link} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
            </div>
            <div>
              <TextSm>Recap Link</TextSm>
              <input type="url" name="recap_link" value={formData.recap_link} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
            </div>
          </div>

          {/* IMAGE UPLOAD FIELD - Inserted right above the action buttons */}
          <div>
            <TextSm>Event Image</TextSm>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full border rounded p-2 bg-white file:bg-blue-600 file:text-white file:rounded file:p-2" 
            />
            
            {/* Renders a preview of the image once selected */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Event Preview" 
                  className="w-full h-auto object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button 
              type="button" 
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
                onClose();
              }} 
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition"
            >
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