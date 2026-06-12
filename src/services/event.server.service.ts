import { BaseEvent, NewEvent } from "@/model/event";
import { addEvent, deleteEventById, updateEvent } from "@/repositories/event.server.repository";
import { uploadImage, deleteImage } from "@/storage/image-storage.server";

export type EventsData = {
    events: BaseEvent[],
    firstPage: number, 
    pageSize: number,
    totalCount: number,
    index: number
}

export const eventServerService = {
        async addUpcomingEvent(event: NewEvent) {
            try {
                if (!event.name) {
                    throw new Error("Event name is required");
                }

                console.log(event.image_path)
    
                if (event.image_path && event.image_buffer && event.image_mime) {
                    await uploadImage(event.image_path, event.image_buffer, event.image_mime);
                }
    
                await addEvent(event);
            } catch (error) {
                throw new Error("eventService.addUpcomingEvent failed", { cause : error });
            }
        },
    
        async deleteEvent(event: BaseEvent) {
            try {
                await deleteEventById(event.id);
                if (event.image_path) {
                    await deleteImage(event.image_path);
                }
            } catch (error) {
                throw new Error("eventService.deleteEvent failed", { cause : error })
            }
        },

        async updateEventInfo(event: BaseEvent) {
            try {
                if (event.image_buffer && event.image_path && event.image_mime) {
                    await uploadImage(event.image_path, event.image_buffer, event.image_mime);
                }
                await updateEvent(event);
            } catch (error) {
                throw new Error("eventService.updateEventInfo failed", { cause : error })
            }
        },
}