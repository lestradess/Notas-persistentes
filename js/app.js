// //Variables***************
// const formulario = document.querySelector("#formulario");
// const listaTweets = document.querySelector("#lista-tweets");
// let tweets = [];

// //Even Listeners *********
// evenListeners();
// function evenListeners() {

//     formulario.addEventListener("submit", agregarTweet);

//     //Recargar el localStorage
//     document.addEventListener("DOMContentLoaded",()=>{
//         //El código siquiente intenta coger los datos de localStorage
//         //Y si no los hubiera asigna un array vácio
//         tweets = JSON.parse(localStorage.getItem("tweets")) || [];

//         crearHTML();
//     })
// }
// //Funciones **************
// function agregarTweet(e) {
//     e.preventDefault();

//     //Texarea donde el usuario escribe
//     const tweet = document.querySelector("#tweet").value;
//     //validar texarea
//     if (tweet === "") {
//         mostrarError('El formulário está vácio.');
//         return;
//     }
//     //añadir fecha al tweet
//     const tweetObj ={
//         id :Date.now(),
//         texto : tweet
//     }
//     //Añadir teets al arreglo
//     tweets = [...tweets, tweetObj];
//     //crear el HTML
//     crearHTML();
//     //Reiniciar el formulario
//     formulario.reset();
// }
// function mostrarError(error){
//     const mensajeError = document.createElement("P");
//     mensajeError.textContent = error;
//     mensajeError.classList.add('error');
//     //Insertar mensaje en el contenido
//     const contenido = document.querySelector("#contenido");
//     contenido.appendChild(mensajeError);
//     //Elimina la alerta después de 3 segundos
//     setTimeout(() => {
//         mensajeError.remove();
//     }, 3000);
// }
// function crearHTML() {
//     //agregar un botón a cada elemento del listado
//     const btnEliminar = document.createElement("A");
//     btnEliminar.classList.add("#borrar-tweet");
//     btnEliminar.innerText = 'X';
//     btnEliminar.onClick = () => {
//         borrarTweet();
//     }

//     limpiarHTML();
//     if (tweets.length >0){
//         tweets.forEach(tweet => {
//             const li = document.createElement("li");
//             li.innerText = tweet.texto;
//             li.appendChild(btnEliminar);
//             listaTweets.appendChild(li);
//         })
//     }
//     sicronizarStorage();
// }
// function limpiarHTML(){
//     while(listaTweets.firstChild){
//         listaTweets.removeChild(listaTweets.firstChild);
//     };
// }
// function sicronizarStorage(){
//     localStorage.setItem("tweets", JSON.stringify(tweets));
// }
// function borrarTweet(id){

// }
// Variables
const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners () {
    //Cuando se envia el formulario
    formulario.addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', () => {
        //El código siquiente intenta coger los datos de localStorage
        //Y si no los hubiera asigna un array vacío
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    });
}

// Añadir tweet del formulario
function agregarTweet (e) {
    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.querySelector('#tweet').value;

    // validación
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    // Crear un objeto Tweet
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    }

    // Añadirlo a mis tweets
    tweets = [ ...tweets, tweetObj ];

    // Una vez agregado, mandamos renderizar nuestro HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

function mostrarError (error) {
    const mensajeEerror = document.createElement('p');
    mensajeEerror.textContent = error;
    mensajeEerror.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeEerror);

    setTimeout(() => {
        mensajeEerror.remove();
    }, 3000);
}

function crearHTML () {
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // crear boton de eliminar
            const botonBorrar = document.createElement('a');
            botonBorrar.classList = 'borrar-tweet';
            botonBorrar.innerText = 'X';

            // Crear elemento y añadirle el contenido a la lista
            const li = document.createElement('li');

            // Añade el texto
            li.innerText = tweet.texto;

            // añade el botón de borrar al tweet
            li.appendChild(botonBorrar);

            // añade un atributo único...
            li.dataset.tweetId = tweet.id;

            // añade el tweet a la lista
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Elimina el Tweet del DOM
function borrarTweet (e) {
    e.preventDefault();

    // console.log(e.target.parentElement.dataset.tweetId);
    const id = e.target.parentElement.dataset.tweetId;
    tweets = tweets.filter(tweet => tweet.id != id);
    crearHTML();
}

// Agrega tweet a local storage
function sincronizarStorage () {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina los cursos del carrito en el DOM
function limpiarHTML () {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}