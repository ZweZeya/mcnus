import { frangipani, darkerGrey } from "@/app/resources/colors"
import { BaseEvent } from "@/model/event"
import { eventService } from "@/services/event.service"
import { useEffect, useState} from "react"
import { isNotEmptyString, isValidDate } from "@/utils/validators";
import Loading from "../common/Loading";
import Image from "next/image";
import { TextSm } from "../common/textComponents";
import S from "@/app/resources/strings/constantStrings";
import { formatDate } from "@/utils/dateUtils";

const SingleEventModal: React.FC<{ eventId: number, onClose: () => void}> = ({ eventId, onClose }) => {
    const [event, setEvent] = useState<BaseEvent | null>(null)

    useEffect(() => {
        const fetchEventById = async () => {
            const eventBaseEvent = await eventService.getEventById(eventId)
            setEvent(eventBaseEvent)
            console.log(event)
        }
        fetchEventById()
    }, [])


    if (!event) {
        return (
            <div />
        )
    }

    const isDateTbc = !isValidDate(event.event_time)
    const isImageAvailable = isNotEmptyString(event.image_url)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/65 flex items-center justify-center ">
                <div className="relative w-full max-w-lg rounded-2xl shadow-2xl z-10 h-[70vh] overflow-hidden" style={{ backgroundColor: frangipani}}>
                    <div className="overflow-y-auto h-full w-full mx-4 p-4">
                        <div className="relative w-full pb-[100%]">
                            {isImageAvailable ? 
                                <Image 
                                    src={event.image_url} 
                                    alt={event.name} 
                                    fill 
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover" /> :
                                <ComingSoonImage/>
                            }
                        </div>
                        <div className="flex flex-col flex-1 p-1">
                            <div className="flex flex-col items-start">
                                <h1 className="text-4xl font-semibold line-clamp-2 text-left">{event.name}</h1>
                                <TextSm style={{ color: darkerGrey }} className="mt-1 mb-4">{isDateTbc ? S.dateToBeConfirmed : formatDate(event.event_time)}</TextSm>
                            </div>
                            <div>
                                {event.description}
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </div>
                            {/* <Button 
                                className="mt-auto w-full pt-2 text-white flex items-center justify-center gap-2" 
                                disabled={!isEnabled} 
                                onClick={() => handleClick(event.registration_link)} 
                                style={{backgroundColor: navy}}
                            >
                                {isEnabled ? <>{S.join} <GoLinkExternal size={16} /></> : <>{S.comingSoon}</>}
                            </Button> */}
                        </div>
                        <button className="p-10 bg-black" onClick={onClose}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComingSoonImage = () => {
    return (
       <Image 
        src="/coming-soon.png" 
        alt="coming-soon" 
        fill 
        className="object-cover" />
    )
}

export default SingleEventModal