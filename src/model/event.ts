export interface BaseEvent {
    name: string, 
    date: Date, 
    image: string, 
    link: string,
    photos: string
}

export enum EventType {
    UPCOMING = "upcoming",
    PAST = "past",
}

export function isEventType(value: string | null): value is EventType {
  return value === EventType.UPCOMING || value === EventType.PAST;
}