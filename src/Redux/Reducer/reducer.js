import { ADD_ACTIVITY, ADD_ALL_COUNTRIES, CLEAR_DETAIL, DELETE_ACTIVITY, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_COUNTRY_BY_ID, GET_COUNTRY_BY_NAME, ORDER_BY_ALPHABETIC, ORDER_BY_POPULATION, REGISTER_USER, LOGIN_USER, LOGOUT_USER, SET_NEW_RECORD, DELETE_COUNTRY_FROM_ACTIVITY, EDIT_ACTIVITY } from '../Actions/actionsTypes'

let intialState = {
    allCountries: [],
    countries: [],
    detail: [],
    activities: [],
    user: {
        email: '',
        access: false,
    },
    gameRecord: 0
}

function rootReducer(state = intialState, action) {
    switch (action.type) {

        //Order & Filter Cases -----------------------------------------------------------------------------------------------

        case ORDER_BY_ALPHABETIC:
            return {
                ...state,
                countries: action.payload === 'ascendente' ? [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
                    : [...state.countries].sort((a, b) => b.name.localeCompare(a.name))
            }

        case ORDER_BY_POPULATION:
            return {
                ...state,
                countries: action.payload === 'ascendente' ? [...state.countries].sort((a, b) => a.population - b.population)
                    : [...state.countries].sort((a, b) => b.population - a.population)
            }

        case FILTER_BY_CONTINENT:
            return {
                ...state,
                countries: action.payload === '' ? state.allCountries : state.allCountries.filter(country => country.continent === action.payload)
            }

        case FILTER_BY_ACTIVITY:
            return {
                ...state,
                countries: action.payload === '' ? state.allCountries : state.allCountries.filter(country => country.Activities.some(activity => activity.name.toLowerCase() === action.payload.toLowerCase()))
            }


        //Get Cases -------------------------------------------------------------------------------------------------------------

        case ADD_ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload.countries.sort((a, b) => a.name.localeCompare(b.name)),
                allCountries: action.payload.countries,
                activities: action.payload.activities,
                gameRecord: action.payload.record,
            }

        case GET_COUNTRY_BY_ID:
            return {
                ...state,
                detail: action.payload
            }

        case GET_COUNTRY_BY_NAME:
            return {
                ...state,
                countries: action.payload
            }

        case DELETE_COUNTRY_FROM_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }


        //Post Cases --------------------------------------------------------------------------------------------------------------

        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }


        //Put Cases -----------------------------------------------------------------------------------------------------------------

        case EDIT_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }


        //Clear Cases ---------------------------------------------------------------------------------------------------------------

        case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            }

        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload)
            }


        //Login & Register ------------------------------------------------------------------------------------------------------------

        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }

        case LOGOUT_USER:
            return {
                ...state,
                user: {
                    email: '',
                    password: '',
                    access: false,
                }
            }

        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }

        
        //Game -----------------------------------------------------------------------------------------------------------------

        case SET_NEW_RECORD:
            return {
                ...state,
                gameRecord: action.payload
            }
    }
}

export default rootReducer;