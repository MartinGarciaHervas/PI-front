//Components
import Paginado from "../../components/Paginado/Paginado";

//Estilos
import style from './home.module.css'

export default function Home() {

    return (
        <>
            <div className={style.home}>
                <Paginado />
            </div>
        </>
    )
}