import { frangipani } from "@/app/resources/colors"
import { BaseEvent } from "@/model/event"
import { eventService } from "@/services/event.service"
import { useEffect, useState} from "react"
import { isNotEmptyString, isValidDate } from "@/utils/validators";
import Loading from "../common/Loading";
import Image from "next/image";


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
            <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
                <div className="relative w-full max-w-lg mx-4 p-6 rounded-2xl shadow-2xl z-10" style={{ backgroundColor: frangipani}}>
                    <div>
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
                        <div>{event.name}</div>
                    </div>
                    <button className="p-10 bg-black" onClick={onClose}></button>
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