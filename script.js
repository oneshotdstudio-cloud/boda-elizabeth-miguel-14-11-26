document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       ELEMENTOS
    ================================================== */

    const indicadorCarga = document.getElementById("indicadorCarga");
    const pantallaCarga = document.getElementById("pantallaCarga");
    const barraProgreso = document.getElementById("barraProgreso");
    const porcentajeCarga = document.getElementById("porcentajeCarga");
    const portada = document.getElementById("portada");
    const sobre = document.getElementById("sobre");
    const musica = document.getElementById("musica");
    const botonMusica = document.getElementById("botonMusica");
    const botonNoche = document.getElementById("botonNoche");
    const menuNoche = document.getElementById("menuNoche");
    const botonMenu = document.getElementById("botonMenu");
    const menu = document.getElementById("menu");
    const cerrarMenu = document.getElementById("cerrarMenu");
    const botonInicio = document.getElementById("botonInicio");
    const nombres = document.getElementById("nombres");
    const guardarFecha = document.getElementById("guardarFecha");
    const visorImagen = document.getElementById("visorImagen");
    const imagenVisor = document.getElementById("imagenVisor");
    const botonSorpresa = document.getElementById("botonSorpresa");
    const textoSorpresa = document.getElementById("textoSorpresa");
    const climaContenido = document.getElementById("climaContenido");
    const recomendacionClima = document.getElementById("recomendacionClima");
    const estadoRecuerdos = document.getElementById("estadoRecuerdos");
    const subirRecuerdos = document.getElementById("subirRecuerdos");
    const confeti = document.getElementById("confeti");
    const botonRecepcionMapa = document.getElementById("botonRecepcionMapa");

    /* ==================================================
       FECHAS
    ================================================== */

    const fechaBoda = new Date(CONFIG.novios.fechaBoda).getTime();
    const inicioDiaBoda = new Date(fechaBoda);
    inicioDiaBoda.setHours(0,0,0,0);
    const inicioDiaBodaTime = inicioDiaBoda.getTime();
    const finDiaBodaTime = inicioDiaBodaTime + (24 * 60 * 60 * 1000);

    /* ==================================================
       ESTADO
    ================================================== */

    let musicaReproduciendo = false;
    let sobreAbierto = false;
    let temporizadorImagen = null;
    let visorAbierto = false;
    let intervaloPetalos = null;

    /* ==================================================
       PRECARGA DE IMÁGENES
    ================================================== */

    function precargarImagenes() {
        const imagenes = [
            CONFIG.imagenes.fondoPortada,
            CONFIG.imagenes.monograma,
            CONFIG.imagenes.sello,
            CONFIG.imagenes.fotoNovios1,
            CONFIG.imagenes.fotoNovios2
        ];
        imagenes.forEach(function(src) {
            const img = new Image();
            img.src = src;
        });
    }
    precargarImagenes();

    /* ==================================================
       PÉTALOS
    ================================================== */

    function iniciarPetalos() {
        if (CONFIG.efectos.petalos === false) return;
        if (intervaloPetalos) clearInterval(intervaloPetalos);
        for (let i = 0; i < 15; i++) setTimeout(crearPetalo, i * 150);
        intervaloPetalos = setInterval(crearPetalo, 600);
    }

    function crearPetalo() {
        const petalo = document.createElement("div");
        petalo.className = "petalo";
        petalo.style.left = Math.random() * 100 + "vw";
        const tamaño = 7 + Math.random() * 10;
        petalo.style.width = tamaño + "px";
        petalo.style.height = tamaño * 0.8 + "px";
        const duracion = 5 + Math.random() * 7;
        petalo.style.animationDuration = duracion + "s";
        petalo.style.opacity = .5 + Math.random() * .5;
        document.body.appendChild(petalo);
        setTimeout(function() { petalo.remove(); }, duracion * 1000);
    }

    /* ==================================================
       CARGA INSTANTÁNEA
    ================================================== */

    let progreso = 0;
    function animarCarga() {
        if (progreso < 100) {
            progreso += Math.random() * 40 + 30;
            if (progreso > 100) progreso = 100;
            const progresoRedondeado = Math.round(progreso);
            if (barraProgreso) barraProgreso.style.width = progresoRedondeado + "%";
            if (porcentajeCarga) porcentajeCarga.textContent = progresoRedondeado + "%";
            if (progreso < 100) {
                setTimeout(animarCarga, 50);
            } else {
                setTimeout(function() {
                    if (indicadorCarga) indicadorCarga.classList.add("oculto");
                    if (pantallaCarga) pantallaCarga.classList.add("oculta");
                    document.body.classList.add("cargado");
                }, 100);
            }
        }
    }

    /* ==================================================
       MÚSICA CON CONTROL DE VOLUMEN
    ================================================== */

    function actualizarBotonMusica() {
        if (botonMusica) botonMusica.textContent = musicaReproduciendo ? "⏸" : "▶";
    }

    function crearControlVolumen() {
        const controlExistente = document.getElementById("controlVolumen");
        if (controlExistente) controlExistente.remove();

        const controlVolumen = document.createElement("div");
        controlVolumen.id = "controlVolumen";
        controlVolumen.className = "control-volumen";
        controlVolumen.innerHTML = `
            <div class="control-volumen-header">
                <span>🔊 Volumen</span>
                <button id="cerrarVolumen" class="cerrar-volumen">×</button>
            </div>
            <input type="range" id="sliderVolumen" min="0" max="100" value="${Math.round(CONFIG.musica.volumen * 100)}" class="slider-volumen">
            <div class="control-volumen-valor">
                <span id="volumenPorcentaje">${Math.round(CONFIG.musica.volumen * 100)}%</span>
            </div>
        `;
        document.body.appendChild(controlVolumen);

        let tiempoPresionado;
        botonMusica.addEventListener("mousedown", function() {
            tiempoPresionado = setTimeout(function() { controlVolumen.classList.add("visible"); }, 500);
        });
        botonMusica.addEventListener("mouseup", function() { clearTimeout(tiempoPresionado); });
        botonMusica.addEventListener("touchstart", function() {
            tiempoPresionado = setTimeout(function() { controlVolumen.classList.add("visible"); }, 500);
        });
        botonMusica.addEventListener("touchend", function() { clearTimeout(tiempoPresionado); });

        const cerrarVolumen = document.getElementById("cerrarVolumen");
        if (cerrarVolumen) cerrarVolumen.addEventListener("click", function() { controlVolumen.classList.remove("visible"); });

        const sliderVolumen = document.getElementById("sliderVolumen");
        if (sliderVolumen) {
            sliderVolumen.addEventListener("input", function() {
                const volumen = parseInt(this.value) / 100;
                if (musica) musica.volume = volumen;
                const volumenPorcentaje = document.getElementById("volumenPorcentaje");
                if (volumenPorcentaje) volumenPorcentaje.textContent = this.value + "%";
            });
        }

        document.addEventListener("click", function(event) {
            if (!controlVolumen.contains(event.target) && event.target !== botonMusica) {
                controlVolumen.classList.remove("visible");
            }
        });
    }

    if (CONFIG.musica.activarMusica !== false && CONFIG.musica.mostrarControlVolumen !== false) {
        crearControlVolumen();
    }

    if (botonMusica) {
        botonMusica.addEventListener("click", function(event) {
            event.stopPropagation();
            if (!musica) return;
            if (musica.paused) {
                musica.volume = CONFIG.musica.volumen;
                musica.play().then(function() { musicaReproduciendo = true; actualizarBotonMusica(); }).catch(function() {});
            } else {
                musica.pause();
                musicaReproduciendo = false;
                actualizarBotonMusica();
            }
        });
    }

    /* ==================================================
       ABRIR SOBRE CON MÚSICA
    ================================================== */

    if (sobre) {
        sobre.addEventListener("click", function() {
            if (sobreAbierto) return;
            sobreAbierto = true;
            sobre.classList.add("abierto");
            
            if (CONFIG.musica.activarMusica !== false && CONFIG.musica.iniciarAutomatico !== false && musica) {
                musica.volume = CONFIG.musica.volumen;
                musica.play().then(function() { musicaReproduciendo = true; actualizarBotonMusica(); }).catch(function(error) { console.log("Error música:", error); });
            }
            
            setTimeout(function() { if (portada) portada.classList.add("oculta"); }, 2500);
        });
    }

    /* ==================================================
       SISTEMA DE FASES
    ================================================== */

    function verificarModoPostBoda() {
        const ahora = new Date().getTime();
        if (ahora >= inicioDiaBodaTime && ahora < finDiaBodaTime) {
            document.body.classList.add("modo-dia-boda");
            document.body.classList.remove("modo-post-boda", "modo-post-boda-avanzado");
            if (portada) { portada.classList.add("oculta"); portada.style.display = "none"; }
            if (subirRecuerdos) subirRecuerdos.classList.add("activo");
            return;
        }
        if (ahora >= finDiaBodaTime) {
            const diferenciaDias = Math.floor((ahora - finDiaBodaTime) / (1000 * 60 * 60 * 24));
            document.body.classList.add("modo-post-boda");
            document.body.classList.remove("modo-dia-boda");
            if (portada) { portada.classList.add("oculta"); portada.style.display = "none"; }
            [botonMusica, botonNoche, botonInicio, botonMenu].forEach(function(boton) { if (boton) boton.style.display = "none"; });
            if (musica) { musica.pause(); musicaReproduciendo = false; }
            if (intervaloPetalos) { clearInterval(intervaloPetalos); intervaloPetalos = null; }
            mostrarContadorPostBoda(diferenciaDias);
            if (diferenciaDias > CONFIG.postBoda.diasActivosMensajesYFotos) {
                document.body.classList.add("modo-post-boda-avanzado");
            } else {
                document.body.classList.remove("modo-post-boda-avanzado");
                if (subirRecuerdos) subirRecuerdos.classList.add("activo");
            }
        }
    }

    function mostrarContadorPostBoda(diasPasados) {
        let contadorPostBoda = document.getElementById("contadorPostBoda");
        if (!contadorPostBoda) {
            contadorPostBoda = document.createElement("section");
            contadorPostBoda.id = "contadorPostBoda";
            contadorPostBoda.className = "seccion tarjeta animar-seccion visible";
            const invitacion = document.querySelector(".invitacion");
            if (invitacion) invitacion.insertBefore(contadorPostBoda, invitacion.firstChild);
        }
        const config = CONFIG.postBoda;
        contadorPostBoda.innerHTML = `
            <h2 class="titulo-seccion" style="opacity:1;transform:none;">${config.tituloNuevaEtapa}</h2>
            <div class="separador-familia separador-familia-visible"><span class="separador-diamante">✦</span></div>
            <p class="mensaje-seccion" style="opacity:1;transform:none;">${config.mensajeNuevaEtapa}</p>
            <div class="contador" style="opacity:1;transform:none;margin-top:20px;justify-content:center;">
                <div class="unidad-tiempo" style="max-width:200px;margin:0 auto;padding:20px;">
                    <span id="diasPostBoda" style="font-size:50px;">${diasPasados}</span>
                    <small>Días juntos</small>
                </div>
            </div>
            <p class="mensaje-seccion" style="opacity:1;transform:none;margin-top:15px;font-style:italic;">${config.mensajePostBoda.replace("{dias}", diasPasados)}</p>
            <div class="separador-familia"><span class="separador-diamante">✦</span></div>
            <p class="frase-grande" style="opacity:1;transform:none;font-size:32px;">¡Gracias por ser parte de nuestra historia!</p>
        `;
    }

    /* ==================================================
       MODO NOCTURNO
    ================================================== */

    function actualizarModoNoche() {
        const activo = document.body.classList.contains("modo-noche");
        if (botonNoche) botonNoche.textContent = activo ? "☀" : "☾";
        if (menuNoche) {
            const iconoNoche = menuNoche.querySelector(".icono-menu-noche");
            const textoNoche = menuNoche.querySelector("span:last-child");
            if (iconoNoche) iconoNoche.textContent = activo ? "☀" : "☾";
            if (textoNoche) textoNoche.textContent = activo ? "Modo claro" : "Modo nocturno";
        }
    }
    function cambiarModoNoche() {
        document.body.classList.toggle("modo-noche");
        const activo = document.body.classList.contains("modo-noche");
        localStorage.setItem("modoNoche", activo ? "true" : "false");
        actualizarModoNoche();
    }
    if (localStorage.getItem("modoNoche") === "true") document.body.classList.add("modo-noche");
    actualizarModoNoche();
    if (botonNoche) botonNoche.addEventListener("click", cambiarModoNoche);
    if (menuNoche) menuNoche.addEventListener("click", cambiarModoNoche);

    /* ==================================================
       MENÚ
    ================================================== */

    if (botonMenu && menu) botonMenu.addEventListener("click", function() { menu.classList.add("abierto"); });
    if (cerrarMenu && menu) cerrarMenu.addEventListener("click", function() { menu.classList.remove("abierto"); });
    if (menu) menu.addEventListener("click", function(event) { if (event.target === menu) menu.classList.remove("abierto"); });
    document.querySelectorAll(".enlace-menu").forEach(function(enlace) { enlace.addEventListener("click", function() { if (menu) menu.classList.remove("abierto"); }); });

    /* ==================================================
       BOTÓN INICIO
    ================================================== */

    function revisarBotonInicio() { if (!botonInicio) return; if (window.scrollY > 400) botonInicio.classList.add("visible"); else botonInicio.classList.remove("visible"); }
    window.addEventListener("scroll", revisarBotonInicio, { passive: true });
    revisarBotonInicio();
    if (botonInicio) botonInicio.addEventListener("click", function() { window.scrollTo({ top: 0, behavior: "smooth" }); });

    /* ==================================================
       CUENTA REGRESIVA
    ================================================== */

    function actualizarCuenta() {
        const ahora = new Date().getTime();
        const estadoBoda = document.getElementById("estadoBoda");
        let diferencia = fechaBoda - ahora;
        if (ahora < inicioDiaBodaTime) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
            colocarTexto("dias", String(dias));
            colocarTexto("horas", String(horas).padStart(2, "0"));
            colocarTexto("minutos", String(minutos).padStart(2, "0"));
            colocarTexto("segundos", String(segundos).padStart(2, "0"));
            if (estadoBoda) estadoBoda.textContent = CONFIG.cuentaRegresiva.mensajeAntesBoda;
        } else if (ahora >= inicioDiaBodaTime && ahora < finDiaBodaTime) {
            colocarTexto("dias", "00"); colocarTexto("horas", "00"); colocarTexto("minutos", "00"); colocarTexto("segundos", "00");
            if (estadoBoda) estadoBoda.textContent = CONFIG.cuentaRegresiva.mensajeDiaBoda;
        } else {
            colocarTexto("dias", "00"); colocarTexto("horas", "00"); colocarTexto("minutos", "00"); colocarTexto("segundos", "00");
            if (estadoBoda) estadoBoda.textContent = CONFIG.cuentaRegresiva.mensajeDespuesBoda;
        }
    }
    function colocarTexto(id, texto) { const elemento = document.getElementById(id); if (elemento) elemento.textContent = texto; }
    actualizarCuenta();
    setInterval(actualizarCuenta, 1000);

    /* ==================================================
       ANIMACIÓN DE SECCIONES
    ================================================== */

    const secciones = document.querySelectorAll(".animar-seccion");
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(function(entradas) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) { entrada.target.classList.add("visible"); observador.unobserve(entrada.target); }
            });
        }, { threshold: .1 });
        secciones.forEach(function(seccion) { observador.observe(seccion); });
    } else {
        secciones.forEach(function(seccion) { seccion.classList.add("visible"); });
    }

    /* ==================================================
       NOMBRES
    ================================================== */

    function escribirNombres() {
        if (!nombres || nombres.dataset.escrito === "true") return;
        nombres.dataset.escrito = "true";
        const texto = CONFIG.novios.nombreNovia + "\n&\n" + CONFIG.novios.nombreNovio;
        let posicion = 0;
        nombres.innerHTML = "";
        const cursor = document.createElement("span");
        cursor.className = "cursor-escritura";
        nombres.appendChild(cursor);
        function escribir() {
            if (posicion >= texto.length) { cursor.remove(); return; }
            const caracter = texto.charAt(posicion);
            if (caracter === "\n") { nombres.insertBefore(document.createElement("br"), cursor); } else { nombres.insertBefore(document.createTextNode(caracter), cursor); }
            posicion++;
            setTimeout(escribir, 80);
        }
        escribir();
    }
    if (nombres) {
        if ("IntersectionObserver" in window) {
            const obs = new IntersectionObserver(function(entradas) { entradas.forEach(function(entrada) { if (entrada.isIntersecting) { escribirNombres(); obs.unobserve(entrada.target); } }); }, { threshold: .3 });
            obs.observe(nombres);
        } else { escribirNombres(); }
    }

    /* ==================================================
       FAMILIA
    ================================================== */

    const familias = document.querySelectorAll(".familia-escritura");
    function escribirFamilia(elemento) {
        if (elemento.dataset.escrito === "true") return;
        elemento.dataset.escrito = "true";
        const nombresFamilia = elemento.dataset.texto.split("|");
        let personaActual = 0;
        function escribirPersona() {
            if (personaActual >= nombresFamilia.length) return;
            const nombre = nombresFamilia[personaActual];
            let posicion = 0;
            const cursor = document.createElement("span");
            cursor.className = "cursor-escritura";
            elemento.appendChild(cursor);
            function escribirLetra() {
                if (posicion >= nombre.length) { cursor.remove(); personaActual++; if (personaActual < nombresFamilia.length) { elemento.appendChild(document.createElement("br")); setTimeout(escribirPersona, 300); } return; }
                elemento.insertBefore(document.createTextNode(nombre.charAt(posicion)), cursor);
                posicion++;
                setTimeout(escribirLetra, 55);
            }
            escribirLetra();
        }
        escribirPersona();
    }
    if ("IntersectionObserver" in window) {
        const obsFamilia = new IntersectionObserver(function(entradas) { entradas.forEach(function(entrada) { if (entrada.isIntersecting) { escribirFamilia(entrada.target); obsFamilia.unobserve(entrada.target); } }); }, { threshold: .3 });
        familias.forEach(function(familia) { obsFamilia.observe(familia); });
    } else { familias.forEach(function(familia) { escribirFamilia(familia); }); }

    /* ==================================================
       VISOR DE IMÁGENES
    ================================================== */

    const imagenes = document.querySelectorAll(".foto, .monograma, .logo-lugar, .monograma-final");
    imagenes.forEach(function(imagen) { imagen.addEventListener("click", function(event) { event.preventDefault(); event.stopPropagation(); abrirImagen(imagen.src); }); });
    function abrirImagen(src) {
        if (!visorImagen || !imagenVisor) return;
        if (temporizadorImagen) clearTimeout(temporizadorImagen);
        visorAbierto = true;
        imagenVisor.src = src;
        imagenVisor.style.transition = "none";
        imagenVisor.style.transform = "scale(0.5)";
        imagenVisor.style.opacity = "0";
        visorImagen.classList.add("activo");
        setTimeout(function() { imagenVisor.style.transition = "transform 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.5s ease"; imagenVisor.style.transform = "scale(1)"; imagenVisor.style.opacity = "1"; }, 50);
        temporizadorImagen = setTimeout(cerrarImagen, 3000);
    }
    function cerrarImagen() {
        if (!visorImagen || !imagenVisor) return;
        imagenVisor.style.transition = "transform 0.5s cubic-bezier(.2,.8,.2,1), opacity 0.4s ease";
        imagenVisor.style.transform = "scale(0.5)";
        imagenVisor.style.opacity = "0";
        setTimeout(function() { visorImagen.classList.remove("activo"); visorAbierto = false; setTimeout(function() { if (!visorAbierto) { imagenVisor.src = ""; imagenVisor.style.transition = "none"; imagenVisor.style.transform = "scale(1)"; imagenVisor.style.opacity = "1"; } }, 100); }, 500);
        if (temporizadorImagen) { clearTimeout(temporizadorImagen); temporizadorImagen = null; }
    }
    if (visorImagen) visorImagen.addEventListener("click", function(event) { if (event.target === visorImagen) cerrarImagen(); });
    document.addEventListener("keydown", function(event) { if (event.key === "Escape" && visorAbierto) cerrarImagen(); });

    /* ==================================================
       GUARDAR FECHA
    ================================================== */

    if (guardarFecha) {
        guardarFecha.addEventListener("click", function() {
            const calendario = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Boda//ES","BEGIN:VEVENT","UID:boda-" + Date.now() + "@invitacion","DTSTAMP:" + new Date().toISOString().replace(/[-:]/g,"").split(".")[0] + "Z","DTSTART:" + CONFIG.novios.fechaBoda.replace(/[-:]/g,""),"SUMMARY:Boda de " + CONFIG.novios.nombreNovia + " y " + CONFIG.novios.nombreNovio,"LOCATION:" + CONFIG.iglesia.nombreIglesia,"DESCRIPTION:Ceremonia y recepción","END:VEVENT","END:VCALENDAR"].join("\r\n");
            const archivo = new Blob([calendario], { type: "text/calendar;charset=utf-8" });
            const url = URL.createObjectURL(archivo);
            const enlace = document.createElement("a");
            enlace.href = url;
            enlace.download = "Boda-" + CONFIG.novios.nombreNovia + "-y-" + CONFIG.novios.nombreNovio + ".ics";
            document.body.appendChild(enlace);
            enlace.click();
            enlace.remove();
            setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
        });
    }

    /* ==================================================
       FRASE SORPRESA
    ================================================== */

    if (botonSorpresa) {
        botonSorpresa.addEventListener("click", function() {
            if (!textoSorpresa) return;
            const indice = Math.floor(Math.random() * CONFIG.fraseSorpresa.frases.length);
            textoSorpresa.style.opacity = "0";
            setTimeout(function() { textoSorpresa.textContent = CONFIG.fraseSorpresa.frases[indice]; textoSorpresa.style.transition = "opacity .8s ease"; textoSorpresa.style.opacity = "1"; }, 200);
        });
    }

    /* ==================================================
       CLIMA PREMIUM
    ================================================== */

    function obtenerIconoClima(codigo) {
        if (codigo === 0) return "☀️";
        if (codigo === 1) return "🌤️";
        if (codigo === 2) return "⛅";
        if (codigo === 3) return "☁️";
        if (codigo === 45 || codigo === 48) return "🌫️";
        if (codigo >= 51 && codigo <= 57) return "🌦️";
        if (codigo >= 61 && codigo <= 67) return "🌧️";
        if (codigo >= 71 && codigo <= 77) return "🌨️";
        if (codigo >= 80 && codigo <= 82) return "🌦️";
        if (codigo >= 95) return "⛈️";
        return "🌤️";
    }

    function obtenerDescripcionClima(codigo) {
        const descripciones = {0:"Cielo despejado",1:"Mayormente despejado",2:"Parcialmente nublado",3:"Nublado",45:"Niebla",48:"Niebla con escarcha",51:"Llovizna ligera",53:"Llovizna moderada",55:"Llovizna intensa",61:"Lluvia ligera",63:"Lluvia moderada",65:"Lluvia intensa",71:"Nieve ligera",73:"Nieve moderada",75:"Nieve intensa",80:"Chubascos ligeros",81:"Chubascos moderados",82:"Chubascos intensos",95:"Tormenta",96:"Tormenta con granizo",99:"Tormenta severa"};
        return descripciones[codigo] || "Condiciones variables";
    }

    function obtenerDireccionViento(grados) {
        const direcciones = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
        return direcciones[Math.round(grados / 45) % 8];
    }

    async function actualizarClima() {
        if (!climaContenido) return;
        const ahora = new Date().getTime();
        const diasHasta = (inicioDiaBodaTime - ahora) / (1000 * 60 * 60 * 24);
        if (ahora >= finDiaBodaTime) {
            climaContenido.innerHTML = '<div class="clima-actual"><div class="clima-icono">💍</div><div><div class="clima-temperatura">¡Gracias!</div><div class="clima-descripcion">Por celebrar este día con nosotros</div></div></div>';
            return;
        }
        try {
            const url = "https://api.open-meteo.com/v1/forecast?latitude=" + CONFIG.clima.latitud + "&longitude=" + CONFIG.clima.longitud + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FMexico_City";
            const respuesta = await fetch(url, { cache: "no-store" });
            const datos = await respuesta.json();
            if (datos.current) {
                const temp = Math.round(datos.current.temperature_2m);
                const sensacion = Math.round(datos.current.apparent_temperature);
                const humedad = Math.round(datos.current.relative_humidity_2m);
                const viento = Math.round(datos.current.wind_speed_10m);
                const direccionViento = obtenerDireccionViento(datos.current.wind_direction_10m || 0);
                const icono = obtenerIconoClima(datos.current.weather_code);
                const descripcion = obtenerDescripcionClima(datos.current.weather_code);
                let html = '<div class="clima-actual"><div class="clima-icono">' + icono + '</div><div><div class="clima-temperatura">' + temp + '°C</div><div class="clima-descripcion">' + descripcion + '</div></div></div><div class="clima-detalles"><div class="clima-dato">🌡️ Sensación<br><strong>' + sensacion + '°C</strong></div><div class="clima-dato">💧 Humedad<br><strong>' + humedad + '%</strong></div><div class="clima-dato">💨 Viento<br><strong>' + viento + ' km/h ' + direccionViento + '</strong></div><div class="clima-dato">📍 Lugar<br><strong>Chiconautla</strong></div></div>';
                if (diasHasta <= 16 && diasHasta >= 0 && datos.daily) {
                    const max = Math.round(datos.daily.temperature_2m_max[0]);
                    const min = Math.round(datos.daily.temperature_2m_min[0]);
                    const lluvia = datos.daily.precipitation_probability_max[0];
                    html += '<div style="margin-top:15px;padding-top:15px;border-top:2px solid #c9ae7a;"><p><strong>📅 Pronóstico para el 14 de Noviembre:</strong></p><div class="clima-detalles"><div class="clima-dato">🌡️ Máx.<br><strong>' + max + '°C</strong></div><div class="clima-dato">❄️ Mín.<br><strong>' + min + '°C</strong></div><div class="clima-dato">☔ Lluvia<br><strong>' + lluvia + '%</strong></div></div></div>';
                    if (recomendacionClima) {
                        let recomendacion = "💡 ";
                        if (max >= 27) recomendacion += "Lleva ropa ligera. ";
                        else if (max <= 15) recomendacion += "Lleva algo para cubrirte del frío. ";
                        else recomendacion += "Temperatura agradable. ";
                        if (lluvia > 40) recomendacion += "Considera llevar paraguas.";
                        else recomendacion += "Sin probabilidad alta de lluvia.";
                        recomendacionClima.textContent = recomendacion;
                    }
                }
                climaContenido.innerHTML = html;
            }
        } catch (error) {
            climaContenido.innerHTML = '<div class="clima-actual"><div class="clima-icono">🌤️</div><div><div class="clima-descripcion">No fue posible consultar el clima</div></div></div>';
        }
    }
    actualizarClima();
    setInterval(actualizarClima, 30 * 60 * 1000);

    /* ==================================================
       INICIALIZACIÓN
    ================================================== */

    iniciarPetalos();
    if (pantallaCarga) { animarCarga(); } else { document.body.classList.add("cargado"); }
    verificarModoPostBoda();
    setInterval(verificarModoPostBoda, 60 * 60 * 1000);
});