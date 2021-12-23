let cliente = {
    mesa: '',
    hora: '',
    platillos: []
};

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
}