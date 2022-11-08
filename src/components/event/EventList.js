import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import "./Event.css"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, event) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteEvent(event.id).then(() => getEvents().then(data => setEvents(data)))
            : <></>
    }

    const handleUnJoin = (eventId) => {
        leaveEvent(eventId).then(() => getEvents().then(data => setEvents(data)))
    }

    const handleJoin = (eventId) => {
        joinEvent(eventId).then(() => getEvents().then(data => setEvents(data)))
    }


    return (<>
        <header className="title is-3 p-2 has-text-centered" id="event__list-title">Events</header>
        <button className="btn-2 btn-sep icon-create button is-primary ml-6 mb-3"
            onClick={() => {
                navigate({ pathname: "/events/new" })
            }}
        ><span className="has-text-weight-semibold is-size-5">Schedule New Event</span></button>
        <article className="events">
            {
                events.map(event => {
                    return <React.Fragment key={`game--${event.id}`}>
                        <div className="columns box columns" id="event__list">
                            <section className="event column">
                                <div><h2>Welcome: Event Details Below</h2></div>
                                <div className="game__title has-text-left">Organizer: {event.organizer.full_name}</div>
                                <div className="game__title has-text-left">Game: {event.game.title}</div>
                                <div className="game__players has-text-left">Description: {event.description}</div>
                                {
                                    event.date
                                        ? <><div className="game__skillLevel has-text-left">Date: {event.date}</div></>
                                        : <><div>Date: To Be Announced</div></>
                                }

                            </section>
                            <div>
                                <div className="">
                                    <button className="btn__events button is-link is-small" onClick={() => navigate(`/events/${event.id}`)}>Update</button>
                                </div>
                                <div className="mt-1">
                                    <button className="btn__events button is-small is-danger" onClick={(evt) => { confirmDelete(evt, event) }}>Delete</button>
                                </div>
                                <div className="mt-6">
                                    {
                                        event.joined
                                            ? <button className="button is-warning is-normal is-rounded p-3" onClick={() => { handleUnJoin(event.id) }}>Leave</button>
                                            : <button className="button is-primary is-normal is-rounded" onClick={() => { handleJoin(event.id) }}>Join</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                })
            }
        </article>
    </>
    )
}