import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getEventById, saveEditedEvent } from "../../managers/EventManager.js"



export const EventEdit = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const [currentEvent, setCurrentEvents] = useState({
        description: "",
        date: "",
        time: "",
    })

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */


    // Whenever eventId changes useEffect invokes this function
    const renderEvent = () => {
        if (eventId) {
            // A single event is GET and currentEvents is set to response
            getEventById(eventId).then((res) => {
                setCurrentEvents(res)
            })
        }
    }

    //  Whenever eventId changes renderEvent() function is invoked
    useEffect(() => {
        renderEvent()
    }, [eventId])


    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentEvents({
            ...currentEvent,
            [domEvent.target.name]: value
        })
    }

    return (
        <form className="gameForm">
            <h1 className="gameForm__title">Update Event</h1>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        placeholder={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Games: </label>
                    <select name="gameId" className="drop__down" value={currentEvent.gameId}
                        onChange={changeEventState}
                    >
                        <option value={0}>{currentEvent.title}</option>
                        {
                            currentEvent.map((g) => {
                                return <option value={`${g.id}`} key={`game--${g.id}`}>{g.title}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset> */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        placeholder={currentEvent.date}
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        placeholder={currentEvent.time}
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: currentEvent.id,
                        organizer: currentEvent.organizer,
                        description: currentEvent.description,
                        game: currentEvent.game,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    saveEditedEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="button is-primary ml-6">Update Event</button>
            <button type="button" className="btn__update button is-link ml-2" onClick={() => navigate(`/events`)}>Return to Events</button>
        </form>
    )
}