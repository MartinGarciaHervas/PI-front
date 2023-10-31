const validar = (input) => {

    let errors = {}

    if (!/[a-zA-Z]+[ ]*[a-zA-Z]+$/.test(input.name)) {
        errors.name = 'Debe contener solo letras y espacios'
    }
    return errors;

}

export default validar

