//Ruta para obtener los productos de la base de datos
fetch('http://localhost:3000/productos/productos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    return response.json();
  })
  .then(productos => {
    // Trabaja con los datos recibidos
    const contenedorProductos = document.querySelector('.grid'); // Selecciona el contenedor de productos por su clase "grid"

    //Crear todos los productos el html
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        const enlace = document.createElement('a');
        enlace.href = `producto.html?nombre=${encodeURIComponent(producto.NOMBRE)}&imagen=${encodeURIComponent(producto.IMAGEN)}&precio=${encodeURIComponent(producto.PRECIO)}&descripcion=${encodeURIComponent(producto.DESCRIPCION)}`; // Agregar la descripción al enlace

        const imagen = document.createElement('img');
        imagen.classList.add('producto__imagen');
        imagen.src = producto.IMAGEN;
        imagen.alt = 'imagen camisa';

        const divInformacion = document.createElement('div');
        divInformacion.classList.add('producto__informacion');

        const parrafoNombre = document.createElement('p');
        parrafoNombre.classList.add('producto__nombre');
        parrafoNombre.textContent = producto.NOMBRE;

        const parrafoPrecio = document.createElement('p');
        parrafoPrecio.classList.add('producto__precio');
        parrafoPrecio.textContent = `${producto.PRECIO}`;

        divInformacion.appendChild(parrafoNombre);
        divInformacion.appendChild(parrafoPrecio);
        enlace.appendChild(imagen);
        enlace.appendChild(divInformacion);
        divProducto.appendChild(enlace);
        contenedorProductos.appendChild(divProducto);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });


// Selecciona el input de búsqueda y el contenedor de los productos
const inputBusqueda = document.getElementById('busqueda');
const contenedorProductos = document.querySelector('.grid');

// Selecciona los elementos que contienen los estilos a ocultar
const graficoCamisas = document.querySelector('.grafico--camisas');
const graficoNode = document.querySelector('.grafico--node');

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

// Agrega un event listener al input de búsqueda para detectar cuando está enfocado la barra de busqueda
inputBusqueda.addEventListener('focus', function() {
    graficoCamisas.style.display = 'none';
    graficoNode.style.display = 'none';
  
});

// Agrega un event listener al input de búsqueda para detectar cuando pierde el foco la barra
inputBusqueda.addEventListener('blur', function() {
  // Verifica si el campo de búsqueda está vacío
  const busqueda = inputBusqueda.value.trim().toLowerCase();
  if (busqueda === '') {
      // Muestra los elementos que contienen los estilos a ocultar
      graficoCamisas.style.display = 'block';
      graficoNode.style.display = 'block';
  }
});


let nombresProductos = []; // Declarar la variable fuera de las funciones

//Ruta para obtener los productos
fetch('http://localhost:3000/productos/productos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    return response.json();
  })
  .then(productos => {
    // Almacenar los nombres en un arreglo
    nombresProductos = productos.map(producto => producto.NOMBRE);

    // Llamar a la función cargarOpcionesAutocompletado después de obtener los nombres
    cargarOpcionesAutocompletado();
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Función para cargar las opciones de autocompletado
function cargarOpcionesAutocompletado() {
    const busquedaInput = document.getElementById('busqueda');
    const datalist = document.getElementById('busquedas-previas');

    // Limpiar el contenido anterior del datalist
    datalist.innerHTML = '';

    // Obtener el valor actual del campo de búsqueda
    const valorBusqueda = busquedaInput.value.toLowerCase();

    // Filtrar los términos disponibles que coincidan parcialmente con el valor de búsqueda
    const opcionesFiltradas = nombresProductos.filter(termino => termino.toLowerCase().includes(valorBusqueda));

    // Límite de opciones a mostrar
    const limiteOpciones = 5; // Cambiar este valor al número deseado de opciones

    // Crear y agregar opciones al datalist
    for (let i = 0; i < Math.min(opcionesFiltradas.length, limiteOpciones); i++) {
        const option = document.createElement('option');
        option.value = opcionesFiltradas[i];
        datalist.appendChild(option);
    }
}

// Agregar un event listener al campo de búsqueda para detectar cambios en su valor
document.getElementById('busqueda').addEventListener('input', cargarOpcionesAutocompletado);



