export interface BaseEvent {
    id: number,
    name: string, 
    description: string,
    event_time: Date, 
    image_path: string, 
    image_url: string, 
    registration_link: string,
    recap_link: string,
    created_at: Date
}

export enum EventType {
    UPCOMING = "upcoming",
    PAST = "past",
}

export function isEventType(value: string | null): value is EventType {
  return value === EventType.UPCOMING || value === EventType.PAST;
}