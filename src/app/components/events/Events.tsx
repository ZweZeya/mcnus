"use client"

import { useState, useEffect } from "react";
import ColouredContentBox from "../common/ColouredContentBox"
import EventCard from "./EventCard";
import { Event, EventType } from "@/app/api/events/route";

const Events = () => {
    const [eventType, setEventType] = useState<EventType>(0)
    const [events, setEvents] = useState<Event[]>([])
   
    useEffect(() => {
        fetch(`/api/events?type=${eventType}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setEvents(data)
    })
        .catch(console.error);
    }, [eventType]);

    return (
        <ColouredContentBox className="w-full text-center">
            <div className="flex gap-4 my-4">
                <button
                    onClick={() => setEventType(0)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                    eventType === 0
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    Upcoming Events
                </button>
                <button
                    onClick={() => setEventType(1)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                    eventType === 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    Past Events
                </button>
            </div>
            <EventsGrid events={events} />
        </ColouredContentBox>
    )
}

const EventsGrid: React.FC<{events: Event[]}> = ({events}) => {

    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
    )   
}

export default Events