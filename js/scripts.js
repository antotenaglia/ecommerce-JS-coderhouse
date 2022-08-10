
let objetosAcomprar = [
    {id: 1, tipo: "Smelly cat", marca: "Friends", precio: 125, imagen:'../images/Smelly-cat.jpg'},
    {id: 2, tipo: "Logo", marca: "Coldplay", precio: 56, imagen:'../images/Logo-coldplay.jpg'},
    {id: 3, tipo: "London Baby", marca: "Friends", precio: 48, imagen:'../images/London-baby.jpg'},
    {id: 4, tipo: "Paradise", marca: "Coldplay", precio: 100, imagen:'../images/Paradise.jpg'},
];


//accede a elementos guardados en el Storage. Se pone al inicio porque se debe ejecutar primero. 
let carrito = JSON.parse(localStorage.getItem('carrito')) ?? []; //si no hay nada en el carrito, es decir es null, ejecuta la segunda operación


//Teniendo datos del carrito, es posible obtener precioTotal y carrito.length sin tener que traerlo del storage
let precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0); 
document.querySelector('.acumuladorCarrito').innerHTML = carrito.length; //muestra N° productos en el botón del carrito


//por cada producto, hace una card desde JS y genera la función agregarAlCarrito al hacer click sobre botón, identificado por el id del producto
function creacionCards () {
    objetosAcomprar.forEach((producto) => {
        const idButton = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto 
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
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" id="${idButton}">Agregar al carrito</a></div> 
                    </div>
                </div>
            </div>`;
    })
    objetosAcomprar.forEach((producto) => {
        const idButton = `btnAgregarAlCarrito ${producto.id}` //crea un id único para cada producto 
        document.getElementById(idButton).onclick = () => { //accede al id y cada vez que se hace click sobre el botón Agregar al carrito realiza lo siguiente:
            carrito.push(producto); //envía el producto al carrito
            localStorage.setItem('carrito', JSON.stringify(carrito)); //almacena carrito en el storage
            document.querySelector('.acumuladorCarrito').innerHTML = carrito.length //muestra N° productos en el carrito 
            precioTotal = carrito.reduce((total, producto) => total + producto.precio, 0); //calcula precio total acumulado 
        } 
    })
}


//muestra todos los productos agregados al carrito al hacer click en botón Carrito
//FALTA: agregar precio total, calcular cuotas, darle funcionalidad a botón borrar producto, ver mejor forma de mostrar el carrito sin borrar HTML, ya que sale de la pág ppal
function mostrarCarrito () {
    document.querySelector('.btnMostrarCarrito').onclick = () => { 
        document.querySelector('.body').textContent = ''; //borra toda la información del HTML
        document.querySelector('.body').innerHTML += //crea tabla dentro del HTML
            `<table class="table">
            <thead>
            <tr>
                <th scope="col">PRODUCTO</th>
                <th scope="col">PRECIO</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr> 
            <thead>
            <tbody class="tbodyTable">
            </tbody>
            </table>`
        carrito.forEach((producto) => { //muestra productos en una tabla
            document.querySelector('.tbodyTable').innerHTML +=
            `<tr>
                <td>Sticker ${producto.tipo} ${producto.marca} </td>
                <td>$${producto.precio}</td>
                <td><img src="${producto.imagen}" style= "width:100px"></td>
                <td><button class="btn btn-outline-dark"> Borrar producto </button></td>
            </tr>
            `;                    
        })
    }
}

creacionCards ();
mostrarCarrito ();






