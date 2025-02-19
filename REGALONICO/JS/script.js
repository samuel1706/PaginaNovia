// Redirigir a la carta
document.getElementById("verCarta").addEventListener("click", () => {
    window.location.href = "carta.html";
});

// 📅 Funcionalidad de Nuestra Historia
const eventoTexto = document.getElementById("eventoTexto");
const eventoFecha = document.getElementById("eventoFecha");
const agregarEventoBtn = document.getElementById("agregarEvento");
const listaEventos = document.getElementById("listaEventos");

// Cargar eventos guardados
document.addEventListener("DOMContentLoaded", () => {
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || [];
    eventosGuardados.forEach(evento => agregarEvento(evento.texto, evento.fecha));
});

// Agregar evento
agregarEventoBtn.addEventListener("click", () => {
    if (eventoTexto.value && eventoFecha.value) {
        agregarEvento(eventoTexto.value, eventoFecha.value);
        guardarEventos();
        eventoTexto.value = "";
        eventoFecha.value = "";
    }
});

function agregarEvento(texto, fecha) {
    const li = document.createElement("li");
    li.textContent = `${fecha}: ${texto}`;
    listaEventos.appendChild(li);
}

function guardarEventos() {
    const eventos = [];
    listaEventos.querySelectorAll("li").forEach(li => {
        const [fecha, texto] = li.textContent.split(": ");
        eventos.push({ fecha, texto });
    });
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

// 🎮 Funcionalidad del Juego
const preguntaActual = document.getElementById("preguntaActual");
const respuestaUsuario = document.getElementById("respuestaUsuario");
const verificarRespuestaBtn = document.getElementById("verificarRespuesta");
const siguientePreguntaBtn = document.getElementById("siguientePregunta");
const resultadoJuego = document.getElementById("resultadoJuego");
const preguntaNueva = document.getElementById("preguntaNueva");
const respuestaNueva = document.getElementById("respuestaNueva");
const agregarPreguntaBtn = document.getElementById("agregarPregunta");

let preguntas = JSON.parse(localStorage.getItem("preguntas")) || [];
let indicePregunta = 0;

// Agregar nueva pregunta
agregarPreguntaBtn.addEventListener("click", () => {
    if (preguntaNueva.value && respuestaNueva.value) {
        preguntas.push({ pregunta: preguntaNueva.value, respuesta: respuestaNueva.value });
        localStorage.setItem("preguntas", JSON.stringify(preguntas));
        preguntaNueva.value = "";
        respuestaNueva.value = "";
    }
});

// Cargar pregunta actual
function cargarPregunta() {
    if (preguntas.length > 0) {
        preguntaActual.textContent = preguntas[indicePregunta].pregunta;
    }
}

// Verificar respuesta
verificarRespuestaBtn.addEventListener("click", () => {
    if (respuestaUsuario.value === preguntas[indicePregunta].respuesta) {
        resultadoJuego.textContent = "¡Correcto! 🎉";
    } else {
        resultadoJuego.textContent = "Incorrecto 💔";
    }
});

siguientePreguntaBtn.addEventListener("click", () => {
    indicePregunta = (indicePregunta + 1) % preguntas.length;
    cargarPregunta();
});

cargarPregunta();

function ocultarIntro() {
    let intro = document.getElementById("intro");
    let contenido = document.getElementById("contenido");

    intro.classList.add("fade-out");

    setTimeout(() => {
        intro.style.display = "none";
        contenido.style.display = "block";
    }, 1000);
}
