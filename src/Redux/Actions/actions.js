import axios from 'axios'

//Action Types
import { ADD_ACTIVITY, ADD_ALL_COUNTRIES, CLEAR_DETAIL, DELETE_ACTIVITY, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER_BY_ALPHABETIC, ORDER_BY_POPULATION, REGISTER_USER, LOGIN_USER, LOGOUT_USER, SET_NEW_RECORD, DELETE_COUNTRY_FROM_ACTIVITY, EDIT_ACTIVITY } from "./actionsTypes";



//Filter & Order Actions ----------------------------------------------------------------------------------------

export const orderByAlphabetic = (order) => {
    return {
        type: ORDER_BY_ALPHABETIC,
        payload: order,
    }
}

export const orderByPopulation = (order) => {
    return {
        type: ORDER_BY_POPULATION,
        payload: order,
    }
}

export const filterByContinent = (continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent,
    }
}

export const filterByActivity = (activity) => {
    return {
        type: FILTER_BY_ACTIVITY,
        payload: activity,
    }
}


//Get Actions ----------------------------------------------------------------------------------------------------

export const addAllCountries = () => {
    return async (dispatch) => {
        try {
            const countriesResponse = await axios.get('/countries');
            const activitiesResponse = await axios.get('/activities');
            const recordResponse = await axios.get('/record');
            const record = recordResponse.data[0].record
            const countries = countriesResponse.data
            const activities = activitiesResponse.data
            return dispatch({
                type: ADD_ALL_COUNTRIES,
                payload: { countries, activities, record },
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getCountryByName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/countries/?name=${name}`)
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getCountryById = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/countries/${id}`)
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: data,
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}


//Post Actions -----------------------------------------------------------------------------------------------------------

export const addActivity = (activity) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/activities', activity);
            alert(data.message)
            return dispatch({
                type: ADD_ACTIVITY,
                payload: activity,
            })
        } catch (error) {
            alert(error.message)
        }
    }
}


//Put Actions ----------------------------------------------------------------------------------------------------------------

export const editActivity = (activity) => {
    return async (dispatch) => {
        try {
            const editResponse = await axios.put('/activities', activity);
            alert(editResponse.data);
            const activitiesResponse = await axios.get('/activities');
            return dispatch({
                type: EDIT_ACTIVITY,
                payload: activitiesResponse.data
            })
        } catch (error) {

        }
    }
}


//Clear Actions --------------------------------------------------------------------------------------------------------------

export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL,
    }
}

export const deleteActivity = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/activity/${id}`)
            alert(data)
            return dispatch({
                type: DELETE_ACTIVITY,
                payload: id
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export const deleteCountryFromActivity = (ids) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/activities/${ids}`)
            const activitiesResponse = await axios.get('/activities');
            alert(response.data)
            return dispatch({
                type: DELETE_COUNTRY_FROM_ACTIVITY,
                payload: activitiesResponse.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}


//Login & Register ----------------------------------------------------------------------------------------------------------------

export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`/user`, user);
            alert(`Welcome ${user.username}!!!`)
            return dispatch({
                type: REGISTER_USER,
                payload: {
                    ...user,
                    access: data
                }
            })
        } catch (error) {
            alert('Username o Email ya existen!!')
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER,
    }
}

export const loginAction = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

//Game actions -------------------------------------------------------------------------------------------------

export const setNewRecord = (score) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/record', score)
            return dispatch({
                type: SET_NEW_RECORD,
                payload: data
            })
        } catch (error) {
            alert(error.message)
        }
    }
}