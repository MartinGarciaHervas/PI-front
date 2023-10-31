const LoginValid = (input) => {

    let errors = {}

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
        errors.email = 'Debe de ser un email'
    }
    if (input.email.length > 35) {
        errors.email = 'El email no puede tener mas de 35 caracteres'
    }
    if (!input.email) {
        errors.email = 'El email no puede estar vacio'
    }

    if (!/^(?=.*\d).{6,10}$/.test(input.password)) {
        errors.password = 'La contraseña debe tener al menos 1 numero y entre 6 y 10 caracteres'
    }

    return errors;

}

export default LoginValid;