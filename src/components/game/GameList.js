import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import "./Game.css"

export const GameList = (props) => {
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (<>
        <header className="title is-3 p-2 has-text-centered" id="game__list-title">List of Games</header>
        <article className="games">
            {
                games.map(game => {
                    return <>
                        <div className="columns box" id="game__list">
                            <section key={`game--${game.id}`} className="game column">
                                <div className="game__title has-text-left">{game.title} by {game.maker}</div>
                                <div className="game__players has-text-left">{game.number_of_players} players needed</div>
                                <div className="game__skillLevel has-text-left">Skill level is {game.skill_level}</div>
                            </section>
                        </div>
                    </>
                })
            }
        </article>
    </>
    )
}