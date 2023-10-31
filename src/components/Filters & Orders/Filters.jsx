import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

//Actions
import { filterByContinent, filterByActivity } from '../../Redux/Actions/actions'

//Estilos
import style from './filters.module.css'

export default function Filters() {

    const responsiveWidth = window.innerWidth <= 600;

    const dispatch = useDispatch()

    const activities = useSelector(state => state?.activities)

    //Filters

    function filterByContinentHandler(event) {
        dispatch(filterByContinent(event.target.value))
    }

    function filterByActivityHandler(event) {
        dispatch(filterByActivity(event.target.value))
    }

    const [filterAux, setFilterAux] = useState(true)

    function filterAuxHandler() {
        setFilterAux(filterAux ? false : true)
    }

    return (
        <div>
            {!responsiveWidth ?
                <div className={style.filtros2}>
                    <div className={filterAux ? style.ordenes1 : style.ordenes2}>
                        <div>
                            <p className={style.title}>By Continent</p>
                            <select onChange={filterByContinentHandler}>
                                <option value=''>All</option>
                                <option value='Asia'>Asia</option>
                                <option value='North America'>North America</option>
                                <option value='South America'>South America</option>
                                <option value='Antarctica'>Antarctica</option>
                                <option value='Oceania'>Oceania</option>
                                <option value='Europe'>Europe</option>
                                <option value='Africa'>Africa</option>
                            </select>
                        </div>
                        <div>
                            <p className={style.title}>By Activity</p>
                            <select onChange={filterByActivityHandler}>
                                <option value=''>All</option>
                                {[...new Set(activities?.map(activity => activity.name.toUpperCase()))].map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {filterAux ? <button onClick={filterAuxHandler} className={style.button}>Show Filters</button>
                        : <button onClick={filterAuxHandler} className={style.button}>Hide Filters</button>}
                </div>
                :
                <div className={style.responsiveFilters}>
                    <p>By Continent</p>
                    <select className={style.responsiveFiltersSelect} onChange={filterByContinentHandler}>
                        <option value=''>All</option>
                        <option value='Asia'>Asia</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Antarctica'>Antarctica</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Europe'>Europe</option>
                        <option value='Africa'>Africa</option>
                    </select>
                    <p>By Activity</p>
                    <select className={style.responsiveFiltersSelect} onChange={filterByActivityHandler}>
                        <option value=''>All</option>
                        {[...new Set(activities?.map(activity => activity.name.toUpperCase()))].map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>}
        </div>
    )
}