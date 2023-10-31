import { useState } from 'react'
import { useDispatch } from 'react-redux';

//Actions
import { registerUser } from '../../Redux/Actions/actions';

//Helpers
import LoginValid from '../../helpers/loginValidator'

//Estilos
import style from './register.module.css'

export default function Register (){

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: 'El email no puede estar vacio',
        password: 'La contraseña debe tener al menos 1 numero y entre 6 y 10 caracteres'
    })

    function changeHandler(event){
        setUser({
            ...user,
            [event.target.name]:event.target.value
        });
        setErrors(LoginValid({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(registerUser(user))
    }


    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <input className={style.input} autoComplete="off" onChange={changeHandler} name="email" value={user.email} placeholder="Example@gmail.com"></input>
                <span className={style.error}>{errors.email}</span>
                <input className={style.input} autoComplete="off" onChange={changeHandler} name="password" value={user.password} placeholder="password"></input>
                <span className={style.error}>{errors.password}</span>
                {errors.email || errors.password ? <button disabled type='submit'>Register</button>:<button type='submit'>Register</button>}
            </form>
        </div>
    )
}