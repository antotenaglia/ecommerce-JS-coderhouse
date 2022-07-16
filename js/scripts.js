let valorProducto = "";
let numeroCuotas = "";

const producto1 = {tipo: 'zapatillas', marca: 'adidas'};
const producto2 = {tipo: 'remera', marca: 'nike'};
// creo un array de 2 objetos
const objetosAcomprar = [producto1, producto2];

function pedirDatosParaCalcularCuotas () {
    do {
        valorProducto = prompt('Ingrese valor en pesos: ');
        numeroCuotas = parseFloat(prompt('Ingrese número de cuotas con que desea realizar el pago'));
        if (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1)) {
            alert('Los datos ingresados no son válidos, inténtelo de nuevo')
        }
    } while (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1));
}

function calcularCuotas () {
    if ((valorProducto > 0) && (numeroCuotas > 0)) {
        for (let i = 1; i <= numeroCuotas; i++) {
           let resultado = valorProducto/i;
           alert(i + ' cuota/s sin interés de ' + resultado);
        }  
    }
}

alert('Usted va a comprar: ');
let mensaje = '';
for (let i = 0; i < objetosAcomprar.length; i++) { // aplico metodo length
    mensaje = mensaje + objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca;
    if(i < objetosAcomprar.length - 1){
        mensaje = mensaje + ' y ';
    }
}
alert(mensaje);

let respuesta = (prompt('¿Desea comprar algo más? si / no'));
if (respuesta == 'si') {
    const producto3 = {tipo: prompt('Ingrese tipo de producto que desea agregar'), marca: prompt('Ingrese marca del producto')};
    objetosAcomprar.push(producto3); // agrego nuevo objeto a un array
}

for (let i= 0; i < objetosAcomprar.length; i++) { 
    alert ('Para el producto: '+ objetosAcomprar[i].tipo + ' ' + objetosAcomprar[i].marca)
    pedirDatosParaCalcularCuotas();
    alert("Usted puede abonar en:");
    calcularCuotas(); 
}

