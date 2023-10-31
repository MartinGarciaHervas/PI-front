import { useDispatch } from 'react-redux'
import { useState } from 'react'

//Actions
import { orderByPopulation, orderByAlphabetic } from '../../Redux/Actions/actions'

//Estilos
import style from './orders.module.css'

export default function Orders() {

    const responsiveWidth = window.innerWidth <= 600;

    const dispatch = useDispatch()

    const [order, setOrder] = useState({
        alphabetic: 'descendente',
        population: 'ascendente'
    })

    //Orders

    function orderByPopulationHandler(event) {
        setOrder({
            ...order,
            population: event.target.value
        })
        dispatch(orderByPopulation(order.population))
    }

    function orderByAlphabeticHandler(event) {
        setOrder({
            ...order,
            alphabetic: event.target.value
        })
        dispatch(orderByAlphabetic(order.alphabetic))
    }

    const [orderAux, setOrderAux] = useState(false)

    function orderAuxHandler() {
        setOrderAux(orderAux ? false : true)
    }

    return (
        <div>
            {!responsiveWidth ? <div className={style.filtros}>
                {orderAux ? <button className={style.button} onClick={orderAuxHandler}>Hide Orders</button>
                    : <button className={style.button} onClick={orderAuxHandler}>Show Orders</button>}
                {<div className={orderAux ? style.order2 : style.order3}>
                    <div>
                        <p className={style.titles}>By population</p>
                        <select name='population' value={order.population} onChange={orderByPopulationHandler}>
                            <option value='ascendente'>Ascendente</option>
                            <option value='descendente'>Descendente</option>
                        </select>
                    </div>
                    <div>
                        <p className={style.titles}>Alphabetic</p>
                        <select name='alphabetic' value={order.alphabetic} onChange={orderByAlphabeticHandler}>
                            <option value='ascendente'>Ascendente</option>
                            <option value='descendente'>Descendente</option>
                        </select>
                    </div>
                </div>}
            </div>
                :
                <div>
                    <p className={style.titles}>By population</p>
                    <select name='population' value={order.population} onChange={orderByPopulationHandler}>
                        <option value='ascendente'>Ascendente</option>
                        <option value='descendente'>Descendente</option>
                    </select>
                    <p className={style.titles}>Alphabetic</p>
                    <select name='alphabetic' value={order.alphabetic} onChange={orderByAlphabeticHandler}>
                        <option value='ascendente'>Ascendente</option>
                        <option value='descendente'>Descendente</option>
                    </select>
                </div>}
        </div>
    )
}