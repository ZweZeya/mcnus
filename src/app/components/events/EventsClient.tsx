"use client"

import { BaseEvent, EventType } from "@/model/event";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";
import S from "@/app/resources/strings/constantStrings";
import { Text, TextMd } from "../common/textComponents";
import CustomButton from "../common/CustomButton";
import ColouredContentBox from "../common/ColouredContentBox"
import { useRouter, usePathname } from "next/navigation";
import { EventsData } from "@/services/event.service";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const EventsClient: 
    React.FC<{
        data: EventsData, 
        eventType: EventType
}> = ({ data, eventType }) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleEventTypeChange = (newEventType: EventType) => {
        router.push(`${pathname}?type=${newEventType}`)
    }

    const handlePageChange = (direction: number) => {
        const newFirstPage = data.firstPage + direction * data.pageSize;
        if (newFirstPage < 0 || newFirstPage >= data.totalCount) return;
        router.push(`${pathname}?type=${eventType}&page=${data.index + direction}`)
    }

    return (
        <ColouredContentBox className="w-full text-center">
            <div className="flex justify-between items-center my-4">
                <div className="flex gap-4">
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

                <div className="flex gap-2">
                    <CustomButton onClick={() => handlePageChange(-1)}>
                        <FaChevronLeft size={20} />
                    </CustomButton>

                    <CustomButton onClick={() => handlePageChange(1)}>
                        <FaChevronRight size={20} />
                    </CustomButton>
                </div>
            </div>
            <EventsGrid events={data.events} activeTab={eventType} />
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