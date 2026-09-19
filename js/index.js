document.addEventListener("DOMContentLoaded", () => {

    // mensaje por consola para indicar que el DOM ya fue cargado
    console.log("DOM cargado correctamente");

    //querySelecto selecciona un id y una clase y se guardan en una constante
    const botonPago = document.querySelector("#btnPago");
    const notaPago = document.querySelector(".nota-pago");

    //evento al hacer click, se ocultará la información de los métodos de pago
    if (botonPago && notaPago) {

        botonPago.addEventListener("click", () => {

            notaPago.classList.toggle("oculto");

            if (notaPago.classList.contains("oculto")) {
                botonPago.textContent="Mostrar información sobre métodos de pago";
            } else {
                botonPago.textContent="Ocultar información sobre métodos de pago";
            }

        });

    }
    
});