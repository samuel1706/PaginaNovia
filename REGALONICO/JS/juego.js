const preguntas = [
    {
        pregunta: "¿Dónde celebramos nuestro primer mes?",
        opciones: { A: "En el mar", B: "En Viva", C: "En cine" },
        respuesta: "B",
        mensaje: "💖 ¡Ese día fue hermoso, amor! 💖"
    },
    {
        pregunta: "¿Cuándo es nuestro aniversario?",
        opciones: { A: "15 de enero", B: "15 de febrero", C: "15 de marzo" },
        respuesta: "A",
        mensaje: "🎉 ¡El mejor día de mi vida! 🎉"
    },
    {
        pregunta: "¿Cuál es mi comida favorita?",
        opciones: { A: "Hamburguesa", B: "Salchipapa", C: "A y B son correctas" },
        respuesta: "C",
        mensaje: "🍔 ¡Sí, me encanta comer contigo! 🍟"
    },
    {
        pregunta: "¿Dónde nos conocimos?",
        opciones: { A: "Grupo de amigos", B: "Por Melissa", C: "A y B son correctas" },
        respuesta: "C",
        mensaje: "😍 ¡Un día especial que cambió mi vida! 😍"
    },
    {
        pregunta: "¿Cuál es tu animal favorito?",
        opciones: { A: "Perro", B: "Gato", C: "Mono" },
        respuesta: "B",
        mensaje: "🐱 ¡Awww, amo que te gusten los gatos! 🐱"
    },
    {
        pregunta: "¿Cuál es nuestro anime favorito?",
        opciones: { A: "Shingeki no Kyojin", B: "Naruto", C: "Dragon Ball" },
        respuesta: "A",
        mensaje: "🔥 ¡Eren y Mikasa, como tú y yo! 🔥"
    },
    {
        pregunta: "¿Quién es el mejor novio?",
        opciones: { A: "SAMUEL 😍" },
        respuesta: "A",
        mensaje: "💘 ¡Sí, el mejor novio eres tú! 💘"
    }
];

let preguntaActual = 0;
let respondida = false;

// 🔹 Referencias al DOM
const preguntaTexto = document.getElementById("preguntaActual");
const opcionesContainer = document.getElementById("opcionesContainer");
const resultadoJuego = document.getElementById("resultadoJuego");
const siguienteBtn = document.getElementById("siguientePregunta");

// 🔹 Mostrar Pregunta
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    
    // Mostrar la pregunta actual
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesContainer.innerHTML = ""; 
    resultadoJuego.textContent = "";
    respondida = false;

    // Crear botones de opciones
    Object.entries(pregunta.opciones).forEach(([key, value]) => {
        const boton = document.createElement("button");
        boton.textContent = `${key}) ${value}`;
        boton.classList.add("opcion");
        boton.addEventListener("click", () => verificarRespuesta(key));
        opcionesContainer.appendChild(boton);
    });
}

// 🔹 Verificar Respuesta
function verificarRespuesta(opcionSeleccionada) {
    if (respondida) return;

    const pregunta = preguntas[preguntaActual];
    const esCorrecta = opcionSeleccionada === pregunta.respuesta;

    resultadoJuego.textContent = esCorrecta
        ? `✅ ¡Correcto! ${pregunta.mensaje}`
        : `❌ Incorrecto, la respuesta era ${pregunta.respuesta}) ${pregunta.opciones[pregunta.respuesta]}`;
    
    resultadoJuego.style.color = esCorrecta ? "green" : "red";

    // Deshabilitar botones después de responder
    document.querySelectorAll(".opcion").forEach(btn => btn.disabled = true);
    respondida = true;
}

// 🔹 Pasar a la siguiente pregunta
siguienteBtn.addEventListener("click", () => {
    if (!respondida) {
        resultadoJuego.textContent = "⚠️ Debes responder antes de continuar.";
        resultadoJuego.style.color = "orange";
        return;
    }

    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        finalizarJuego();
    }
});

// 🔹 Finalizar el juego y redirigir a la carta
function finalizarJuego() {
    preguntaTexto.textContent = "🎉 ¡Juego terminado, mi amor! 🎉";
    opcionesContainer.innerHTML = "";
    siguienteBtn.style.display = "none";

    setTimeout(() => {
        window.location.href = "carta.html";
    }, 3000);
}

// 🔹 Iniciar el juego
mostrarPregunta();
