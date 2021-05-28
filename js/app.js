//--------------- Variables
const formulario = document.getElementById('enviar-mail');

const btnEnviar = document.getElementById('enviar');
const btnReiniciar = document.getElementById('resetBtn');

const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const spinner = document.getElementById('spinner');

let coleccionErrores;
let arrErrores = [];                                                  


//--------------- EventListeners
document.addEventListener('DOMContentLoaded', iniciarApp);

btnEnviar.addEventListener('click', enviarFormulario);
btnReiniciar.addEventListener('click', reiniciarFormulario);

email.addEventListener('blur', validar);
asunto.addEventListener('blur', validar);
mensaje.addEventListener('blur', validar);


//--------------- Funciones
// Cambia boton de enviar al iniciar
function iniciarApp() {
    btnEnviar.style.cursor = 'not-allowed';
    btnEnviar.style.background = 'lightblue';
    btnEnviar.disabled = true;

    coleccionErrores = '';
    arrErrores = [];
}


// Valida los inputs
function validar(e) {
    const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (e.target.type === 'email') {     // Es una direccion de correo
        if( e.target.value !== '') {            // Comprueba si hay contenido
            if(er.test(e.target.value)) {                        // Comprueba si el correo es correcto
                e.target.classList.add('border-green-500');
                borrarError(e);
            }else{                                               // Si no, muestra error
                e.target.classList.remove('border-green-500');
                e.target.classList.add('border-red-500');
                mostrarError('Email no valido');
            }
        }else {                                 // Si no hay contenido, muestra error
            e.target.classList.remove('border-green-500');
            e.target.classList.add('border-red-500');
            mostrarError('Email no valido');
        }
    }else if (e.target.value !== '') {    // Es un asunto o es un mensaje, comprueba contenido
        e.target.classList.add('border-green-500');     
        borrarError(e);   
    } else {                              // No hay contenido, error
        e.target.classList.remove('border-green-500');
        e.target.classList.add('border-red-500');
        mostrarError('Todos los campos deben ser rellenados');
    }
    

    if(er.test(email.value) && mensaje.value !== '' && asunto.value !== '') { 
        btnEnviar.style.cursor = 'pointer';
        btnEnviar.style.background = 'blue';
        btnEnviar.disabled = false;
    }
}

// Muestra el error
function mostrarError(tipoError) {
    const error = document.createElement('p');
    coleccionErrores = document.querySelectorAll('p');
    error.textContent = `${tipoError}`;
    error.classList.add('bg-red-500');


    // Comprueba si ya existe un mensaje de error con el mismo contenido, si no, lo agrega
    if(coleccionErrores.length > 0){ 
        if(error.textContent.includes('Email no valido')) {     
            if(arrErrores.some(parrafo => parrafo.textContent.includes('Email no valido')) !== true) {
                formulario.insertBefore(error, spinner)
            }
        }else if(arrErrores.some(parrafo => parrafo.textContent.includes('Todos los campos deben ser rellenados')) !== true) {
            formulario.insertBefore(error, spinner)
        }
    }else {
        formulario.insertBefore(error, spinner);
    }

    coleccionErrores = document.querySelectorAll('p');
    coleccionErrores.forEach((parrafo, i) => arrErrores[i] = parrafo);      // Convierte los parrafos de errores en un array para comprobar

}


function borrarError(input) { 
    let errorIndex;

    // Comprueba nuevamente los errores existentes
    coleccionErrores = document.querySelectorAll('p');
    coleccionErrores.forEach((parrafo, i) => arrErrores[i] = parrafo); 

    // Encuentra el indice del error a borrar y lo elimina
    if(arrErrores.length !== 0) {
        if(input.target.type === 'email'){
            errorIndex = arrErrores.findIndex(parrafo => parrafo.textContent.includes('Email no valido'));
            coleccionErrores[errorIndex].remove();
            arrErrores.splice(errorIndex, 1);
        }else {
            if(asunto.value !== '' && mensaje.value !== '') {
                errorIndex = arrErrores.findIndex(parrafo => parrafo.textContent.includes('Todos los campos deben ser rellenados'));
                coleccionErrores[errorIndex].remove();
                arrErrores.splice(errorIndex, 1);
            }
        }
    }
}


function enviarFormulario(e) {
    e.preventDefault();
    const exito = document.createElement('p');
    exito.textContent = 'El correo ha sido enviado exitosamente';
    exito.classList.add('bg-green-500');

    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';
        formulario.insertBefore(exito, spinner);
        setTimeout(() => {
            exito.remove();
            reiniciarFormulario();
            iniciarApp();
        }, 2000);
    }, 3000)
} 

function reiniciarFormulario() {
    formulario.reset();
}