"use client"

import { useState, useEffect } from "react";
import ColouredContentBox from "../common/ColouredContentBox"
import EventCard from "./EventCard";
import { Event, EventType } from "@/model/event";
import CustomButton from "../common/CustomButton";

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
                <CustomButton
                    isSelected={eventType == EventType.UPCOMING}
                    onClick={() => setEventType(0)}
                >
                    Upcoming Events
                </CustomButton>
                <CustomButton
                    isSelected={eventType == EventType.PAST}
                    onClick={() => setEventType(1)}
                >
                    Past Events
                </CustomButton>
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

