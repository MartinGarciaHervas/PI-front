import { NavLink, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

//Actions
import { logout } from "../../Redux/Actions/actions"

//Components
import SearchBar from "../SearchBar/searchBar"
import Filters from "../Filters & Orders/Filters"
import Orders from "../Filters & Orders/Orders"

//Estilos
import style from './navBar.module.css'
import { useState } from "react"

export default function NavBar() {

    const responsiveWidth = window.innerWidth <= 600;

    const location = useLocation()

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(logout)
    }

    const [responsive, setResponsive] = useState(false)

    function responsiveHanlder() {
        setResponsive(responsive ? false : true)
    }

    const [responsiveFilter, setResponsiveFilter] = useState(false)

    function responsiveFilterHanlder() {
        setResponsiveFilter(responsiveFilter ? false : true)
    }

    return (
        <>
            {!responsiveWidth ? <div className={style.container}>
                <div className={style.filters}>
                    {location.pathname === '/home' && <Orders />}
                </div>
                <div className={style.elements}>
                    <div className={style.routes}>
                        {location.pathname !== '/home' && location.pathname !== '/' && <NavLink to={'/home'}><button>Home</button></NavLink>}
                        {location.pathname !== '/form' && location.pathname !== '/' && <NavLink to={'/form'}><button>Create Activity</button></NavLink>}
                        {location.pathname !== '/game' && location.pathname !== '/' && <NavLink to={'/game'}><button>Quiz!</button></NavLink>}
                        {location.pathname !== '/activities' && location.pathname !== '/' && <NavLink to={'/activities'}><button>Activities</button></NavLink>}
                        {location.pathname !== '/' && <button onClick={clickHandler}>Exit</button>}
                    </div>
                    {location.pathname === '/home' && <SearchBar />}
                </div>
                <div>
                    {location.pathname === '/home' && <Filters />}
                </div>
            </div>
                :
                <div className={style.responsiveContainer}>
                    <div className={style.hamburguerContainer}>
                        <button className={style.hamburguer} onClick={responsiveHanlder}>=</button>
                        {responsive ? <ul className={style.list}>
                            {location.pathname !== '/home' && location.pathname !== '/' && <li><NavLink to={'/home'}><button>Home</button></NavLink></li>}
                            {location.pathname !== '/form' && location.pathname !== '/' && <li><NavLink to={'/form'}><button>Create Activity</button></NavLink></li>}
                            {location.pathname !== '/game' && location.pathname !== '/' && <li><NavLink to={'/game'}><button>Quiz!</button></NavLink></li>}
                            {location.pathname !== '/activities' && location.pathname !== '/' && <li><NavLink to={'/activities'}><button>Activities</button></NavLink></li>}
                            {location.pathname !== '/' && <li><button onClick={clickHandler}>Exit</button></li>}
                        </ul> : null}
                    </div>
                    {location.pathname === '/home' && <SearchBar />}
                    <div className={style.filterContainer}>
                        <button className={style.filterButton} onClick={responsiveFilterHanlder}>Filt</button>
                        {responsiveFilter ? <ul className={style.filterList}>
                            {location.pathname === '/home' && <Orders />}
                            {location.pathname === '/home' && <Filters />}
                        </ul> : null}
                    </div>
                </div>}
        </>
    )
}