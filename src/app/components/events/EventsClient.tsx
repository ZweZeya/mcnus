"use client"

import { BaseEvent, EventType } from "@/model/event";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";
import S from "@/app/resources/strings/constantStrings";
import { Text, TextMd } from "../common/textComponents";
import CustomButton from "../common/CustomButton";
import ColouredContentBox from "../common/ColouredContentBox"
import { useRouter, usePathname } from "next/navigation";

const EventsClient: 
    React.FC<{
        events: BaseEvent[], 
        eventType: EventType
}> = ({ events, eventType }) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleEventTypeChange = (eventType: EventType) => {
        router.push(`${pathname}?type=${eventType}`)
    }

    return (
        <ColouredContentBox className="w-full text-center">
            <div className="flex gap-4 my-4">
                <CustomButton
                    isSelected={eventType == EventType.UPCOMING}
                    onClick={() => handleEventTypeChange(EventType.UPCOMING)}
                >
                    <TextMd>{S.upcomingEvents}</TextMd>
                </CustomButton>
                <CustomButton
                    isSelected={eventType == EventType.PAST}
                    onClick={() => handleEventTypeChange(EventType.PAST)}
                >
                    <TextMd>{S.pastEvents}</TextMd>
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
                        ? S.noUpcomingEvents 
                        : S.noPastEvents}
                </Text>
            </div>
        );
    }
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {events.map((event, index) => {
                if (activeTab === EventType.UPCOMING) {
                    return <UpcomingEventCard key={index} event={event} />
                } else if (activeTab === EventType.PAST) {
                    return <PastEventCard key={index} event={event} />
                }
                return null
            })}
        </div>
    );
}

export default EventsClient;