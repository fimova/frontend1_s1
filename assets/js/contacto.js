document.addEventListener ("DOMContentLoaded", () => {

    //evento de submit form
    const formulario = document.querySelector("#formContacto");
    const mensajeFormulario = document.querySelector("#mensajeFormulario");

    if (formulario && mensajeFormulario) {

        // esta es la funcion que se ejecutará cuando se intente enviar el formulario
        formulario.addEventListener("submit", (evento) => {

            // preventDefault evita que el formulario haga su comportamiento normal de enviar y recargar la página
            evento.preventDefault();

            mensajeFormulario.textContent =
                "¡Mensaje enviado correctamente!";

            formulario.reset();

        });
    }


});