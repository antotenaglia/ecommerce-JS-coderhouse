
let objetosAcomprar = [
    {tipo: "Smelly cat", marca: "Friends", precio: 125, imagen:'../images/Smelly-cat.jpg'},
    {tipo: "Logo", marca: "Coldplay", precio: 56, imagen:'../images/Logo-coldplay.jpg'},
    {tipo: "London Baby", marca: "Friends", precio: 48, imagen:'../images/London-baby.jpg'},
    {tipo: "Paradise", marca: "Coldplay", precio: 100, imagen:'../images/Paradise.jpg'},
]; // array compuesto por Objetos de cuatro parámetros


//por cada producto, hago una card desde JS
function creacionCards () {
    objetosAcomprar.forEach((producto) => {
        document.querySelector('.sectionCard').innerHTML += 
            `<div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src= ${producto.imagen} alt="imagen"/>
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder"> ${producto.tipo} - ${producto.marca}</h5>
                            <h6>$ ${producto.precio}</h6>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btnCarrito btn-outline-dark mt-auto" href="#">Agregar al carrito</a></div>
                    </div>
                </div>
            </div>`;
    })
}

//calcula el valor de cada cuota y lo muestra en el HTML
let numeroCuotas = 0;
function calcularCuotas () {
    do {
        numeroCuotas = parseFloat(prompt('Ingrese número de cuotas con que desea realizar el pago'));
        if (isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1)) {
            alert('Los datos ingresados no son válidos, inténtelo de nuevo')
        }
    } while (isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1));
    let precioTotal = objetosAcomprar.reduce((total, elemento) => total + elemento.precio, 0); // aplico función de orden superior
    let resultadoCuota = precioTotal/numeroCuotas;
    let parrafoPrecioFinal = document.createElement('div');
    parrafoPrecioFinal.innerHTML = `<p class="text-center pb-4 fw-bolder">${numeroCuotas} cuotas de: $${resultadoCuota}</p>`
    document.body.children[2].prepend(parrafoPrecioFinal); //informa valor de cada cuota antes del section
}

// comienzo del programa
creacionCards ();
let btnCuotas = document.querySelector('.btnCuotas'); 
btnCuotas.onclick = () => {calcularCuotas()}; // EVENTO al hacer click sobre botón





