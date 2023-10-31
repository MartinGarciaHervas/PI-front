import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Actions
import { addActivity, addAllCountries } from "../../Redux/Actions/actions"

//Helpers
import validar from "../../helpers/validation"

//Estilos
import style from './form.module.css'


export default function ActivityForm() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const countries = useSelector(state => state?.allCountries)

    const seasons = ['Winter', 'Summer', 'Autumn', 'Spring']


    //Estado local con los valores que luego seran enviados por body para crear una activity
    const [activityData, setActivityData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        CountryId: [],
    })

    //Estado local para validar errores
    const [errors, setErrors] = useState({
        name: 'Debe contener solo letras y espacios'
    })

    //Este estado es para filtrar la lista de paises que se van a mosrtar en el options
    const [search, setSearch] = useState('')

    //Este handler setea el seach con lo que escribo en el input
    function countriesHandler(event) {
        setSearch(event.target.value)
    }

    //en esta constante se muestran los paises filtrados, a traves de lo que esta en search. las options se renderizan a partir de esta constante
    const filteredCountries = countries?.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))



    function changeHandler(event) {
        setActivityData({
            ...activityData,
            [event.target.name]: event.target.value,
        })

        //Como solo tengo que validar el atributo name, en el caso de que el value sea name ahi valido
        if (event.target.name === 'name')
            setErrors(validar({
                name: event.target.value,
            }))
    }


    //Toma los valores del select, y los ingresa al estado local, dentro de un array, si ya existen dentro, no los agrega
    function selectHandler(event) {

        //Con este if me fijo si el pais ya existe en los seleccionados para no agregarlo de nuevo
        if (activityData.CountryId.includes(event.target.value)) {
            return setActivityData({
                ...activityData,
                CountryId: [...activityData.CountryId]
            })
        }
        setActivityData({
            ...activityData,
            CountryId: [...activityData.CountryId, event.target.value]
        })
        setSearch('')
    }

    function deleteHandler(countryId) {
        setActivityData({
            ...activityData,
            CountryId: activityData.CountryId.filter(country => country !== countryId)
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        //Una vez creada la actividad seteo los campos a su valor de origen
        setActivityData({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            CountryId: [],
        })

        await dispatch(addActivity(activityData))
        await dispatch(addAllCountries())
        navigate('/home')
    }

    return (
        <>
            <div className={style.container}>
                <form className={style.form} onSubmit={submitHandler}>
                    <div className={style.cuadro}>
                        <label className={style.labels}><p className={style.obligatorios}>*</p>Name of Activity</label>
                        <input onChange={changeHandler} autoComplete="off" value={activityData.name} name="name" placeholder="Name of activities"></input>
                        <span>{errors.name}</span>
                    </div>
                    <div className={style.cuadro}>
                        <label className={style.labels}><p className={style.obligatorios}>*</p>Difficulty</label>
                        <select onChange={changeHandler} name="difficulty">
                            <option value='0'>0</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div className={style.cuadro}>
                        <label className={style.labels}><p className={style.obligatorios}>*</p>Duration</label>
                        <div className={style.duration}>
                            <input type="number" min='0' max='24' autoComplete="off" onChange={changeHandler} value={activityData.duration} name="duration" placeholder="xx"></input>
                            <p className={style.hs}>Hs</p>
                        </div>
                    </div>
                    <div className={style.cuadro}>
                        <label className={style.labels}><p className={style.obligatorios}>*</p>Season</label>
                        <div className={style.checkbox}>
                            {seasons.map((season, index)=>
                            <label key={index}>
                                <input onChange={changeHandler} key={index} type="radio" name="season" value={season}/>{season}
                            </label>
                            )}
                        </div>
                    </div>
                    <div className={style.cuadro}>
                        <label className={style.labels}><p className={style.obligatorios}>*</p>Country</label>

                        {/* Este input es para filtrar los paises que estan en el select, cambia el estado search */}
                        <input value={search} placeholder="Look for Country" onChange={countriesHandler}></input>
                        <select multiple onChange={selectHandler} className={style.select}>
                            {filteredCountries?.map(element =>
                                <option key={element.id} value={element.id}>{element.name}</option>)}
                        </select>
                        <div>
                            <p>Selected</p>
                            {activityData.CountryId.map(country =>
                                <div className={style.selected} key={country}>
                                    <p className={style.countryName} >{country}</p>
                                    <button className={style.selectedButton} onClick={() => { deleteHandler(country) }}>x</button>
                                </div>)}
                        </div>
                    </div>
                    <div className={style.cuadro}>

                        {/*En caso de que alguno de los campos este incorrecto o incompleto, desactivo el boton de submit, y muestro un mensaje*/}
                        {errors.name || activityData.difficulty === '' || activityData.duration === '' || activityData.season === '' || !activityData.CountryId.length ? <button disabled type='submit'>Create Activity</button> : <button type='submit'>Create Activity</button>}
                        {errors.name || activityData.difficulty === '' || activityData.duration === '' || activityData.season === '' || !activityData.CountryId.length ? <p className={style.obligatorios}>* campos obligatorios</p> : <span></span>}
                    </div>
                </form>
            </div>
        </>
    )
}