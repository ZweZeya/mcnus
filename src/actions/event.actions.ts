"use server"

import { eventService } from "@/services/event.service";
import { BaseEvent } from "@/model/event";

export async function createEventAction(formData: FormData | Partial<BaseEvent>) {
    try {
        // Here, you extract the data from the frontend and pass it to your service.
        // Assuming the frontend passes a formatted object for now:
        await eventService.addUpcomingEvent(formData as BaseEvent);
        
        // Optional but recommended: Tell Next.js to refresh the cached page data
        // revalidatePath('/admin/events'); 
        
        return { success: true };
    } catch (error) {
        console.error("Action failed:", error);
        return { success: false, error: "Failed to create event" };
    }
};

export async function deleteEventAction(event: BaseEvent) {
    try {
        await eventService.deleteEvent(event);
        return { success: true };
    } catch (error) {
        console.error("Delete action failed:", error);
        return { success: false, error: "Failed to delete event" };
    }
};

export async function updateEventAction(event: BaseEvent) {
    try {
        await eventService.updateEventInfo(event);
        return { success: true };
    } catch (error) {
        console.error("Update action failed:", error);
        return { success: false, error: "Failed to update event" };
    }
};