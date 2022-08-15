// let fecha = new Date;
// fecha = fecha.getUTCFullYear() + '-' +
// ('00' + (fecha.getUTCMonth()+1)).slice(-2) + '-' +
// ('00' + fecha.getUTCDate()).slice(-2) + ' ' + 
// ('00' + (fecha.getUTCHours()-3)).slice(-2) + ':' + 
// ('00' + fecha.getUTCMinutes()).slice(-2) + ':' + 
// ('00' + fecha.getUTCSeconds()).slice(-2);
// console.log(fecha);

const objeto = {
    "Id": 2,
    "name": "matias"
}

const array = [
    {
        "Id": 1,
        "name": 'juan',  
    },
    {
        "Id": 2,
        "name": "matias"  
    },
    {
        "Id": 3,
        "name": "tomas"  
    }
]

console.log('este es el objeto: ',objeto)
console.log('este es el array: ',array)

for(let i = 0; i < array.length; i++) {
    if (array[i].name== objeto.name) {
          console.log("hay Like");
        break;
    }
}



// if(array.includes(objeto,0)){
//     console.log('lo incluye')
// }
// else{
//     console.log('no lo incluye')
// }

