// Selecciona el input de búsqueda y el contenedor de los productos
const inputBusqueda = document.getElementById('busqueda');
const contenedorProductos = document.querySelector('.grid');

// Agrega un event listener al input de búsqueda para detectar cambios en su valor
inputBusqueda.addEventListener('input', function() {
    // Obtén el valor actual del input de búsqueda y conviértelo a minúsculas
    const busqueda = inputBusqueda.value.toLowerCase();
    
    // Selecciona todos los productos
    const productos = contenedorProductos.querySelectorAll('.producto');

    // Itera sobre cada producto y verifica si su nombre contiene la búsqueda
    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('.producto__nombre').textContent.toLowerCase();
        // Si el nombre del producto contiene la búsqueda, muéstralo; de lo contrario, ocúltalo
        if (nombreProducto.includes(busqueda)) {
            producto.style.display = 'block';
        } else {
            producto.style.display = 'none';
        }
    });
});
