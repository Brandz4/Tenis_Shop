// Función para obtener los parámetros de la URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Obtener los parámetros 'nombre', 'imagen' y 'precio' de la URL
const nombreProducto = getParameterByName('nombre');
const imagenProducto = getParameterByName('imagen');
const precioProducto = getParameterByName('precio');
const descripcionProducto = getParameterByName('descripcion');

// Actualizar el contenido de la página con los valores de los parámetros
if (nombreProducto) {
    document.getElementById('producto-nombre').textContent = nombreProducto;
}

if (imagenProducto) {
    document.getElementById('producto-imagen').src = imagenProducto;
    document.getElementById('producto-imagen').alt = nombreProducto;
}

if (precioProducto) {
    document.getElementById('producto-precio').textContent = `${precioProducto}`;
}

if (descripcionProducto) {
    document.getElementById('producto-descripcion').textContent = descripcionProducto;
}

function actualizarCantidadCarrito() {
    // Obtener carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Calcular la cantidad total de productos en el carrito
    let cantidadTotal = 0;
    carrito.forEach(producto => {
        cantidadTotal += parseInt(producto.cantidad);
    });

    // Seleccionar el elemento del carrito en la navegación
    const carritoEnlace = document.querySelector('.navegacion__enlace[href="carrito.html"]');

    // Si ya existe un span para la cantidad, actualízalo. Si no, créalo.
    let carritoCantidadElement = carritoEnlace.querySelector('.carrito-cantidad');
    if (!carritoCantidadElement) {
        carritoCantidadElement = document.createElement('span');
        carritoCantidadElement.classList.add('carrito-cantidad');
        carritoEnlace.appendChild(carritoCantidadElement);
    }
    
    // Actualizar el número de productos en el carrito
    if (cantidadTotal > 0) {
        carritoCantidadElement.textContent = cantidadTotal;
        carritoCantidadElement.style.display = 'inline'; // Mostrar el contador
    } else {
        carritoCantidadElement.style.display = 'none'; // Ocultar el contador
    }
}

// Llamar a la función para actualizar la cantidad al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCantidadCarrito);

// Función para agregar productos al carrito
function agregarAlCarrito() {
    // Obtener datos del producto del formulario
    const nombre = document.getElementById('producto-nombre').textContent;
    const imagen = document.getElementById('producto-imagen').src;
    const precio = document.getElementById('producto-precio').textContent;
    const talla = document.querySelector('.formulario__campo[name="talla"]').value;
    const cantidad = document.querySelector('.formulario__campo[name="cantidad"]').value;
    // Verificar si se ha seleccionado una talla y una cantidad
    if (!talla.trim() || !cantidad.trim()) {
        alert('Por favor selecciona una talla y una cantidad.');
    } else {
        // Construir objeto de producto
        const producto = {
            nombre: nombre,
            imagen: imagen,
            precio: precio,
            talla: talla,
            cantidad: cantidad
        };

        // Obtener carrito del almacenamiento local o inicializar uno nuevo
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si el producto ya existe en el carrito
        const indiceProductoExistente = carrito.findIndex(item => item.nombre === nombre && item.talla === talla);
        if (indiceProductoExistente !== -1) {
            // Actualizar la cantidad del producto existente en el carrito
            carrito[indiceProductoExistente].cantidad = (parseInt(carrito[indiceProductoExistente].cantidad) + parseInt(cantidad)).toString();
        } else {
            // Agregar producto al carrito
            carrito.push(producto);
        }

        // Guardar carrito en el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Mostrar mensaje de éxito
        alert('¡Producto agregado al carrito exitosamente!');
        actualizarCantidadCarrito();
    }
}

// Función para mostrar productos en el carrito
function mostrarCarrito() {
    // Obtener carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const carritoContainer = document.getElementById('carrito-container');
    const sumaTotalElement = document.getElementById('suma-total');

    // Limpiar contenido anterior del carrito
    carritoContainer.innerHTML = '';
    
    // Renderizar productos en el carrito
    let sumaTotal = 0;
    carrito.forEach(producto => {
        const precioNumerico = parseFloat(producto.precio.replace('$', '').replace(',', ''));
        const cantidadNumerica = parseInt(producto.cantidad);
        const precioTotal = precioNumerico * cantidadNumerica;
        sumaTotal += precioTotal;

        const precioTotalFormateado = precioTotal.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });

        const productoHTML = `
            <div class="producto-carrito">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="detalle-producto">
                    <p><strong>Nombre:</strong> ${producto.nombre}</p>
                    <p><strong>Precio:</strong> ${producto.precio}</p>
                    <p><strong>Talla:</strong> ${producto.talla}</p>
                    <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
                    <p><strong>Total Producto:</strong> ${precioTotalFormateado}</p>
                    <button class="btn-eliminar" onclick="eliminarProducto('${producto.nombre}','${producto.talla}')">Eliminar</button>
                </div>
            </div>
        `;
        carritoContainer.insertAdjacentHTML('beforeend', productoHTML);
    });

    // Actualizar el contenido de la suma total
    const sumaTotalFormateada = sumaTotal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    if (carrito.length === 0) {
        const sumaTotalElement = document.getElementById('suma-total');
        sumaTotalElement.textContent = '';
    }else{
        sumaTotalElement.textContent = `Total del carrito: ${sumaTotalFormateada}`;
    }
}

function eliminarProducto(nombreProducto, tallaProducto) {
    // Obtener carrito del almacenamiento local
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar el carrito para eliminar el producto específico con el nombre y talla dados
    carrito = carrito.filter(producto => !(producto.nombre === nombreProducto && producto.talla === tallaProducto));

    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
    // Si el carrito está vacío después de eliminar el producto, limpiar el contenido del total
    if (carrito.length === 0) {
        const sumaTotalElement = document.getElementById('suma-total');
        sumaTotalElement.textContent = '';
    }
    actualizarCantidadCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    // Limpiar el contenido visual del carrito
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    // Limpiar los datos del carrito del almacenamiento local
    localStorage.removeItem('carrito');

    // Limpiar el contenido de la suma total
    const sumaTotalElement = document.getElementById('suma-total');
    sumaTotalElement.textContent = '';
    actualizarCantidadCarrito();
}
// Llamar a la función para mostrar el carrito al cargar la página
mostrarCarrito();

// Función para abrir el pop-up con el formulario de compra
function abrirFormulario() {
    const formularioPopUp = document.getElementById('formulario-pop-up');
    formularioPopUp.style.display = 'block';
}

// Función para cerrar el pop-up con el formulario de compra
function cerrarFormulario() {
    const formularioPopUp = document.getElementById('formulario-pop-up');
    formularioPopUp.style.display = 'none';
}

// Función para abrir el pop-up con el formulario de compra
function abrirFormulario() {
    // Obtener carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        // Si el carrito está vacío, mostrar un alert
        alert('El carrito está vacío. Agrega productos antes de comprar.');
    } else {
        // Si hay productos en el carrito, abrir el formulario
        const formularioPopUp = document.getElementById('formulario-pop-up');
        formularioPopUp.style.display = 'block';
    }
}

// Función para cerrar el pop-up con el formulario de compra
function cerrarFormulario() {
    const formularioPopUp = document.getElementById('formulario-pop-up');
    formularioPopUp.style.display = 'none';
}

// Función para obtener el total de la compra
function obtenerTotalCompra() {
    // Obtener carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Calcular el total de la compra
    let totalCompra = 0;
    carrito.forEach(producto => {
        const precioNumerico = parseFloat(producto.precio.replace('$', '').replace(',', ''));
        const cantidadNumerica = parseInt(producto.cantidad);
        totalCompra += precioNumerico * cantidadNumerica;
    });

    return totalCompra;
}

// Manejar el envío del formulario de compra
document.getElementById('formulario-compra').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener el total de la compra
    const totalCompra = obtenerTotalCompra();

    // Formatear el total de la compra con comas y puntos
    const totalFormateado = totalCompra.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // Mostrar el modal con la información
    mostrarModal(totalFormateado);

    // Cerrar el formulario después de la compra
    cerrarFormulario();

    // Vaciar el carrito
    vaciarCarrito();
});

function mostrarModal(totalCompra) {
    const modal = document.getElementById('modal');
    const totalCompraElement = document.getElementById('total-compra');
    totalCompraElement.textContent = totalCompra;
    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

