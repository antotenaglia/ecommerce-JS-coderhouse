let valorProducto = "";
let numeroCuotas = "";

do {
    valorProducto = prompt("Ingrese valor en pesos del producto");
    numeroCuotas = parseFloat(prompt("Ingrese número de cuotas con que desea realizar el pago"));
    console.log(numeroCuotas);
    if (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1)) {
        alert("Los datos ingresados no son válidos, inténtelo de nuevo")
    }
} while (isNaN(valorProducto) || isNaN(numeroCuotas) || !Number.isInteger(numeroCuotas) || (numeroCuotas < 1));

function calcularCuotas () {
    if ((valorProducto > 0) && (numeroCuotas > 0)) {
        for (let i = 1; i <= numeroCuotas; i++) {
           let resultado = valorProducto/i;
           alert(i + " cuota/s sin interés de " + resultado);
        }  
    }
}

alert("Usted puede abonar en:");
calcularCuotas(); 
