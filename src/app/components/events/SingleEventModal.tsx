import { BaseEvent } from "@/model/event"
import { eventService } from "@/services/event.service"
import { useEffect, useState} from "react"

const SingleEventModal: React.FC<{ eventId: number, onClose: () => void}> = ({ eventId, onClose }) => {
    const [event, setEvent] = useState<BaseEvent | null>(null)

    useEffect(() => {
        const fetchEventById = async () => {
            const eventBaseEvent = await eventService.getEventById(eventId)
            setEvent(eventBaseEvent)
        }
        fetchEventById()
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="relative bg-white w-full max-w-lg mx-4 p-6 rounded-2xl shadow-2xl z-10">
                    <button className="p-10 bg-black" onClick={onClose}></button>
                </div>
            </div>
        </div>
    )
}

export default SingleEventModal