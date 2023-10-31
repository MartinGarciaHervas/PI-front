import { useDispatch, useSelector } from 'react-redux'
import style from './activities.module.css'
import { NavLink } from 'react-router-dom'

//Actions
import { addAllCountries, deleteActivity, deleteCountryFromActivity } from '../../Redux/Actions/actions'

export default function Activities() {

    const dispatch = useDispatch()

    const allActivities = useSelector(state => state?.activities)

    function deleteActivityHandler(event) {
        dispatch(deleteActivity(event.target.value))
        dispatch(addAllCountries())
    }

    function deleteCountryHandler(ids) {
        dispatch(deleteCountryFromActivity(ids))
    }

    return (
        <div className={style.container}>
            <div className={style.activitiesContainer}>
                {allActivities?.map((activity, index) =>
                    <div className={style.activity} key={index}>
                        <div className={style.activityNameContainer}>
                            <NavLink className={style.navlink} to={`/form/${activity.id}`}>
                                <button value={activity.id} className={style.editButton}>e</button>
                            </NavLink>
                            <p key={activity.name}>{activity.name}</p>
                            <button value={activity.id} onClick={deleteActivityHandler} className={style.deleteButton}>x</button>
                        </div>
                        <p key={activity.difficulty}>Difficulty: {activity.difficulty}</p>
                        <p key={activity.duration}>Duration: {activity.duration}</p>
                        <p key={activity.season}>Season: {activity.season}</p>
                        <div className={style.countriesContainer}>
                            <p>Countries</p>
                            {activity?.Countries?.map((country, index) =>
                                <div key={index} className={style.countryNameContainer}>
                                    <button onClick={() => { deleteCountryHandler([country.id, activity.id]) }} className={style.x} key={index}>x</button>
                                    <NavLink className={style.navlink} to={`/detail/${country.id}`}>
                                        <p key={country.name}>{country.name}</p>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}