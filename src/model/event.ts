export interface BaseEvent {
    name: string, 
    date: Date, 
    image: string, 
}

export interface UpcomingEvent extends BaseEvent {
    link: string
}

export interface PastEvent extends BaseEvent {
    link: string
}

export enum EventType {
    UPCOMING = 0,
    PAST = 1,
}