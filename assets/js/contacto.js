document.addEventListener ("DOMContentLoaded", () => {

    //evento de submit form
    const formulario = document.querySelector("#formContacto");
    const mensajeFormulario = document.querySelector("#mensajeFormulario");

    if (formulario && mensajeFormulario) {

        /**
         * procesar el envío del formulario de contacto
         * @param {Event} evento - Evento submit del formulario
         */
        // esta es la funcion que se ejecutará cuando se intente enviar el formulario
        formulario.addEventListener("submit", (evento) => {

            // preventDefault evita que el formulario haga su comportamiento normal de enviar y recargar la página
            evento.preventDefault();

            // obtener los valores de los campos
            const nombre = document.querySelector('#nombre').value.trim();
            const correo = document.querySelector('#correo').value.trim();
            const mensaje = document.querySelector("#mensaje").value.trim();

            // =============================
            // VALIDACIONES
            // =============================

            // validar que el nombre no esté vacío
            if (nombre === "") {
                mensajeFormulario.textContent = "Por favor ingrese su nombre";
                mensajeFormulario.className = "mensaje-error";
                return; //detiene la ejecución
            }

            // validar que el nombre tenga al menos 3 caracteres
            if (nombre.length < 3){
                mensajeFormulario.textContent = "El nombre debe tener al menos 3 caracteres";
                mensajeFormulario.className = "mensaje-error";
                return;
            }

            // validar que el correo no esté vacío
            if (correo === "") {
                mensajeFormulario.textContent = "El correo no puede estar vacío";
                mensajeFormulario.className = "mensaje-error";
                return;
            }

            // validar el formato del correo
            const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formatoCorreo.test(correo)) {
                mensajeFormulario.textContent = "Por favor ingrese un correo válido";
                mensajeFormulario.className = "mensaje-error";
                return;
            }

            // validar que el mensaje no esté vacío
            if (mensaje === "") {
                mensajeFormulario.textContent = "Por favor escriba su mensaje";
                mensajeFormulario.className = "mensaje-error";
                return;
            }

            // validar que el mensaje tenga al menos 10 caracteres
            if (mensaje.length < 10){
                mensajeFormulario.textContent = "El mensaje debe tener al menos 10 caracteres";
                mensajeFormulario.className = "mensaje-error";
                return;
            }

            // SI PASA TODAS LAS VALIDACIONES:

            mensajeFormulario.textContent = "¡Mensaje enviado correctamente!";
            mensajeFormulario.className = "mensaje-exito";

            formulario.reset();

        });
    }


});