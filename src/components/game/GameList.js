import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGames } from "../../managers/GameManager.js"
import "./Game.css"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (<>
        <header className="title is-3 p-2 has-text-centered" id="game__list-title">List of Games</header>
        <button className="btn-2 btn-sep icon-create button is-primary ml-6 mb-3"
            onClick={() => {
                navigate({ pathname: "/games/new" })
            }}
        ><span className="has-text-weight-semibold is-size-5">Register New Game</span></button>
        <article className="games">
            {
                games.map(game => {
                    return <React.Fragment key={`game--${game.id}`}>
                        <div className="columns box" id="game__list" key={`game--${game.id}`}>
                            <section className="game column" >
                                <div className="game__title has-text-left">{game.title} by {game.maker}</div>
                                <div className="game__players has-text-left">{game.number_of_players} players needed</div>
                                <div className="game__skillLevel has-text-left">Skill level is {game.skill_level}</div>
                            </section>
                        </div>
                    </React.Fragment>
                })
            }
        </article>
    </>
    )
}