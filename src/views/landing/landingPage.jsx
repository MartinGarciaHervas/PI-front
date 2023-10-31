import { useState } from 'react'

//Components
import Login from '../../components/login/login'
import Register from '../../components/register/register'

//Estilos
import style from './landingPage.module.css'

export default function Landing() {

    const [aux, setAux] = useState(true)

    function clickHandler(){
        setAux(aux?false:true)
    }

    return (
        <div className={style.container}>
            <div className={style.textos}>
                <h1 className={style.welcome}>Welcome!!!!</h1>
                <p className={style.subtext}>Countries P.I.</p>
            </div>
            <div className={style.gif}></div>
            {aux?<Login/>
            :
            <Register/>}
            {aux && <button onClick={clickHandler}>I dont have an account</button>}
        </div>
    )
}