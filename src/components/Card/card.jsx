import { NavLink } from 'react-router-dom'
import style from './card.module.css'

export default function Card({ continent, flag, name, id }) {


    return (
        <>
            <div className={style.card}>
                <div className={style.nameContainer}>
                    <h1 className={style.name}>{name}</h1>
                </div>
                <NavLink to={`/detail/${id}`} >
                    <div className={style.imgContainer} style={{ backgroundImage: `url(${flag})` }}>
                        <div className={style.img}></div>
                    </div>
                </NavLink>
                <h2 className={style.continent}>{continent}</h2>
            </div>
        </>
    )
}