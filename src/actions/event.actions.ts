"use server"

import { eventServerService } from "@/services/event.server.service";
import { BaseEvent, EventType, isEventType, NewEvent } from "@/model/event";
import { revalidatePath } from "next/cache";

export async function createEventAction(formData: FormData) {
    try {
        // Extract fields from form data to create a BaseEvent object
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const event_time = new Date(formData.get('event_time') as string) 
        const type = (formData.get('type') as string).toLowerCase()

        if (!isEventType(type)) {
            throw new Error('Invalid event type')
        }

        const registration_link = formData.get('registration_link') as string
        const recap_link = formData.get('recap_link') as string
        const created_at = new Date(formData.get('created_at') as string)
        let image_path = ''
        let buffer : Buffer | undefined
        let mimeType : string | undefined

        const file = formData.get('image_file') as File || null
        if (file && file.size > 0) {
            const uniqueFilename = `events/${Date.now()}-${file.name}`
            image_path = uniqueFilename

            const arrayBuffer = await file.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);

            mimeType = file.type

        }
        console.log(image_path)

        const newEvent : NewEvent = {
            name: name,
            description: description.length == 0 ? null : description,
            event_time: event_time,
            image_path: image_path.length == 0 ? null : image_path,
            registration_link: registration_link || null,
            recap_link: recap_link || null,
            created_at: created_at,
            type: type as EventType,
            image_file: file,
            image_buffer: buffer,
            image_mime: mimeType
        }
        await eventServerService.addUpcomingEvent(newEvent);

        revalidatePath('/admin/events'); 
        revalidatePath('events')
        
        return { success: true };
    } catch (error) {
        console.error("createEventAction failed", error);
        return { success: false, error: "Failed to create event" };
    }
};

export async function deleteEventAction(event: BaseEvent) {
    try {
        await eventServerService.deleteEvent(event);

        revalidatePath('/admin/events'); 
        revalidatePath('events')
        return { success: true };
    } catch (error) {
        console.error("deleteEventAction failed", error);
        return { success: false, error: "Failed to delete event" };
    }
};

export async function updateEventAction(event: BaseEvent) {
    try {
        await eventServerService.updateEventInfo(event);

        revalidatePath('/admin/events'); 
        revalidatePath('events')
        return { success: true };
    } catch (error) {
        console.error("updateEventAction failed", error);
        return { success: false, error: "Failed to update event" };
    }
};