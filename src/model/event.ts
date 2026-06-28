export interface BaseEvent {
    id: number,
    name: string, 
    description: string | null,
    event_time: Date, 
    image_path: string | null, 
    image_url?: string, 
    registration_link: string | null,
    recap_link: string | null,
    created_at: Date,
    type: EventType,
    image_file?: File,
    image_buffer?: Buffer; 
    image_mime?: string;
}

export enum EventType {
    UPCOMING = "upcoming",
    PAST = "past",
}

export function isEventType(value: string | null): value is EventType {
  return value === EventType.UPCOMING || value === EventType.PAST;
}

export type NewEvent = Omit<BaseEvent, 'id'>