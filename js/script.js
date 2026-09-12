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

    // querySelector selecciona el elemento ya existente en el document (en este caso un id)
    const filaProductos = document.querySelector("#catalogoProductos");

    // nuevos articulos
    if (filaProductos) {

        // crear un div con createElement
        const columna = document.createElement("div");

        // className indica la clase que necesita Bootstrap
        columna.className = "col-12 col-md-6 col-xl-4";

        // crear un article dentro de la nueva columna 
        const producto = document.createElement("article");

        producto.className = "card producto h-100";

        // crear titulo
        const titulo = document.createElement("h3");

        titulo.className = "card-title";

        titulo.textContent = "Hakuoki: Kyoto Winds";

        // crear figure, img y caption
        const figura = document.createElement("figure");

        figura.className = "imagen-producto";

        const imagen = document.createElement("img");

        imagen.src = "../img/hkw.jpg";

        imagen.alt = "Hakuoki: Kyoto Winds";

        imagen.title = "Hakuoki: Kyoto Winds";

        const caption = document.createElement("figcaption");

        caption.textContent = "Disponible para Nintendo Switch y PC.";

        // crear card-body
        const cuerpo = document.createElement("div");

        cuerpo.className = "card-body";

        // crear descripción y precio
        const descripcion = document.createElement("p");

        descripcion.className = "card-text";

        descripcion.textContent = "Una novela visual ambientada en el Japón del período Bakumatsu.";

        const precio = document.createElement("p");

        precio.className = "precio";

        precio.textContent = "$34.990";

        // crear el boton de ver producto
        const boton = document.createElement("a");

        boton.className = "btn boton-producto";

        boton.href = "#";

        boton.textContent = "Ver producto";

        // agregar todos los elementos

        // construir imagen y caption
        figura.appendChild(imagen);
        figura.appendChild(caption);

        // construir card-body
        cuerpo.appendChild(descripcion);
        cuerpo.appendChild(precio);
        cuerpo.appendChild(boton);

        // agregar elementos al article
        producto.appendChild(titulo);
        producto.appendChild(figura);
        producto.appendChild(cuerpo);

        // agregar article a la columna
        columna.appendChild(producto);

        // finalmente agregar columna al catalogo de id=catalogoProductos
        filaProductos.appendChild(columna);
    }

    // evento al pasar el mouse por encima de un producto:
    // primero querySelectAll selecciona todos los elementos de la clase productos
    const tarjetas = document.querySelectorAll(".producto");

    // recorrer todas las tarjetas
    tarjetas.forEach((tarjeta) => {
        // evento al pasar el mouse
        tarjeta.addEventListener("mouseover", () => {
            tarjeta.classList.add("tarjeta-hover");
        });

        tarjeta.addEventListener("mouseout", () => {
            tarjeta.classList.remove("tarjeta-hover");
        })
    });

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

    //solicitar datos a una API utilizando FETCH
    const listaJuegos = document.querySelector("#listaJuegosAPI");

    fetch("https://www.freetogame.com/api/games")
        .then((respuesta) => {

            if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los juegos");
            }
            return respuesta.json();
        })

        .then((datos) => {

            datos.slice(0, 6).forEach((juego) => {

            // se crea la columna de Bootstrap
            const columna = document.createElement("div");
            columna.className = "col-12 col-md-6 col-xl-4";

            // se crea la tarjeta
            const tarjeta = document.createElement("article");
            tarjeta.className = "card producto h-100";

            // se crea el titulo con el nombre que viene desde la API
            const titulo = document.createElement("h3");
            titulo.className = "card-title";
            titulo.textContent = juego.title;

            // se crea la imagen con los datos de la API
            const imagen = document.createElement("img");
            imagen.src = juego.thumbnail;
            imagen.alt = juego.title;

            // genero desde la API
            const genero = document.createElement("p");
            genero.className = "card-text";
            genero.textContent = juego.genre;

            // plataforma
            const plataforma = document.createElement("p");
            plataforma.className = "card-text";
            plataforma.textContent = juego.platform;

            // se agregan los elementos a la tarjeta
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(genero);
            tarjeta.appendChild(plataforma);

            // se agrega la tarjeta dentro de la columna
            columna.appendChild(tarjeta);

            // se agrega la columna al row
            listaJuegos.appendChild(columna);

            // evento de mouseover
            tarjeta.addEventListener("mouseover", () => {
                tarjeta.classList.add("tarjeta-hover");
            });

            tarjeta.addEventListener("mouseout", () => {
                tarjeta.classList.remove("tarjeta-hover");
            });

        });

        })
        .catch((error) => {
            console.error("Error al cargar los juegos:", error);
        });
    
});