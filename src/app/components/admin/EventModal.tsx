"use client";

import React, { useState } from "react";
import { BaseEvent } from "@/model/event";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
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

  // State for the single image upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for capturing the file and creating a preview URL
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
      event_time: new Date(formData.event_time),
      created_at: new Date(),
      image_url: previewUrl || "", 
      image_file: selectedFile || undefined
    };
    
    onSave(newEvent as Partial<BaseEvent>);
    
    // Reset form and image states after saving
    setFormData({
      name: "", description: "", event_time: "", type: "UPCOMING", registration_link: "", recap_link: ""
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
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

          {/* IMAGE UPLOAD FIELD - Inserted right above the action buttons */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full border rounded p-2 bg-white" 
            />
            
            {/* Renders a preview of the image once selected */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Event Preview" 
                  className="w-full h-48 object-cover rounded border"
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