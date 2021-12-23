let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente(){
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //Revisar si hay campos vacios
    const camposVacios = [mesa, hora].some( campo => campo === '');
    if(camposVacios){
        Swal.fire({
            title: 'Error!',
            text: 'Todos los campos son obligatorios',
            icon: 'error',
            confirmButtonText: 'Cool'
        });
        return;
    }

    //Asignando datos del formulario al cliente
    cliente = {...cliente, mesa, hora };
    // console.log(cliente);

    //Ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    //Mostrar las secciones
    mostrarSecciones();

    //Obtener platillos de la API de JSON SERVER
    obtenerPlatillos();
    
}

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));

}

function obtenerPlatillos(){
    const url = "http://localhost:4000/platillos";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error))
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const input = document.createElement('INPUT');
        input.type = 'number';
        input.min = 0;
        input.value = 0;
        input.id = `producto-${platillo.id}`;
        input.classList.add('form-control');

        //Funcion que detecta la cantidad y el platillo que se esta agregando
        input.onchange = function(){
            const cantidad = parseInt(input.value);  
            agregarPlatillo({...platillo, cantidad});
        }


        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(input);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);

        contenido.appendChild(row);
    })
}

function agregarPlatillo(producto){
    //Destructuring del pedido actual
    let { pedido } = cliente;
    
    //Revisar que la cantidad sea mayor a 0

    if(producto.cantidad > 0){
        //Comprueba si el elemento ya existe en el array
        if(pedido.some(articulo => articulo.id === producto.id)){
            //El articulo ya existe, actualizar la cantidad
            const pedidoActualizado = pedido.map( articulo => {
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });

            //Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];
        }else{
            //El articulo no existe, por ese motivo se agrega al arreglo de pedido
            cliente.pedido = [...pedido, producto];
        }
        
        
    }else{
        //Eliminar elementos cuando la cantidad es 0
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }

     console.log(cliente.pedido);
}