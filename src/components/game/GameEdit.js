import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGameById, getGames, getGameTypes, saveEditedGame } from "../../managers/GameManager.js"



export const GameEdit = () => {
    const { gameId } = useParams()
    const navigate = useNavigate()

    const [gameTypes, setGamesTypes] = useState([])
    const [currentGame, setCurrentGames] = useState({
        title: "",
        maker: "",
        number_of_players: 0,
        skill_level: 0,
        game_type: 0
    })

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    useEffect(() => {
        getGameTypes().then(data => setGamesTypes(data))
    }, [])


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
        <form className="gameForm box mt-6">
            <h1 className="gameForm__title mb-3">Update Game</h1>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        placeholder={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        placeholder={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select name="gameId" className="drop__down" value={currentGame.gameId}
                        onChange={changeGameState}
                    >
                        <option value={0}>{currentGame.label}</option>
                        {
                            gameTypes.map((g) => {
                                return <option value={`${g.id}`} key={`game--${g.id}`}>{g.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        placeholder={currentGame.number_of_players}
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Skill_level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        placeholder={currentGame.skill_level}
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}
            <div className="has-text-centered">
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const game = {
                            id: currentGame.id,
                            gamer: currentGame.gamer,
                            title: currentGame.title,
                            maker: currentGame.maker,
                            number_of_players: currentGame.number_of_players,
                            skill_level: currentGame.skill_level,
                            game_type: currentGame.game_type
                        }

                        // Send POST request to your API
                        saveEditedGame(game)
                            .then(() => navigate("/games"))
                    }}
                    className="button is-primary ml-6 ">Update Game</button>
                <button type="button" className="button is-link ml-2" onClick={() => navigate("/games")}>Return to Games</button>
            </div>
        </form>
    )
}