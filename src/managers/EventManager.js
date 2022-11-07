// Get all Events
export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

// GET single event by Id
export const getEventById = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

// POST new events
export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
}

// PUT edit events
export const saveEditedEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
    })
}

// DELETE single event
export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("lu_token")}` },
    })
}

//~ JOIN EVENT MANAGERS
// DELETE user (unJoin) from event
export const leaveEvent = (eventId) => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("lu_token")}` },
    })
}

// POST user (Join) on an event
export const joinEvent = (eventId) => {
    // TODO: Write the POST fetch request to join and event
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: { "Authorization": `Token ${localStorage.getItem("lu_token")}` },
    })
}