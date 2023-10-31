import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";

//Components
import Loader from "../Loader/Loader";
import Cards from "../Cards/cards"

//Estilos
import style from './paginado.module.css'


//Cantidad de Paises por pagina
const COUNTRIES_PER_PAGE = 10



export default function Paginado() {

    const [loading, setLoading] = useState(true)

    const allCountries = useSelector(state => state?.countries);

    const [countries, setCountries] = useState([])

    const [currentPage, setCurrentPage] = useState(0);

    function nextHandler() {
        const paisesTotales = allCountries?.length;

        const nextPage = currentPage + 1;

        const primerPais = nextPage * COUNTRIES_PER_PAGE;

        if (primerPais >= paisesTotales) return;

        setCountries([...allCountries].splice(primerPais, COUNTRIES_PER_PAGE));
        setCurrentPage(nextPage)
    }

    function prevHandler() {

        const prevPage = currentPage - 1;

        const primerPais = prevPage * COUNTRIES_PER_PAGE;

        if (primerPais < 0) return;

        setCountries([...allCountries].splice(primerPais, COUNTRIES_PER_PAGE));
        setCurrentPage(prevPage)
    }

    function firstPageHandler() {
        setCurrentPage(0);
        setCountries([...allCountries].splice(0, COUNTRIES_PER_PAGE))
    }

    function lastPageHandler() {
        const lastPage = Math.ceil(allCountries?.length / COUNTRIES_PER_PAGE) - 1
        const primerPais = lastPage * COUNTRIES_PER_PAGE;

        setCountries([...allCountries].splice(primerPais, COUNTRIES_PER_PAGE))
        setCurrentPage(lastPage)

    }


    //Manejo el Loader, y lo uso para esperar a que todo cargue en el estado global y Back

    useEffect(() => {
        if (allCountries) {
            setTimeout(() => {
                setCurrentPage(0)
                setCountries([...allCountries].splice(0, COUNTRIES_PER_PAGE))
                setLoading(false)
            }, 500)
        }
    }, [allCountries])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className={style.container}>
                    <Cards countries={countries} />
                    <div className={style.buttons}>
                        <button className={style.button} onClick={prevHandler}>Prev</button>
                        <button onClick={firstPageHandler} className={style.pages}>First</button>
                        <p className={style.page}>Page {currentPage + 1} of {Math.ceil(allCountries?.length / COUNTRIES_PER_PAGE)}</p>
                        <button onClick={lastPageHandler} className={style.pages}>Last</button>
                        <button className={style.button} onClick={nextHandler}>Next</button>
                    </div>
                </div>
            )}
        </div>
    )
}