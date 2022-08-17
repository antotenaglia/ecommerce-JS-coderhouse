
let objetosAcomprar = [
    {id: 1, tipo: "Smelly cat", marca: "Friends", precio: 125, imagen:'../images/Smelly-cat.jpg'},
    {id: 2, tipo: "Logo", marca: "Coldplay", precio: 56, imagen:'../images/Logo-coldplay.jpg'},
    {id: 3, tipo: "London Baby", marca: "Friends", precio: 48, imagen:'../images/London-baby.jpg'},
    {id: 4, tipo: "Paradise", marca: "Coldplay", precio: 100, imagen:'../images/Paradise.jpg'},
];


//accede a elementos guardados en el Storage. Primero parsea de JSON a JS.
let carrito = JSON.parse(localStorage.getItem('carrito')) ?? []; //operador avanzado: si no hay nada en el carrito, es decir es null, ejecuta la segunda operación. Es necesario hacerlo ya que sino la primer vez que se ingresa se genera error porque no está definido carrito 


//Teniendo datos del carrito, es posible obtener precioTotal y carrito.length sin tener que traerlo del storage
let precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0); 
document.querySelector('.acumuladorCarrito').innerHTML = carrito.length; //muestra N° productos en el botón del carrito


//por cada producto, hace una card desde JS y genera la función agregarAlCarrito al hacer click sobre botón, identificado por el id del producto
function creacionCards () {
    objetosAcomprar.forEach((producto) => {
        const idButtonAgregar = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto 
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" id="${idButtonAgregar}">Agregar al carrito</a></div> 
                    </div>
                </div>
            </div>`;
    })
    objetosAcomprar.forEach((producto) => {
        const idButtonAgregar = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto a agregar
        document.getElementById(idButtonAgregar).onclick = () => { //accede al id y cada vez que se hace click sobre el botón Agregar al carrito realiza lo siguiente:
            carrito.push(producto); //envía el producto al carrito
            localStorage.setItem('carrito', JSON.stringify(carrito)); //almacena carrito en el storage, en forma de texto JSON
            document.querySelector('.acumuladorCarrito').innerHTML = carrito.length //muestra N° productos en el carrito 
            precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0); //calcula precio total acumulado 
        } 
    })
}


//muestra todos los productos agregados al carrito 
//FALTA: darle funcionalidad a botón borrar producto y borrar productos duplicados, para que aparezcan en un acumulador
function mostrarCarrito () {
    document.querySelector('.body').textContent = ''; //borra toda la información del body
    document.querySelector('.body').innerHTML = //crea tabla con productos dentro del body, el botón para seguir comprando y el botón calcular cuotas
        `<h1 class="text-center my-5">Carrito de Compras</h1> 
        <table class="table">
        <tbody class="tbodyTable">
        </tbody>
        </table>
        <h2 class="text-center my-5">Total del pedido: $${precioTotal}</h2>
        <div><a href="../index.html"><button class="btn btn-dark position-relative my-3 top-50 start-50 translate-middle"> <   Seguir comprando </button></a></div>
        <button class="btn btnCalcularCuotas btn-outline-dark position-relative my-3 top-50 start-50 translate-middle"> Calcular cuotas - Hasta 3 cuotas s/interés </button></td>
        <div class="tablaCuotas"></div>`;
    carrito.forEach((producto) => { //muestra productos en una tabla
        const idProductoCarrito = `idProductoCarrito ${producto.id}`//crea un id único para cada producto del carrito
        const idButtonBorrar = `btnBorrarProducto ${producto.id}` //crea un id único para cada producto a borrar
        document.querySelector('.tbodyTable').innerHTML +=
            `<tr id="${idProductoCarrito}">
                <td class="text-center align-middle">Sticker ${producto.tipo} - ${producto.marca} </td>
                <td class="align-middle">$${producto.precio}</td>
                <td><img src="${producto.imagen}" style= "width:100px"></td>
                <td class="align-middle"><button class="btn btn-outline-dark" id="${idButtonBorrar}"> Borrar producto </button></td>
            </tr>`;
    })
    carrito.forEach((producto) => { //borra productos del carrito 
        const idProductoCarrito = `idProductoCarrito ${producto.id}`//crea un id único para cada producto del carrito
        const idButtonBorrar = `btnBorrarProducto ${producto.id}` //crea un id único para cada producto a borrar
        document.getElementById(idButtonBorrar).onclick = () => { //cada vez que se hace click sobre el botón Borrar producto realiza lo siguiente:
            Swal.fire({ //consulta si está seguro de borrar el producto - librería sweetalert
                title: '¿Está seguro de borrar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar producto'
            }).then((result) => {   
                if (result.isConfirmed) {
                    Swal.fire(
                        'Eliminado!',
                        'El producto ha sido eliminado',
                        'success'
                    )
                }
            }) 
        } 
    })  
    document.querySelector('.btnCalcularCuotas').onclick = () => { // calcula valor de cuotas sobre precio total
        document.querySelector('.tablaCuotas').innerHTML = //crea tabla para mostrar valores de cuotas
            `<table class="Cuotas mx-auto mb-5">
            <tbody class="tbodyCuotas">
            </tbody>
            </table>`;
        for (let i = 1; i <= 3; i++) { //calcula valor de cuotas
            document.querySelector('.tbodyCuotas').innerHTML +=
            `<tr>
                <td class="text-center">${i} cuota/s sin interés de $${precioTotal/i} </td>
            </tr>`
        }  
    }             
}


//genera una pantalla vacía sin productos, con posibilidad de volver al inicio
function noMostrarCarrito () {
        document.querySelector('.body').textContent = ''; //borra toda la información del body
        document.querySelector('.body').innerHTML =
            `<h1 class="mt-5 text-center">No hay productos en el Carrito de Compras</h1>;
            <a href="../index.html"><button class="position-relative my-5 top-50 start-50 translate-middle btn btn-outline-dark"> Volver al Inicio </button></td><a>` //botón volver al inicio
}


//comienzo del programa
creacionCards ();
//al hacer click sobre botón Carrito, muestra o no muestra productos
document.querySelector('.btnMostrarCarrito').onclick = () => {
    (carrito.length !== 0) ? mostrarCarrito () : noMostrarCarrito (); //operador avanzado: dos funciones diferentes según haya o no productos en el carrito
}




