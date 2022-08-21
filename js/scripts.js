//accede a elementos guardados en el Storage. Primero parsea de JSON a JS.
let carrito = JSON.parse(localStorage.getItem('carrito')) ?? []; //si no hay nada en el carrito, es decir es null, ejecuta la segunda operación. Es necesario hacerlo ya que sino la primer vez que se ingresa se genera error porque no está definido carrito 
let repetidos = JSON.parse(localStorage.getItem('repetidos')) ?? []; //si no hay nada en repetidos, es decir es null, ejecuta la segunda operación. 

//teniendo datos del carrito y de repetidos, es posible obtener precioTotal y length sin tener que traerlo del storage
let precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0);
document.querySelector('.acumuladorCarrito').innerHTML = carrito.length + repetidos.length; //muestra N° productos en el botón del carrito

//crea cards de todos los productos del carrito
function creacionCards () {
    fetch('../productos.json') //peticion a un archivo local
        .then((response) => response.json())
        .then((objetosAcomprar) => { 
            //por cada producto, hace una card desde JS
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
            //agrega productos al carrito al hacer click sobre botón
            objetosAcomprar.forEach((producto) => {
                const idButtonAgregar = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto a agregar
                document.getElementById(idButtonAgregar).onclick = () => { //accede al id y cada vez que se hace click sobre el botón Agregar al carrito realiza lo siguiente:
                    if (carrito.length != 0) {
                        let repetido = carrito.find ((el) => el.id == producto.id) //busca si el producto a agregar ya se encuentra en el carrito, mediante su id
                        repetido ?? carrito.push(producto) //si el producto no se encuentra en el carrito, lo agrega
                        if (repetido ?? false) { //si hay un producto repetido, lo agrega al carrito de repetidos
                            repetidos.push(producto);
                        }
                    } else {
                        carrito.push(producto); //si el carrito está vacío, lo agrega al carrito 
                    }
                    localStorage.setItem('carrito', JSON.stringify(carrito)); //almacena carrito en el storage, en forma de texto JSON
                    localStorage.setItem('repetidos', JSON.stringify(repetidos)); //almacena repetidos en el storage, en forma de texto JSON
                    document.querySelector('.acumuladorCarrito').innerHTML = carrito.length + repetidos.length; //muestra N° productos en el carrito 
                    precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0); //calcula precio total acumulado 
                } 
            })
        })
}


//muestra todos los productos agregados al carrito 
//FALTA: darle funcionalidad a botón borrar producto y borrar productos duplicados, para que aparezcan en un acumulador
function mostrarCarrito () {
    document.querySelector('.body').textContent = ''; //borra toda la información del body
    document.querySelector('.body').innerHTML = //crea tabla con productos dentro del body, el botón para seguir comprando y el botón calcular cuotas
        `<h1 class="text-center my-5">Carrito de Compras</h1> 
        <table class="table">
        <thead>
            <tr>
            <th scope="col" class="text-center">PRODUCTO</th>
            <th scope="col" class="text-center">CANTIDAD</th>
            <th scope="col" class="text-center">SUBTOTAL</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody class="tbodyTable">
        </tbody>
        </table>
        <h2 class="text-center my-5">Total del pedido: $${precioTotal}</h2>
        <div><a href="../index.html"><button class="btn btn-dark position-relative my-3 top-50 start-50 translate-middle"> <   Seguir comprando </button></a></div>
        <button class="btn btnCalcularCuotas btn-outline-dark position-relative my-3 top-50 start-50 translate-middle"> Calcular cuotas - Hasta 3 cuotas s/interés </button></td>
        <div class="tablaCuotas"></div>`;
    carrito.forEach((producto) => { //muestra productos en una tabla
        const idCantidad = `idCantidad ${producto.id}` //crea un id único para la cantidad de cada producto
        const idSubtotal = `idSubtotal ${producto.id}` //crea un id único para el subtotal de cada producto
        const idButtonBorrar = `btnBorrarProducto ${producto.id}` //crea un id único para cada producto a borrar
        document.querySelector('.tbodyTable').innerHTML +=
            `<tr>
                <td class="text-center align-middle">Sticker ${producto.tipo} - ${producto.marca}</td>
                <td class="text-center align-middle" id="${idCantidad}">1</td>
                <td class="text-center align-middle" id="${idSubtotal}">$${producto.precio}</td>
                <td class="text-center"><img src="${producto.imagen}" style= "width:100px"></td>
                <td class="text-center align-middle"><button class="btn btn-outline-dark" id="${idButtonBorrar}"> Borrar producto </button></td>
            </tr>`;  
    })
    if (repetidos.length != 0) { //por cada producto repetido, acumula la cantidad y el precio en el producto del carrito
        carrito.forEach((producto) => {  
            const idCantidad = `idCantidad ${producto.id}`
            const idSubtotal = `idSubtotal ${producto.id}`
            let acumulador = 1;
            repetidos.forEach((repetido) => { //recorre todo el array de repetidos para identificar la cantidad de repetidos
                if (producto.id == repetido.id) {
                    acumulador = acumulador + 1;
                }
            })
            document.getElementById(idCantidad).innerHTML = `${acumulador}`
            document.getElementById(idSubtotal).innerHTML = `$${acumulador*producto.precio}`
        })
    }
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




