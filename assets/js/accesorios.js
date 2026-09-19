document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // FUNCIONES REUTILIZABLES
    // =============================

    /**
     * agrega efecto visual al pasar el mouse sobre una tarjeta
     * @param {HTMLElement} tarjeta - Elemento article de la tarjeta
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
     * crea una tarjeta de producto a partir de un objeto
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
    // CATÁLOGO DE ACCESORIOS
    // =============================

    const catalogoAccesorios = document.querySelector("#catalogoAccesorios");

    if (catalogoAccesorios) {
        // array de productos de accesorios
        const accesorios = [
            {
                titulo: "Control Pro Mibu",
                imagen: "../assets/img/rotr.jpg", // en este caso estoy reutilizando imágenes existentes
                alt: "Control Pro Mibu",
                titleImagen: "Control Pro Mibu",
                info: "Compatible con PC, PS5 y Nintendo Switch.",
                descripcion: "Control inalámbrico de última generación con vibración HD y batería de larga duración.",
                precio: "$24.990",
                precioNumerico: 24990
            },
            {
                titulo: "Auriculares Gaming Mibu",
                imagen: "../assets/img/tkrbwarriors.jpg",
                alt: "Auriculares Gaming Mibu",
                titleImagen: "Auriculares Gaming Mibu",
                info: "Sonido envolvente 7.1 virtual.",
                descripcion: "Auriculares con micrófono retráctil y almohadillas de memoria para sesiones largas de juego.",
                precio: "$34.990",
                precioNumerico: 34990
            },
            {
                titulo: "Teclado Mecánico RGB",
                imagen: "../assets/img/meikoi.jpg",
                alt: "Teclado Mecánico RGB",
                titleImagen: "Teclado Mecánico RGB",
                info: "Switches mecánicos red, iluminación RGB personalizable.",
                descripcion: "Teclado gaming con teclas programables y reposamuñecas magnético desmontable.",
                precio: "$49.990",
                precioNumerico: 49990
            }
        ];

        // crear tarjetas dinámicamente
        accesorios.forEach((accesorio) => {
            const tarjeta = crearTarjetaProducto(accesorio);
            const elementoTarjeta = tarjeta.querySelector('.producto');
            agregarEfectoMouseOver(elementoTarjeta);
            catalogoAccesorios.appendChild(tarjeta);
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

    // selectores del DOM
    const listaCarrito = document.querySelector("#listaCarrito");
    const contadorCarrito = document.querySelector("#contadorCarrito");
    const totalCarrito = document.querySelector("#totalCarrito");
    const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");
    const toastElement = document.querySelector("#toastCarrito");
    const toastMensaje = document.querySelector("#toastMensaje");

    /**
     * muestra un toast de Bootstrap con un mensaje
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de toast: 'success', 'danger', 'warning'
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
        // buscar si el producto ya existe en el carrito
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
        // limpiar lista actual
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
     * elimina un producto del carrito por su índice
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
    renderizarCarrito();
});