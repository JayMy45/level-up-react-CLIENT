import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGames, deleteGame } from "../../managers/GameManager.js"
import "./Game.css"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, game) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteGame(game.id)
                .then(getGames()
                    .then(data => setGames(data)))
            : <></>
    }


    return (<>
        <header className="title is-3 p-2 has-text-centered" id="game__list-title">List of Games</header>
        <button className="btn-2 btn-sep icon-create button is-primary ml-6 mb-1"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        ><span className="has-text-weight-semibold is-size-5">Register New Game</span></button>
        <article className="games mt-5">
            {
                games.map(game => {
                    return <React.Fragment key={`game--${game.id}`}>
                        <div className="columns box mb-5" id="game__list">
                            <section className="game column" >
                                <div className="game__title has-text-left">Title: {game.title}</div>
                                <div className="game__title has-text-left">Maker: {game.maker}</div>
                                <div className="game__players has-text-left">Number of Players: {game.number_of_players}</div>
                                <div className="game__skillLevel has-text-left">Skill Level: {game.skill_level}</div>
                            </section>
                            <div>
                                <div className="">
                                    <button className="btn__games button is-link is-small mb-1" onClick={() => navigate(`/games/${game.id}`)}>Update</button>
                                </div>
                                <div className="">
                                    <button className="btn__games button is-danger is-small" onClick={(evt) => { confirmDelete(evt, game) }}>Delete</button>
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