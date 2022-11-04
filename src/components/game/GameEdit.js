import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameById, saveEditedGame } from "../../managers/GameManager.js"



export const GameEdit = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [currentGame, setCurrentGames] = useState({
        description: "",
        date: "",
        time: "",
    })

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */


    // Whenever gameId changes useEffect invokes this function
    const renderGame = () => {
        if (gameId) {
            // A single game is GET and currentGames is set to response
            getGameById(gameId).then((res) => {
                setCurrentGames(res)
            })
        }
    }

    //  Whenever gameId changes renderGame() function is invoked
    useEffect(() => {
        renderGame()
    }, [gameId])


    const changeGameState = (domGame) => {
        // TODO: Complete the onChange function
        const value = domGame.target.value
        setCurrentGames({
            ...currentGame,
            [domGame.target.name]: value
        })
    }

    return (
        <form className="gameForm">
            <h1 className="gameForm__title mb-3">Update Game</h1>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        placeholder={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Games: </label>
                    <select name="gameId" className="drop__down" value={currentGame.gameId}
                        onChange={changeGameState}
                    >
                        <option value={0}>{currentGame.title}</option>
                        {
                            currentGame.map((g) => {
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
                        placeholder={currentGame.date}
                        value={currentGame.date}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        placeholder={currentGame.time}
                        value={currentGame.time}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        gamer: currentGame.gamer,
                        title: currentGame.title,
                        make: currentGame.maker,
                        number_of_players: currentGame.date,
                        skill_level: currentGame.time,
                        game_type: currentGame.game_type
                    }

                    // Send POST request to your API
                    saveEditedGame(game)
                        .then(() => navigate("/games"))
                }}
                className="button is-primary ml-6">Update Game</button>
            <button className="button is-link ml-2" onClick={() => navigate("/games")}>Return to Games</button>
        </form>
    )
}