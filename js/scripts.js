
// inicia programa consultando si cliente desea comprar algo
let respuestaInicial = '';
let objetosAcomprar = []; // array compuesto por Objetos de dos parámetros
function compraInicial () {
    respuestaInicial = (prompt('¿Desea comprar algo? si / no'));
    if (respuestaInicial == 'si') {
        const producto = {tipo: prompt('Ingrese tipo de producto que desea comprar'), marca: prompt('Ingrese marca del producto')};
        objetosAcomprar.push(producto); // agrego nuevo Objeto al array
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

// pide al cliente precio y número de cuotas
let valorProducto = 0;
let numeroCuotas = 0;
const preciosDeProductos = []; // array compuesto por valor de los productos a comprar
function pedirDatosParaCalcularCuotas () {
    do {
        valorProducto = parseInt(prompt('Ingrese valor en pesos: '));
        preciosDeProductos.push(valorProducto); // agrego valores de los productos a un array
        numeroCuotas = parseFloat(prompt('Ingrese número de cuotas con que desea realizar el pago'));
        if (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1)) {
            alert('Los datos ingresados no son válidos, inténtelo de nuevo')
        }
    } while (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1));
}

// calcula valor de cada cuota y lo muestra
function calcularCuotas () {
    if ((valorProducto > 0) && (numeroCuotas > 0)) {
        for (let i = 1; i <= numeroCuotas; i++) {
           let resultado = valorProducto/i;
           alert(i + ' cuota/s sin interés de ' + resultado);
        }  
    }
}

// sobre los productos que desea comprar, calcula costo final. Sólo lo hace si hay productos en el array
let precioTotal = 0;
function calculoPrecioTotal () {
    if (objetosAcomprar.length != 0) {
        precioTotal = preciosDeProductos.reduce((total, elemento) => total + elemento, 0); // aplico función de orden superior
        alert ('El costo total de los productos a comprar es de: ' + precioTotal);
    }
}

// sobre los productos que desea comprar, los agrega al HTML y pone precio final en un párrafo. Sólo lo hace si hay productos en el array
function interactuoConHTML () {
    if (objetosAcomprar.length != 0) {
        let tarjeta = document.querySelectorAll('.card');
        for (let i = 0; i < (tarjeta.length - objetosAcomprar.length); i++) {
            tarjeta[i].remove();
        } // borra las tarjetas que no se necesitan   
        for (let i = 0; i < objetosAcomprar.length; i++){
            let tipoYmarcaProducto = document.querySelectorAll('h5'); //genera un array compuesto por todos los h5
            let precioProducto = document.querySelectorAll('h6'); //genera un array compuesto por todos los h6
            tipoYmarcaProducto[i].textContent = (objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca); // modifica el texto de cada h5 por el tipo y marca del producto
            precioProducto[i].textContent = ('$ ' + preciosDeProductos[i]); // modifica el texto de cada h6 por el precio del producto
        }
        let parrafoPrecioFinal = document.createElement('div');
        parrafoPrecioFinal.innerHTML = '<p> El costo total de los productos a comprar es de: $'+ precioTotal;'</p>';
        document.body.children[2].prepend(parrafoPrecioFinal); //informa precio final de los productos antes del section
    }
}

// comienzo del programa
compraInicial();
if (respuestaInicial == 'si') {
    comprasPosteriores ();
    console.log(objetosAcomprar);
    borrarProductos();
    console.log(objetosAcomprar);
    // pide precio, número de cuotas, calcula el valor de cada cuota y lo muestra para cada producto a comprar
    for (let i = 0; i < objetosAcomprar.length; i++) { 
        alert ('Para el producto: '+ objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca)
        pedirDatosParaCalcularCuotas();
        alert("Usted puede abonar en:");
        calcularCuotas(); 
    }
    calculoPrecioTotal();
    interactuoConHTML();
}




