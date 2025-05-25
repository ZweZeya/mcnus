export interface BaseEvent {
    name: string, 
    date: Date, 
    image: string, 
    link: string,
    photos: string
}

export enum EventType {
    UPCOMING = 0,
    PAST = 1,
}