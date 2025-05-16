export type Event = {
    name: string, 
    date: Date, 
    image: string, 
    link: string
}

export enum EventType {
  UPCOMING,
  PAST,
}