import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import "./Event.css"

export const EventList = (props) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (<>
        <header className="title is-3 p-2 has-text-centered" id="event__list-title">Events</header>
        <article className="events">
            {
                events.map(event => {
                    return <>
                        <div className="columns box" id="event__list">
                            <section key={`event--${event.id}`} className="event column">
                                <div className="game__title has-text-left">Organizer: {event.organizer.full_name}</div>
                                <div className="game__players has-text-left">Description: {event.description}</div>
                                {
                                    event.date
                                        ? <><div className="game__skillLevel has-text-left">Date: {event.date}</div></>
                                        : <><div>Date: To Be Announced</div></>
                                }
                            </section>
                        </div>
                    </>
                })
            }
        </article>
    </>
    )
}