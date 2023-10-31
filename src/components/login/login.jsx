import { useState } from 'react'
import { useDispatch } from 'react-redux'

import login from '../firebase/login'

//Actions
import { loginAction } from '../../Redux/Actions/actions'

//Estilos
import style from './login.module.css'

export default function Login() {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    function changeHandler(event) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        login(user.email, user.password, dispatch)
        
    }

    function googleHandler(){
        dispatch(loginAction(user))
    }


    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <input className={style.input} autoComplete="off" onChange={changeHandler} name='email' value={user.email} placeholder='Email'></input>
                <input className={style.input} autoComplete="off" onChange={changeHandler} name='password' value={user.password} type='password' placeholder='Password'></input>
                <button type='submit'>Login</button>
            </form>
            <button onClick={googleHandler}>Login with Google pa</button>
        </div>
    )
}