"use client"

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ColouredContentBox from "../common/ColouredContentBox"
import { BaseEvent, EventType, isEventType } from "@/model/event";
import CustomButton from "../common/CustomButton";
import S from "@/app/resources/strings/constantStrings";
import { Text, TextMd } from "../common/textComponents";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";
import Loading from "../common/Loading";

const Events = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const rawEventType = searchParams.get('type')
    const eventType = isEventType(rawEventType) ? rawEventType : EventType.UPCOMING
    const [events, setEvents] = useState<BaseEvent[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
        
            return params.toString()
        },
        [searchParams]
    )

    const handleEventTypeChange = (eventType: EventType) => {
        router.push(pathname + '?' + createQueryString('type', eventType))
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/events?type=${eventType}`)
        .then((res) => res.json())
        .then(data => {
            setTimeout(() => {
                setEvents(data)
                setIsLoading(false)
            }, 700)
            
    })
        .catch(console.error)
    }, [eventType])

    return (
        <Suspense>
            <ColouredContentBox className="w-full text-center">
                <div className="flex gap-4 my-4">
                    <CustomButton
                        isSelected={eventType == EventType.UPCOMING}
                        onClick={() => handleEventTypeChange(EventType.UPCOMING)}
                        disabled={isLoading}
                    >
                        <TextMd>{S.upcomingEvents}</TextMd>
                    </CustomButton>
                    <CustomButton
                        isSelected={eventType == EventType.PAST}
                        onClick={() => handleEventTypeChange(EventType.PAST)}
                        disabled={isLoading}
                    >
                        <TextMd>{S.pastEvents}</TextMd>
                    </CustomButton>
                </div>
                {isLoading || events.length == 0 ? <Loading /> : <EventsGrid events={events} activeTab={eventType} />}
            </ColouredContentBox>
        </Suspense>
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

export default Events

