"use client"

import { useState, useEffect } from "react";
import ColouredContentBox from "../common/ColouredContentBox"
import { BaseEvent, EventType, PastEvent, UpcomingEvent } from "@/model/event";
import CustomButton from "../common/CustomButton";
import S from "@/app/utils/constantString";
import { Text } from "../common/textComponents";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";

const Events = () => {
    const [eventType, setEventType] = useState<EventType>(0)
    const [events, setEvents] = useState<BaseEvent[]>([])
   
    useEffect(() => {
        fetch(`/api/events?type=${eventType}`)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setEvents(data)
    })
        .catch(console.error)
    }, [eventType])

    return (
        <ColouredContentBox className="w-full text-center">
            <div className="flex gap-4 my-4">
                <CustomButton
                    isSelected={eventType == EventType.UPCOMING}
                    onClick={() => setEventType(EventType.UPCOMING)}
                >
                    {S.upcomingEvents}
                </CustomButton>
                <CustomButton
                    isSelected={eventType == EventType.PAST}
                    onClick={() => setEventType(EventType.PAST)}
                >
                     {S.pastEvents}
                </CustomButton>
            </div>
            <EventsGrid events={events} activeTab={eventType} />
        </ColouredContentBox>
    )
}

const EventsGrid: React.FC<{
    events: BaseEvent[], 
    activeTab: EventType
}> = ({ events, activeTab }) => {
    if (events.length === 0) {
        return (
            <div className="text-center py-4">
                <Text>
                    {activeTab === EventType.UPCOMING 
                        ? "There are no upcoming events." 
                        : "There are no past events."}
                </Text>
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {events.map((event, index) => {
                // Type checking using the type guards
                if (activeTab === EventType.UPCOMING) {
                    return <UpcomingEventCard key={index} event={event as UpcomingEvent} />
                } else if (activeTab === EventType.PAST) {
                    return <PastEventCard key={index} event={event as PastEvent} />
                }
                return null
            })}
        </div>
    );
}

export default Events

