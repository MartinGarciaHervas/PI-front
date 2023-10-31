import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'

//Actions
import { addAllCountries, getCountryByName } from "../../Redux/Actions/actions";

//Estilos
import style from './searchBar.module.css'


export default function SearchBar() {

    const dispatch = useDispatch()

    const [country, setCountry] = useState('');

    function changeHandler(event) {
        setCountry(event.target.value)
    }

    // La comento a esta funcion porq al final use un useEffect para que vaya buscando a medida que escribo
    // function clickHandler() {
    //     dispatch(getCountryByName(country))
    //     setCountry('')
    // }

    function clearHandler() {
        dispatch(addAllCountries())
        setCountry('')
    }

    useEffect(()=>{
        if(country === ''){
            return
            // dispatch(addAllCountries())
        } else {
            dispatch(getCountryByName(country))
        }
    },[country])

    return (
            <div className={style.searchBar}>
                <input onChange={changeHandler} value={country} type="search" placeholder="Search name" />
                {/* <button onClick={clickHandler}>Search</button> */}
                <button onClick={clearHandler}>Clear</button>
            </div>
    )
}