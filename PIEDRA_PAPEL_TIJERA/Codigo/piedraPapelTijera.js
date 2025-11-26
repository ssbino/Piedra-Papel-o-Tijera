// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];

//variables para guardar elementos de inputs y el boton de jugar
const inputNombre = document.querySelector('input[name="nombre"]');
const inputPartidas = document.querySelector('input[name="partidas"]');
const btnJugar =  document.querySelector ("body > button");

//variables para imagenes
const imagenesJugador= document.querySelectorAll('#jugador img');
const imagenesMaquina= document.querySelectorAll('#maquina img');

//variables para contadores 
const contadorActual= document.querySelector('#actual');
const contadorTotal=document.querySelector('#total');

//variables para los botones
const btnYa= document.querySelector('h2 button'); //selecciono el selector css
const btnReset= document.querySelectorAll('button')[2]; //selecciono todos los botones y accedo al ultimo

//variable para historial
const listaHistorial= document.querySelector('#historial');

//variables para el juego
let nombreJugador= "";
let totalPartidas= 0;
let partidaActual= 0;

//funciones del juego
function comenzarPartida(){
    
    let nombre= inputNombre.value;
    let partidas= parseInt(inputPartidas.value);
    
    let nombreValido= true;
    let partidasValidas= true; 

    //validamos el numero de partidas
    if(partidas>0){
        inputPartidas.classList.remove('fondoRojo')// si tenia error, lo quitamos
        partidasValidas= true;
    } else{
        inputPartidas.classList.add('fondoRojo');
        partidasValidas= false;
    }

    //validamos si el nombre tiene mas de 3caracteres y el primer caracter no es un numero
    if(nombre.length > 3 && isNaN(parseInt(nombre[0]))){

        inputNombre.classList.remove('fondoRojo')
        nombreValido= true;

    }else{

        inputNombre.classList.add('fondoRojo');
        nombreValido= false;
        alert("el nombre no es válido");
    }

    //decision para comenzar la partida
    if(nombreValido && partidasValidas){
        
        //se guardan los valores
        nombreJugador= nombre;
        totalPartidas= partidas;

        //se desactivan los inputs
        inputNombre.disabled= true;
        inputPartidas.disabled= true;

        //se actualiza el contador
        contadorTotal.textContent= totalPartidas;

        console.log("A jugar! " + nombreJugador);

    } else{

        console.log("Error en los datos introducidos");
    }
}


let seleccionJugador= "";
function seleccionarOpcion(evento){
    
    const imagenClicada= evento.currentTarget;

    //se recorren las imagenes del jugador y se comprueba si es la imagen clicada aplicando los estilos correspondientes, guardando la tirada y cambiando la imagen.
    for(let i=0; i<imagenesJugador.length; i++){

        if(imagenesJugador[i]===imagenClicada){
            imagenClicada.classList.add('seleccionado');
            imagenClicada.classList.remove('noSeleccionado');

            seleccionJugador= posibilidades[i];

            let rutaImagen= 'img/' + seleccionJugador + 'Jugador.png';
            imagenClicada.src= rutaImagen;


        }else{
            imagenesJugador[i].classList.add('noSeleccionado');
            imagenesJugador[i].classList.remove('seleccionado');

            imagenesJugador[i].src= 'img/defecto.png';
        }
    }
    console.log("El jugador a elegido: " + seleccionJugador);
}

function realizarTirada(){
    if (totalPartidas===0 || partidaActual>=totalPartidas){
        console.log("Error, la partida no ha empezado o no ha terminado")
        return;
    }

    //se genera un número aleatorio para el array y la tirada de la maquina
    const indiceAleatorio= Math.floor(Math.random()*posibilidades.length);

    const opcionMaquina = posibilidades[indiceAleatorio];

    console.log("La tirada de la maquina es " + opcionMaquina);

    //se aumenta el contador de partidas, se actualizar el contador de HTML y se actualiza la imagen de la maquina
    partidaActual ++;

    contadorActual.textContent= partidaActual;

    imagenesMaquina[0].src= 'img/' + opcionMaquina + 'Ordenador.png'

    //resultado de la partida mediante las posiciones del array
    const indiceJugador = posibilidades.indexOf(seleccionJugador);
    const indiceMaquina= posibilidades.indexOf(opcionMaquina);
    let resultado= "";

    if(indiceJugador===indiceMaquina){
        
        resultado= "Empate";

    } else if ((indiceJugador===indiceMaquina + 1) || (indiceJugador===0 && indiceMaquina===posibilidades.length - 1)){
        
        resultado= "Gana " + nombreJugador;

    } else{
        resultado= "Gana la máquina";
    }

    //se registra el historial 
    const nuevoElementoHistorial= document.createElement('li');
    nuevoElementoHistorial.textContent=resultado;

    //añadimos el li a ul
    listaHistorial.appendChild(nuevoElementoHistorial);

}

function resetearPartida(){
    //se restablecen todos los valores
    inputNombre.disabled = false;
    inputPartidas.disabled = false;

    partidaActual = 0;
    totalPartidas = 0;
    contadorActual.textContent = 0;
    contadorTotal.textContent = 0;

    imagenesMaquina[0].src = 'img/defecto.png';

    for (let i = 0; i < imagenesJugador.length; i++) {
        imagenesJugador[i].classList.remove('seleccionado');
        imagenesJugador[i].classList.add('noSeleccionado');
        imagenesJugador[i].src = 'img/defecto.png'; 
    }

    const nuevoElementoHistorial = document.createElement('li');
    nuevoElementoHistorial.textContent = "Nueva partida";
    listaHistorial.appendChild(nuevoElementoHistorial);

    console.log("Partida reseteada. Listo para empezar de nuevo.");
}

//ASIGNACION DE EVENTOS

//para jugar
btnJugar.addEventListener('click', comenzarPartida);

//imagenes del jugador 
for(let i= 0; i<(imagenesJugador.length); i++){

    imagenesJugador[i].addEventListener('click', seleccionarOpcion);
}

//para realizar la tirada
btnYa.addEventListener('click', realizarTirada);

//para resetear la partida
btnReset.addEventListener('click', resetearPartida);




