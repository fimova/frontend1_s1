document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // FUNCIONES REUTILIZABLES
    // =============================

    /**
     * agregar efecto visual al pasar el mouse sobre una tarjeta
     * @param {HTMLElement} tarjeta - Ekemento article de la tarjeta
     */
    function agregarEfectoMouseOver(tarjeta) {
        tarjeta.addEventListener("mouseover", () => {
            tarjeta.classList.add("tarjeta-hover");
        });

        tarjeta.addEventListener("mouseout", () => {
            tarjeta.classList.remove("tarjeta-hover");
        });
    }

    /**
     * crear una tarjeta de producto a partir de un objeto
     * @param {Object} producto - Datos del producto
     * @returns {HTMLElement} Columna con la tarjeta completa
     */
    function crearTarjetaProducto(producto) {
        // crear columna de Bootstrap
        const columna = document.createElement("div");
        columna.className = "col-12 col-md-6 col-xl-4";

        // crear article
        const tarjeta = document.createElement("article");
        tarjeta.className = "card producto h-100";

        // crear título
        const titulo = document.createElement("h3");
        titulo.className = "card-title";
        titulo.textContent = producto.titulo;

        // crear figure
        const figura = document.createElement("figure");
        figura.className = "imagen-producto";

        // crear imagen
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.alt;
        if (producto.titleImagen) {
            imagen.title = producto.titleImagen;
        }

        // crear caption
        const caption = document.createElement("figcaption");
        caption.textContent = producto.info;

        // agregar imagen y caption al figure
        figura.appendChild(imagen);
        figura.appendChild(caption);

        // crear card-body
        const cuerpo = document.createElement("div");
        cuerpo.className = "card-body";

        // crear descripción
        const descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.textContent = producto.descripcion;
        cuerpo.appendChild(descripcion);

        // si existe precio, se crea
        if (producto.precio) {
            const precio = document.createElement("p");
            precio.className = "precio";
            precio.textContent = producto.precio;
            cuerpo.appendChild(precio);
        }

        // crear botón de agregar al carrito
        const boton = document.createElement("button");
        boton.className = "btn boton-producto btn-agregar-carrito";
        boton.textContent = "Agregar al carrito";

        // guardar datos del producto en el botón
        boton.dataset.nombre = producto.titulo;
        boton.dataset.precio = producto.precioNumerico || 0;

        cuerpo.appendChild(boton);

        // construir tarjeta
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(figura);
        tarjeta.appendChild(cuerpo);

        // agregar tarjeta a la columna
        columna.appendChild(tarjeta);

        // devolver columna completa
        return columna;
    }

    // =============================
    // CATÁLOGO DE PRODUCTOS
    // =============================

    const filaProductos = document.querySelector("#catalogoProductos");

    if (filaProductos) {
        const hakuoki = {
            titulo: "Hakuoki: Kyoto Winds",
            imagen: "../img/hkw.jpg",
            alt: "Caratula Hakuoki: Kyoto Winds",
            titleImagen: "Hakuoki: Kyoto Winds",
            info: "Disponible para Nintendo Switch y PC.",
            descripcion: "Una novela visual ambientada en el Japón del período Bakumatsu.",
            precio: "$34.990",
            precioNumerico: 34990
        };

        const tarjetaHakuoki = crearTarjetaProducto(hakuoki);
        filaProductos.appendChild(tarjetaHakuoki);
    }

    // agregar el efecto mouseover a todos los productos del catálogo estático
    const tarjetas = document.querySelectorAll(".producto");
    tarjetas.forEach((tarjeta) => {
        agregarEfectoMouseOver(tarjeta);
    });

    // =============================
    // FORMULARIO DE BÚSQUEDA
    // =============================

    const formBusqueda = document.querySelector("#formBusqueda");
    const inputBusqueda = document.querySelector("#inputBusqueda");
    const mensajeBusqueda = document.querySelector("#mensajeBusqueda");

    if (formBusqueda && inputBusqueda) {
        /**
         * procesar la búsqueda de productos
         * @param {Event} evento - Evento submit del formulario
         */
        formBusqueda.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

            if (terminoBusqueda === "") {
                mensajeBusqueda.textContent = "Por favor, ingresa un término de búsqueda.";
                mensajeBusqueda.className = "mt-2 text-danger";
                // mostrar todos los productos
                document.querySelectorAll(".producto").forEach(tarjeta => {
                    tarjeta.closest(".col-12, .col-md-6, .col-xl-4").style.display = "block";
                });
                return;
            }

            // obtener todas las tarjetas de producto
            const todasLasTarjetas = document.querySelectorAll(".producto");
            let productosEncontrados = 0;

            todasLasTarjetas.forEach((tarjeta) => {
                const titulo = tarjeta.querySelector(".card-title").textContent.toLowerCase();
                const columna = tarjeta.closest(".col-12, .col-md-6, .col-xl-4");

                if (titulo.includes(terminoBusqueda)) {
                    columna.style.display = "block";
                    productosEncontrados++;
                } else {
                    columna.style.display = "none";
                }
            });

            // mostrar mensaje de resultados
            if (productosEncontrados === 0) {
                mensajeBusqueda.textContent = `No se encontraron productos con "${terminoBusqueda}".`;
                mensajeBusqueda.className = "mt-2 text-warning";
            } else {
                mensajeBusqueda.textContent = `Se encontraron ${productosEncontrados} producto(s) con "${terminoBusqueda}".`;
                mensajeBusqueda.className = "mt-2 text-success";
            }
        });

        // limpiar búsqueda cuando el input esté vacío
        inputBusqueda.addEventListener("input", () => {
            if (inputBusqueda.value.trim() === "") {
                document.querySelectorAll(".producto").forEach(tarjeta => {
                    tarjeta.closest(".col-12, .col-md-6, .col-xl-4").style.display = "block";
                });
                mensajeBusqueda.textContent = "";
            }
        });
    }

    // =============================
    // CARRITO DE COMPRAS
    // =============================

    // array para almacenar los productos del carrito
    let carrito = [];

    /**
     * guardar el carrito en localStorage
     */
    function guardarCarrito() {
        localStorage.setItem('carritoMibu', JSON.stringify(carrito));
    }

    /**
     * cargar el carrito desde localStorage
     */
    function cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carritoMibu');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
    }

    // Cargar carrito al iniciar la página
    cargarCarrito();

    // Selectores del DOM
    const listaCarrito = document.querySelector("#listaCarrito");
    const contadorCarrito = document.querySelector("#contadorCarrito");
    const totalCarrito = document.querySelector("#totalCarrito");
    const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");
    const toastElement = document.querySelector("#toastCarrito");
    const toastMensaje = document.querySelector("#toastMensaje");

    /**
     * muestra un toast de Bootstrap con un mensaje
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de toast: 'success', 'danger', 'warning', 'info'
     */
    function mostrarToast(mensaje, tipo = 'success') {
        toastMensaje.textContent = mensaje;

        // cambiar color según tipo
        toastElement.className = `toast align-items-center text-bg-${tipo} border-0`;

        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    /**
     * agrega un producto al carrito
     * @param {string} nombre - Nombre del producto
     * @param {number} precio - Precio del producto
     */
    function agregarAlCarrito(nombre, precio) {
        // Buscar si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.nombre === nombre);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        guardarCarrito();
        renderizarCarrito();
        mostrarToast(`"${nombre}" agregado al carrito`, 'success');
    }

    /**
     * renderiza el carrito en el DOM
     */
    function renderizarCarrito() {
        // Limpiar lista actual
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío</li>';
            contadorCarrito.textContent = "0";
            totalCarrito.textContent = "$0";
            return;
        }

        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            cantidadTotal += item.cantidad;

            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            li.innerHTML = `
                <div>
                    <strong>${item.nombre}</strong>
                    <br>
                    <small class="text-muted">$${item.precio.toLocaleString('es-CL')} x ${item.cantidad}</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-primary rounded-pill">$${subtotal.toLocaleString('es-CL')}</span>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">
                        ✕
                    </button>
                </div>
            `;

            listaCarrito.appendChild(li);
        });

        // actualizar contador y total
        contadorCarrito.textContent = cantidadTotal;
        totalCarrito.textContent = `$${total.toLocaleString('es-CL')}`;

        // agregar listeners a botones de eliminar
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                eliminarDelCarrito(index);
            });
        });
    }

    /**
     * eliminar un producto del carrito por su índice
     * @param {number} index - Índice del producto en el array
     */
    function eliminarDelCarrito(index) {
        const productoEliminado = carrito[index].nombre;
        carrito.splice(index, 1);
        guardarCarrito();
        renderizarCarrito();
        mostrarToast(`"${productoEliminado}" eliminado del carrito`, 'warning');
    }

    /**
     * vacía completamente el carrito
     */
    function vaciarCarrito() {
        if (carrito.length === 0) {
            mostrarToast('El carrito ya está vacío', 'info');
            return;
        }

        carrito = [];
        guardarCarrito();
        renderizarCarrito();
        mostrarToast('Carrito vaciado', 'danger');
    }

    // botón finalizar compra para simular el flujo completo
    const btnFinalizarCompra = document.querySelector("#btnFinalizarCompra");

    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener('click', () => {
            if (carrito.length === 0) {
                mostrarToast('El carrito está vacío', 'warning');
                return;
            }

            // simulación de compra
            const totalCompra = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

            mostrarToast(`¡Compra exitosa! Total: $${totalCompra.toLocaleString('es-CL')}`, 'success');

            // vaciar carrito después de 1 segundo
            setTimeout(() => {
                carrito = [];
                guardarCarrito();
                renderizarCarrito();

                // cerrar el offcanvas
                const offcanvas = bootstrap.Offcanvas.getInstance(document.querySelector('#offcanvasCarrito'));
                if (offcanvas) {
                    offcanvas.hide();
                }
            }, 1500);
        });
    }

    // event delegation: escuchar clicks en todos los botones de agregar al carrito
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar-carrito')) {
            const nombre = e.target.dataset.nombre;
            const precio = parseInt(e.target.dataset.precio);
            agregarAlCarrito(nombre, precio);
        }
    });

    // evento para vaciar carrito
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener('click', vaciarCarrito);
    }

    // renderizar carrito inicial (vacío)
    if (listaCarrito) {
        renderizarCarrito();
    }

    // =============================
    // FETCH API
    // =============================

    // selector del contenedor donde se mostrarán los juegos de la API
    const listaJuegos = document.querySelector("#listaJuegosAPI");

    if (listaJuegos) {
        // configuración de la API
        const URL_API_JUEGOS = "https://www.freetogame.com/api/games";
        const CANTIDAD_JUEGOS_MOSTRAR = 6;

        /**
         * carga juegos desde la API y los muestra en el DOM
         */
        async function cargarJuegos() {
            try {
                // realizar petición a la API
                const respuesta = await fetch(URL_API_JUEGOS);

                // verificar si la respuesta fue exitosa
                if (!respuesta.ok) {
                    throw new Error(`Error HTTP: ${respuesta.status}`);
                }

                // convertir respuesta a JSON
                const datos = await respuesta.json();

                // limitar la cantidad de juegos a mostrar y crear tarjetas
                datos.slice(0, CANTIDAD_JUEGOS_MOSTRAR).forEach((juego) => {
                    // convertir los datos de la API al formato utilizado por las tarjetas
                    const productoAPI = {
                        titulo: juego.title,
                        imagen: juego.thumbnail,
                        alt: juego.title,
                        titleImagen: juego.title,
                        info: `Género: ${juego.genre} | Plataforma: ${juego.platform}`,
                        descripcion: juego.short_description,
                        precioNumerico: 0 // Juegos gratis
                    };

                    // crear tarjeta del juego
                    const tarjetaJuego = crearTarjetaProducto(productoAPI);

                    // seleccionar el elemento article dentro de la columna para aplicar el efecto
                    const elementoTarjeta = tarjetaJuego.querySelector('.producto');
                    agregarEfectoMouseOver(elementoTarjeta);

                    // agregar tarjeta al contenedor
                    listaJuegos.appendChild(tarjetaJuego);
                });

            } catch (error) {
                // registrar error en consola para debugging
                console.error("Error al cargar los juegos:", error);

                // mostrar error visible al usuario
                mostrarMensajeError(listaJuegos);
            }
        }

        /**
         * muestra un mensaje de error al usuario cuando falla la carga de juegos
         * @param {HTMLElement} contenedor - Elemento donde se mostrará el mensaje
         */
        function mostrarMensajeError(contenedor) {
            // crear columna para el mensaje
            const columnaError = document.createElement("div");
            columnaError.className = "col-12";

            // crear contenedor del mensaje
            const alertaError = document.createElement("div");
            alertaError.className = "alert alert-warning text-center";
            alertaError.setAttribute("role", "alert");
            alertaError.textContent = "No fue posible cargar los juegos recomendados. Intenta nuevamente más tarde.";

            columnaError.appendChild(alertaError);

            // agregar al contenedor
            contenedor.appendChild(columnaError);
        }

        // ejecutar la función para cargar los juegos
        cargarJuegos();
    }
});