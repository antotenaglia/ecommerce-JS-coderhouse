
// inicia programa consultando si cliente desea comprar algo
let respuestaInicial = '';
const objetosAcomprar = []; // array compuesto por objetos
function compraInicial () {
    respuestaInicial = (prompt('¿Desea comprar algo? si / no'));
    if (respuestaInicial == 'si') {
        const producto = {tipo: prompt('Ingrese tipo de producto que desea comprar'), marca: prompt('Ingrese marca del producto')};
        objetosAcomprar.push(producto); // agrego nuevo objeto a un array
    }
    else {
        alert('Gracias por su visita, vuelta pronto')
    }
}

// continúa consultando si desea comprar, hasta que el cliente decida que no
let respuestaAgregar = '';
function comprasPosteriores () {
    respuestaAgregar = (prompt('¿Desea agregar algo más? si / no'));
    while (respuestaAgregar == 'si') {
        const producto = {tipo: prompt('Ingrese tipo de producto que desea agregar'), marca: prompt('Ingrese marca del producto')};
        objetosAcomprar.push(producto); // agrego nuevo objeto a un array
        respuestaAgregar = prompt('¿Desea agregar algo más? si / no');
    }
}

// en caso de arrepentirse, el cliente puede borrar algún producto
function borrarProductos () {
    let respuestaBorrar = prompt('¿Desea borrar algún producto? si / no');
    while (respuestaBorrar == 'si' && (objetosAcomprar.length > 0)) {
        alert ('Por favor, indique el número del producto que desea borrar');
        for (let i = 0; i < objetosAcomprar.length; i++) {
            alert((i + 1) + '. ' + objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca);
        }
        let objetoAborrar = prompt('El número del producto a borrar es:');
        objetosAcomprar.splice((objetoAborrar - 1), 1); // borro objeto del array
        if (objetosAcomprar.length > 0) {
            respuestaBorrar = prompt('¿Desea borrar algun otro producto? si / no');
        }  
        if (objetosAcomprar.length == 0) {
            alert('No quedan más productos por comprar, esperamos que vuelva pronto');
        }
    }
}      

// sobre los productos que desea comprar, pide al cliente precio y número de cuotas
let valorProducto = '';
let numeroCuotas = '';
function pedirDatosParaCalcularCuotas () {
    do {
        valorProducto = prompt('Ingrese valor en pesos: ');
        numeroCuotas = parseFloat(prompt('Ingrese número de cuotas con que desea realizar el pago'));
        if (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1)) {
            alert('Los datos ingresados no son válidos, inténtelo de nuevo')
        }
    } while (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1));
}

// sobre los productos que desea comprar, calcula valor de cada cuota y lo muestra
function calcularCuotas () {
    if ((valorProducto > 0) && (numeroCuotas > 0)) {
        for (let i = 1; i <= numeroCuotas; i++) {
           let resultado = valorProducto/i;
           alert(i + ' cuota/s sin interés de ' + resultado);
        }  
    }
}

// comienzo del programa
compraInicial();
if (respuestaInicial == 'si') {
    comprasPosteriores ();
    console.log(objetosAcomprar);
    borrarProductos();
    console.log(objetosAcomprar);
    for (let i = 0; i < objetosAcomprar.length; i++) { 
        alert ('Para el producto: '+ objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca)
        pedirDatosParaCalcularCuotas();
        alert("Usted puede abonar en:");
        calcularCuotas(); 
    }
}

