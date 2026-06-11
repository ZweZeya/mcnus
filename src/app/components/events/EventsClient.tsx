"use client"

import { BaseEvent, EventType } from "@/model/event";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";
import S from "@/app/resources/strings/constantStrings";
import { Text, TextMd } from "../common/textComponents";
import CustomButton from "../common/CustomButton";
import ColouredContentBox from "../common/ColouredContentBox"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SingleEventModal from "./SingleEventModal";
import { useEffect } from "react";
import { EventsData } from "@/services/event.service";
import { FaChevronLeft} from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"

const EventsClient: 
    React.FC<{
        data: EventsData, 
        eventType: EventType
}> = ({ data, eventType }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleEventTypeChange = (newEventType: EventType) => {
        router.push(`${pathname}?type=${newEventType}`)
    }

    const handlePageChange = (direction: number) => {
        const newFirstPage = data.firstPage + direction * data.pageSize;
        if (newFirstPage < 0 || newFirstPage >= data.totalCount) return;
        router.push(`${pathname}?type=${eventType}&page=${data.index + direction}`)
    }

    const activeEventId = searchParams.get("id")

    const handleOpenEventModal = (id : number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("id", id.toString())
        router.push(`${pathname}?${params.toString()}`, {scroll : false})
    }

    const handleCloseEventModal = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("id")
        router.push(`${pathname}?${params.toString()}`, {scroll : false})
    }

    useEffect(() => {
        if (activeEventId !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeEventId]);

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
            <EventsGrid events={data.events} activeTab={eventType} onClick={handleOpenEventModal}/>
            {
                activeEventId && <SingleEventModal eventId={Number(activeEventId)} onClose={handleCloseEventModal}/>
            }
        </ColouredContentBox>
    )
}

const EventsGrid: React.FC<{
    events: BaseEvent[], 
    activeTab: EventType
    onClick: (id : number) => void
}> = ({ events, activeTab, onClick }) => {
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
                    return <UpcomingEventCard key={index} event={event} onClick={onClick}/>
                } else if (activeTab === EventType.PAST) {
                    return <PastEventCard key={index} event={event} onClick={onClick}/>
                }
                return null
            })}
        </div>
    );
}

export default EventsClient;