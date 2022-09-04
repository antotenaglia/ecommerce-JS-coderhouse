//accede a elementos guardados en el Storage. Primero parsea de JSON a JS.
let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [] //si no hay nada en el carrito, es decir es null, ejecuta la segunda operación. Es necesario hacerlo ya que sino la primer vez que se ingresa se genera error porque no está definido carrito 
let repetidos = JSON.parse(localStorage.getItem('repetidos')) ?? [] //si no hay nada en repetidos, es decir es null, ejecuta la segunda operación. 
let precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0) //teniendo datos del carrito y de repetidos, es posible obtener precioTotal y length sin tener que traerlo del storage
document.querySelector('.acumuladorCarrito').innerHTML = carrito.length + repetidos.length //muestra N° productos en el botón del carrito


//crea cards de todos los productos del carrito
function creacionCards () {
    fetch('../productos.json') //petición a un archivo local
        .then((response) => response.json())
        .then((objetosAcomprar) => { 
            objetosAcomprar.forEach((producto) => { //por cada producto, hace una card desde JS                
                const idButtonAgregar = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto 
                document.querySelector('.sectionCard').innerHTML += 
                    `<div class="col mb-5 ${producto.marca}">
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
                    </div>`
            })
        })
}


//agrega productos al carrito al hacer click sobre botón
function agregarProductosAlCarrito () {
    fetch('../productos.json') //petición a un archivo local
        .then((response) => response.json())
        .then((objetosAcomprar) => { 
            objetosAcomprar.forEach((producto) => {
                let carritoActual = JSON.parse(localStorage.getItem('carrito'))
                if (carritoActual) {
                    stockCarrito = carritoActual.filter(elem => elem.id === producto.id)[0]?.stock
                    if (typeof stockCarrito !== 'undefined') {
                        producto.stock = stockCarrito
                    }
                }  
                const idButtonAgregar = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto a agregar
                document.getElementById(idButtonAgregar).onclick = () => { //accede al id y cada vez que se hace click sobre el botón Agregar al carrito realiza lo siguiente:
                    if (producto.stock > 0) { //verifica que haya stock del producto
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Producto agregado al Carrito',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        if (carrito.length != 0) {
                            let repetido = carrito.find ((el) => el.id == producto.id) //busca si el producto a agregar ya se encuentra en el carrito, mediante su id
                            repetido ?? carrito.push(producto) //si el producto no se encuentra en el carrito, lo agrega
                            repetido ?? (producto.stock = (producto.stock - 1)) // si el producto no se encuentra en el carrito, actualiza valor de stock
                            if (repetido ?? false) { //si hay un producto repetido, lo agrega al carrito de repetidos
                                producto.stock = (producto.stock - 1) //actualiza valor de stock
                                repetidos.push(producto)
                                index = carrito.findIndex(elem => elem.id === producto.id)
                                carrito[index].stock = producto.stock
                            }
                        } else {
                            producto.stock = (producto.stock -1) //actualiza valor de stock
                            carrito.push(producto) //si el carrito está vacío, lo agrega al carrito 
                        }
                        localStorage.setItem('carrito', JSON.stringify(carrito)) //almacena carrito en el storage, en forma de texto JSON
                        localStorage.setItem('repetidos', JSON.stringify(repetidos)) //almacena repetidos en el storage, en forma de texto JSON
                        document.querySelector('.acumuladorCarrito').innerHTML = carrito.length + repetidos.length //muestra N° productos en el carrito 
                        precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0) //calcula precio total acumulado 
                    } else {
                        Swal.fire('Lo sentimos, en este momento no disponemos de stock') //si no hay stock, alerta que ya no hay más productos
                    }
                }
            })
        })
}


//muestra las cards en función de la categoría seleccionada
function seleccionCategorías () {

    document.querySelector("#idTodosLosProductos").onclick = () => {
        eachElement(".Coldplay", (e) => e.classList.remove("d-none"));
        eachElement(".Friends", (e) => e.classList.remove("d-none"));
    }

    document.querySelector('#idCategoriaColdplay').onclick = () => {
        eachElement(".Coldplay", (e) => e.classList.remove("d-none"));
        eachElement(".Friends", (e) => e.classList.add("d-none"));
    }

    document.querySelector('#idCategoriaFriends').onclick = () => { 
        eachElement(".Coldplay", (e) => e.classList.add("d-none"));
        eachElement(".Friends", (e) => e.classList.remove("d-none"));
    }
}

const eachElement = (selector, fn) => {
    for (let e of document.querySelectorAll(selector)) {
      fn(e);
    }
  };


//muestra todos los productos agregados al carrito 
function mostrarCarrito () {
    document.querySelector('.body').textContent = '' //borra toda la información del body
    document.querySelector('.body').innerHTML = //crea tabla con productos dentro del body, el botón para seguir comprando y el botón calcular cuotas
        `<h1 class="text-center my-5">Carrito de Compras</h1> 
        <table class="table">
        <thead>
            <tr>
            <th scope="col" class="text-center">PRODUCTO</th>
            <th scope="col" class="text-center">PRECIO UNITARIO</th>
            <th scope="col" class="text-center">CANTIDAD</th>
            <th scope="col"></th>
            <th scope="col" class="text-center">SUBTOTAL</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody class="tbodyTable">
        </tbody>
        </table>
        <h2 class="precioTotal text-center mt-5 mb-3">Total del pedido: $${precioTotal}</h2>
        <div class="text-center"><button class="btn btnCalcularCuotas btn-outline-dark my-3"> Calcular cuotas - Hasta 3 cuotas s/interés </button> </div>
        <div class="tablaCuotas"></div>
        <div class="text-center"><a href="../index.html"><button class="btn btn-dark my-3 me-2"> <   Seguir comprando </button></a> <button class="btn btnFinalizarCompra btn-success my-3 ms-2"> FINALIZAR COMPRA </button></div>
        <div class="text-center"><button class="btn btnLimpiarCarrito btn-outline-dark my-3"> Limpiar carrito de Compras </button></div>`
    carrito.forEach((producto) => { //muestra productos en una tabla
        const idProductoCarrito = `idProductoCarrito ${producto.id}`//crea un id único para cada producto del carrito
        const idCantidad = `idCantidad ${producto.id}` //crea un id único para la cantidad de cada producto
        const idSubtotal = `idSubtotal ${producto.id}` //crea un id único para el subtotal de cada producto
        const idButtonBorrar = `btnBorrarProducto ${producto.id}` //crea un id único para cada producto a borrar
        const idButtonActualizar = `idButtonActualizar ${producto.id}` //crea un id único para cada producto que se desea actualizar cantidad
        const idInputActualizar = `idInputActualizar ${producto.id}` //crea un id único para cada producto que se desea actualizar cantidad
        document.querySelector('.tbodyTable').innerHTML +=
            `<tr id="${idProductoCarrito}">
                <td class="text-center align-middle">Sticker ${producto.tipo} - ${producto.marca}</td>
                <td class="text-center align-middle">$${producto.precio}</td>
                <td class="text-center align-middle" id="${idCantidad}"><input id="${idInputActualizar}" type="text" placeholder="1" class="text-center" style="width: 60px" /></td> 
                <td class="text-center align-middle"><button class="btn btn-outline-dark" id="${idButtonActualizar}"> Actualizar </button></td>
                <td class="text-center align-middle" id="${idSubtotal}">$${producto.precio}</td>
                <td class="text-center"><img src="${producto.imagen}" style= "width:100px"></td>
                <td class="text-center align-middle"><button class="btn btn-outline-dark" id="${idButtonBorrar}"> Borrar producto </button></td>
            </tr>`  
    })
    if (repetidos.length != 0) { //los productos repetidos no los muestra en el carrito, sino que actualiza precio y cantidad en el producto que ya se encuentra en el carrito
        carrito.forEach((producto) => {  
            const idCantidad = `idCantidad ${producto.id}`
            const idSubtotal = `idSubtotal ${producto.id}`
            let acumulador = 1
            repetidos.forEach((repetido) => { //recorre todo el array de repetidos para identificar la cantidad de repetidos
                if (producto.id == repetido.id) {
                    acumulador = acumulador + 1 
                }
            })
            document.getElementById(idCantidad).innerHTML = `<input type="text" placeholder="${acumulador}" class="text-center" style="width: 60px"></td>`
            document.getElementById(idSubtotal).innerHTML = `$${acumulador*producto.precio}`
        })
    }
    borrarProductos ()
    mostrarCuotas ()   
    limpiarCarrito ()   
    iniciarSesion ()    
    actualizarCantidad ()   
}


//borra productos del carrito
function borrarProductos () {
    carrito.forEach((producto) => {
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
                    let indexBorrarCarrito = carrito.findIndex(arrayItem => arrayItem.id == producto.id) //busca el índice del producto que se desea borrar dentro del carrito 
                    if (indexBorrarCarrito != -1) {
                        carrito.splice(indexBorrarCarrito,1) //borra producto del carrito
                        localStorage.setItem('carrito', JSON.stringify(carrito)) //almacena carrito en el storage, sin el producto eliminado, en forma de texto JSON
                        document.getElementById(idProductoCarrito).remove() //deja de mostrar el producto en el carrito
                    }
                    let repetidosLength = repetidos.length
                    for (let i = 1; i <= repetidosLength; i++) {
                        let indexBorrarRepetidos = repetidos.findIndex(arrayItem => arrayItem.id == producto.id) //busca el índice del producto que se desea borrar dentro de repetidos 
                        if (indexBorrarRepetidos != -1) {
                            repetidos.splice(indexBorrarRepetidos,1) //borra producto de repetidos
                            localStorage.setItem('repetidos', JSON.stringify(repetidos)) //almacena repetidos en el storage, sin el producto eliminado, en forma de texto JSON
                        }
                    } 
                    let precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0) //actualiza precio total acumulado   
                    document.querySelector('.precioTotal').innerHTML = `Total del pedido: $${precioTotal}` //muestra valor actualizado del precio total
                    document.querySelector('.tablaCuotas').innerHTML = '' // deja de mostrar la tabla de cuotas si ya estaba siendo mostrada
                    mostrarCuotas ()
                    if (carrito.length == 0) {
                        noMostrarCarrito()
                    }
                }
            }) 
        } 
    })
}


// calcula valor de cuotas sobre precio total
function mostrarCuotas () {
    let precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0)
    document.querySelector('.btnCalcularCuotas').onclick = () => { 
        document.querySelector('.tablaCuotas').innerHTML = //crea tabla para mostrar valores de cuotas
            `<table class="Cuotas mx-auto mb-5">
            <tbody class="tbodyCuotas">
            </tbody>
            </table>`
        for (let i = 1; i <= 3; i++) { //calcula valor de cuotas
            document.querySelector('.tbodyCuotas').innerHTML +=
            `<tr>
                <td class="text-center">${i} cuota/s sin interés de $${(precioTotal/i).toFixed(1)} </td>
            </tr>`
        }  
    }
}


//borra todos los productos del carrito
function limpiarCarrito () {
    document.querySelector('.btnLimpiarCarrito').onclick = () => { 
        Swal.fire({ //consulta si está seguro de borrar todos los productos del carrito - librería sweetalert
            title: '¿Está seguro de borrar todos los productos del carrito de Compras?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, limpiar carrito de Compras'
        }).then((result) => {   
            if (result.isConfirmed) {
                let carritoLength = carrito.length
                carrito.splice(0, (carritoLength-1))
                let repetidosLength = repetidos.length
                if (repetidos.length != 0) {
                    repetidos.splice(0, (repetidosLength-1))
                }
                localStorage.clear()
                noMostrarCarrito()
            }
        })
    }
}


//pide iniciar sesión para finalizar la compra
function iniciarSesion () {
    document.querySelector('.btnFinalizarCompra').onclick = () => { 
        Swal.fire(
            'Iniciar Sesión',
            'Inicie sesión para continuar con la Compra',
            'info'
          )
    }
}


//actualiza cantidad de productos desde el carrito, cuando el cliente desea hacerlo con el teclado
function actualizarCantidad () {
    carrito.forEach((producto) => {
        const idButtonActualizar = `idButtonActualizar ${producto.id}` 
        const idCantidad = `idCantidad ${producto.id}` 
        document.getElementById(idButtonActualizar).onclick = () => { 
            let nuevaCantidad = document.getElementById(idCantidad).firstChild.value //guarda valor agregado por el cliente
            let repetidosFilter = repetidos.filter(elem => elem.id == producto.id) //genera un nuevo array con los productos que se encuentran dentro de repetidos y que tienen el mismo id del producto que se quiere actualizar valor 
            let cantidadAnterior = repetidosFilter.length + 1 //este valor es el que se encontraba previamente en el input de cantidad
            if ((nuevaCantidad >= 1) && (nuevaCantidad != cantidadAnterior)) { //verifica que el numero ingresado sea distinto un número positivo y diferente del que ya se encuentra agregado; caso contrario no ejecuta ninguna acción
                if ((nuevaCantidad > cantidadAnterior) && ((nuevaCantidad - cantidadAnterior) <= producto.stock)) { //verifica que haya producto en el stock, por si agrega un número mayor al stock
                    for (let i = 1; i <= (nuevaCantidad - cantidadAnterior); i++) { //envía a repetidos todos los productos nuevos agregados
                        producto.stock = producto.stock - (nuevaCantidad - cantidadAnterior) //actualiza valor de stock
                        repetidos.push(producto)
                        index = carrito.findIndex(elem => elem.id === producto.id)
                        carrito[index].stock = producto.stock
                    } 
                    actualizarSubtotal(producto, nuevaCantidad) 
                } else if (nuevaCantidad > cantidadAnterior){
                    Swal.fire('Lo sentimos, en este momento no disponemos de stock') //si no hay stock, alerta que ya no hay más productos
                }
            if (nuevaCantidad < cantidadAnterior) { //borra de repetidos los productos que no desea
                for (let i = 1; i <= (cantidadAnterior - nuevaCantidad); i++) { 
                    producto.stock = producto.stock + (cantidadAnterior - nuevaCantidad) //actualiza valor de stock
                    let indexBorrarRepetidos = repetidos.findIndex(arrayItem => arrayItem.id == producto.id) //busca el índice del producto que se borrará de repetidos 
                    repetidos.splice(indexBorrarRepetidos,1)
                    index = carrito.findIndex(elem => elem.id === producto.id)
                    carrito[index].stock = producto.stock
                }
                actualizarSubtotal(producto, nuevaCantidad) 
            }        
             
        } 
        }       
    })
}


function actualizarSubtotal(producto, nuevaCantidad){
    const idSubtotal = `idSubtotal ${producto.id}`
    localStorage.setItem('repetidos', JSON.stringify(repetidos)) //almacena repetidos en el storage, en forma de texto JSON
    localStorage.setItem('carrito', JSON.stringify(carrito))
    document.getElementById(idSubtotal).innerHTML = `$${nuevaCantidad*producto.precio}`
    let precioTotal = carrito.reduce((totalCarrito, producto) => totalCarrito + producto.precio, 0) + repetidos.reduce((totalRepetidos, repetidos) => totalRepetidos + repetidos.precio, 0) //actualiza precio total acumulado 
    document.querySelector('.precioTotal').innerHTML = `Total del pedido: $${precioTotal}` //muestra valor actualizado del precio total                
    mostrarCuotas () 
}


//genera una pantalla vacía sin productos, con posibilidad de volver al inicio
function noMostrarCarrito () {
    document.querySelector('.body').textContent = '' //borra toda la información del body
    document.querySelector('.body').innerHTML =
        `<h1 class="mt-5 text-center">No hay productos en el Carrito de Compras</h1>
        <a href="../index.html"><button class="position-relative my-5 top-50 start-50 translate-middle btn btn-outline-dark"> Volver al Inicio </button></td><a>` //botón volver al inicio  
    }


//comienzo del programa
creacionCards ()
agregarProductosAlCarrito ()
seleccionCategorías ()
//al hacer click sobre botón Carrito, muestra o no muestra productos
document.querySelector('.btnMostrarCarrito').onclick = () => {
    (carrito.length !== 0) ? mostrarCarrito () : noMostrarCarrito () //operador avanzado: dos funciones diferentes según haya o no productos en el carrito
}




