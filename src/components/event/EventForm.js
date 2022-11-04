import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent } from "../../managers/EventManager"
import { getGames } from "../../managers/GameManager"



export const EventForm = () => {

    const [games, setGames] = useState([])
    const navigate = useNavigate()
    // const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames()
            .then((gameTypesArray) => {
                setGames(gameTypesArray)
            })
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentEvent({
            ...currentEvent,
            [domEvent.target.name]: value
        })
    }

    return (
        <form className="gameForm">
            <h1 className="gameForm__title">Register New Game</h1>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Games: </label>
                    <select name="gameId" className="drop__down" value={currentEvent.gameId}
                        onChange={changeEventState}
                    >
                        <option value={0}>Select a Event</option>
                        {
                            games.map((g) => {
                                return <option value={`${g.id}`} key={`game--${g.id}`}>{g.title}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
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
                        description: currentEvent.description,
                        game: parseInt(currentEvent.game),
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="button is-primary ml-6">Create</button>
            <button className="btn__update button is-link ml-2" onClick={() => navigate(`/events`)}>Return to Events</button>
        </form>
    )
}