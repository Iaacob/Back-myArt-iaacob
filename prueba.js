let fecha = new Date;
fecha = fecha.getUTCFullYear() + '-' +
('00' + (fecha.getUTCMonth()+1)).slice(-2) + '-' +
('00' + fecha.getUTCDate()).slice(-2) + ' ' + 
('00' + (fecha.getHours())).slice(-2) + ':' + 
('00' + fecha.getUTCMinutes()).slice(-2) + ':' + 
('00' + fecha.getUTCSeconds()).slice(-2);
console.log(fecha);


const horaActual = new Date();
console.log('esta es la fecha',horaActual.getHours());


// if(array.includes(objeto,0)){
//     console.log('lo incluye')
// }
// else{
//     console.log('no lo incluye')
// }

