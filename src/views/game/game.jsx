import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

//Actions
import { setNewRecord } from '../../Redux/Actions/actions'

//Estilos
import style from './game.module.css'

export default function Game() {

    const dispatch = useDispatch()

    const allCountries = useSelector(state => state.allCountries)
    const independentCountries = allCountries?.filter(country => country.independent === true)

    const [flag, setFlag] = useState('')
    const [countryName, setCountryName] = useState({
        realName: '',
        guessName: '',
        id: ''
    })

    const record = useSelector(state => state?.gameRecord)
    const [score, setScore] = useState(0)

    function setRandomCountry() {
        const randomCountry = parseInt((Math.random() * independentCountries.length).toFixed())
        setFlag(independentCountries[randomCountry]?.flag)
        setCountryName({
            ...countryName,
            realName: independentCountries[randomCountry]?.name,
            id: independentCountries[randomCountry]?.id
        })
    }

    useEffect(() => {
        setCountryName({
            ...countryName,
            guessName: '',
        })
    }, [flag])

    useEffect(() => {
        if (independentCountries) {
            setRandomCountry()
        }
    }, [])

    function changeHandler(event) {
        setCountryName({
            ...countryName,
            guessName: event.target.value
        })
    }

    function clickHandler() {
        if (countryName.realName.toUpperCase() === countryName.guessName.toUpperCase()) {
            alert('Correct!!');
            setScore(score + 10)
            setRandomCountry()
        } else {
            alert(`Game Over :( the correct answer was ${countryName.realName}`);
            if (score > record) {
                dispatch(setNewRecord({ score: score }))
            }
            setScore(0)
            setRandomCountry()
            setLives(3)
        }
    }

    //Lives Handler ----------------------------------------------------------------

    const [lives, setLives] = useState(3)

    function nextHandler() {
        setLives(lives - 1);
        setRandomCountry()
    }


    return (
        <div className={style.container}>
            <div className={style.game}>
                <div className={style.textContainer}>
                    <h1>Which country is it?</h1>
                </div>
                <img className={style.img} src={flag} />
                <input className={style.input} value={countryName.guessName} onChange={changeHandler} placeholder='Guess the country'></input>
                <button onClick={clickHandler}>Guess!!</button>
                {lives > 0 && <button onClick={nextHandler}>Next</button>}
                <p>RECORD:{record}</p>
                <p>Score:{score}</p>
                <p>Next's:{lives}</p>
                <NavLink to={`/detail/${countryName?.id}`}><p>Learn more about this Country!!!</p></NavLink>
            </div>
        </div>
    )
}