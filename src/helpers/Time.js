export default function Time(arg) {

    let zonaHoraria = arg

    if(arg === 'UTC') zonaHoraria = arg+'00:00'
    //New Date() guarda en la variable, la fecha y la hora actual
    const fechaHora = new Date();

        //Aca lo que hacemos es tomar la parte que me interesa de la zona horaria que viene de la api(ejemplo-> UTC+04:00).
        //Toma el 0 y el 4 que son los que cambian, e indican la diferencia horaria
        const diferenciaHoraria = parseInt(zonaHoraria.slice(4, 6));
        const diferenciaMin = parseInt(zonaHoraria.slice(7, 9))
    
        //Aca tomamos las horas de fechaHora, y las pasamos a UTC, es decir, al que seria la hora "Neutra", asi podemos aplicar la diferencia horaria que tomamos antes
        const horaUTC = fechaHora.getUTCHours();
        const minutosUTC = fechaHora.getUTCMinutes();
        const segundosUTC = fechaHora.getUTCSeconds();
        
        //Aplicamos la diferencia horaria
        let nuevaHora = ''
        let nuevosMin = ''
        
        if (zonaHoraria[3] === '+') {
            nuevaHora = horaUTC + diferenciaHoraria;
            nuevosMin = minutosUTC + diferenciaMin;
        } else {
            nuevaHora = horaUTC - diferenciaHoraria;
            nuevosMin = minutosUTC - diferenciaMin;
        }
        
    //Creamos una nueva hora pero seteandola con la hora cambiada
    let nuevaFechaHora = new Date(fechaHora);
    nuevaFechaHora.setUTCHours(nuevaHora, nuevosMin, segundosUTC);

    //y aca gaurdamos de nuevo las horas, minutos y segundos en variables para despues poder agregarle un 0 si es un solo digito, para que 
    //siga con el formato hh:mm:ss
    let horas = nuevaFechaHora.getUTCHours();
    let minutos = nuevaFechaHora.getUTCMinutes();
    let segundos = nuevaFechaHora.getUTCSeconds();

    if (horas < 10) { horas = "0" + horas; }
    if (minutos < 10) { minutos = "0" + minutos; }
    if (segundos < 10) { segundos = "0" + segundos; }

    //al final retornamo todo concatenado
    return horas + ":" + minutos + ":" + segundos;
}