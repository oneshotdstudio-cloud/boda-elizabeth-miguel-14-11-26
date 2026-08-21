/* ==================================================
   ⚙️ ARCHIVO DE CONFIGURACIÓN - PLANTILLA DE INVITACIÓN
   ==================================================
   📝 INSTRUCCIONES:
   - Modifica los valores entre comillas ("texto")
   - true = mostrar sección | false = ocultar sección
   - Los números van sin comillas (ejemplo: 19.645)
   - No borres las comas (,) ni las llaves ({ })
   - Guarda los cambios y actualiza la página
   ================================================== */

const CONFIG = {

    /* ============================================
       💑 DATOS DE LOS NOVIOS
    ============================================ */
    novios: {
        nombreNovia: "Elizabeth",
        nombreNovio: "Miguel",
        inicialesSello: "E&M",
        fechaBoda: "2026-11-14T16:00:00",
        fechaCorta: "14 · Noviembre · 2026",
        fraseInvitacion: "Tenemos el honor de invitarte a celebrar nuestra boda",
        poema: '"Dos almas, dos historias y un mismo destino."',
        poemaAdicional: "Hoy comienza nuestro para siempre.",
        fraseAcompanos: "Acompáñanos a dar el sí y después a festejar"
    },

    /* ============================================
       👨‍👩‍👧 FAMILIA
    ============================================ */
    familia: {
        mostrarFamilia: true,
        tituloFamilia: "Con la alegría de nuestras familias",
        mostrarPadresNovio: true,
        tituloPadresNovio: "Padres del novio",
        padresNovio: ["Magdalena Carmona", "Miguel Martel"],
        mostrarPadresNovia: true,
        tituloPadresNovia: "Padres de la novia",
        padresNovia: ["Isabel Corona Cid", "Mario Garcia Martinez †"],
        mostrarPadrinos: true,
        tituloPadrinos: "Padrinos",
        padrinos: ["Magdalena Carmona", "Miguel Martel"]
    },

    /* ============================================
       ⛪ CEREMONIA (IGLESIA)
    ============================================ */
    iglesia: {
        mostrarIglesia: true,
        tituloIglesia: "IGLESIA",
        nombreIglesia: "Parroquia Santo Tomas Apóstol de Chiconautla",
        direccionIglesia: "Progreso Manzana 016, Santo Tomas Chiconautla",
        horaIglesia: "4:00 PM",
        fechaIglesia: "14 · NOVIEMBRE · 2026",
        mapaIglesia: "https://maps.app.goo.gl/fJZn5xmWthUKQSaW8",
        logoIglesia: "img/Iglesia.png",
        fotoIglesia: "img/Iglesia.jpg"
    },

    /* ============================================
       🥂 RECEPCIÓN
    ============================================ */
    recepcion: {
        mostrarRecepcion: true,
        tituloRecepcion: "RECEPCIÓN",
        nombreRecepcion: "Salón de evento",
        direccionRecepcion: "Miguel Hidalgo Manzana 007, Santo Tomas Chiconautla, 55066 Ecatepec de Morelos, Méx.",
        horaRecepcion: "7:00 PM",
        fechaRecepcion: "14 · NOVIEMBRE · 2026",
        mapaRecepcion: "https://maps.app.goo.gl/Stck4Fa9NsJjvzJR9",
        logoRecepcion: "img/Recepcion.png",
        fotoRecepcion: "img/Salon.jpg"
    },

    /* ============================================
       📅 ITINERARIO
    ============================================ */
    itinerario: {
        mostrarItinerario: true,
        tituloItinerario: "NUESTRO GRAN DÍA",
        evento1: {
            hora: "4:00 PM",
            icono: "⛪",
            nombre: "Ceremonia"
        },
        evento2: {
            hora: "7:00 PM",
            icono: "🥂",
            nombre: "Recepción"
        }
    },

    /* ============================================
       👗 VESTIMENTA
    ============================================ */
    vestimenta: {
        mostrarVestimenta: true,
        tituloVestimenta: "CÓDIGO DE VESTIMENTA",
        hombres: "Guapos",
        mujeres: "Hermosas",
        coloresReservados: ["Rojo", "Blanco", "Negro", "Verde cemento"],
        notaVestimenta: "Evita utilizar estos colores.",
        fotoVestimenta: "img/Vestimenta.jpg"
    },

    /* ============================================
       💌 CONFIRMACIÓN DE ASISTENCIA
    ============================================ */
    confirmacion: {
        mostrarConfirmacion: true,
        tituloConfirmacion: "CONFIRMA TU ASISTENCIA",
        mensajeConfirmacion: "Nos encantará compartir este momento tan especial contigo. Por favor confirma tu asistencia a través del siguiente formulario.",
        linkFormularioConfirmacion: "https://forms.gle/SNaW8fcxhBrnvpQc6",
        textoBotonConfirmacion: "📝 Confirmar asistencia",
        notaFormulario: "Se abrirá un formulario de Google"
    },

    /* ============================================
       💕 LIBRO DE MENSAJES
    ============================================ */
    mensajes: {
        mostrarMensajes: true,
        tituloMensajes: "LIBRO DE MENSAJES",
        mensajeMensajes: "Déjanos unas palabras para recordar este día para siempre.",
        linkFormularioMensajes: "https://forms.gle/JUic859VobR3FCD79",
        textoBotonMensajes: "💌 Dejar mi mensaje",
        notaFormularioMensajes: "Se abrirá un formulario de Google"
    },

    /* ============================================
       📸 RECUERDOS (SUBIR ARCHIVOS)
    ============================================ */
    recuerdos: {
        mostrarRecuerdos: true,
        tituloRecuerdos: "RECUERDOS",
        mensajeAntesBoda: "Nuestro gran día está por llegar",
        mensajeDespuesBoda: "Comparte tus recuerdos con nosotros",
        linkSubirArchivos: "https://driveuploader.com/upload/zRKkodq9Cu/",
        textoBotonSubir: "📤 Subir fotos y videos",
        notaUploader: "Se abrirá una página para subir archivos",
        activarSiempre: true
    },

    /* ============================================
       ✨ FRASE SORPRESA
    ============================================ */
    fraseSorpresa: {
        mostrarFraseSorpresa: true,
        tituloFraseSorpresa: "UNA FRASE PARA USTEDES",
        mensajeFraseSorpresa: "Toca el botón para descubrir una pequeña sorpresa.",
        textoBotonSorpresa: "✨ Descubrir",
        frases: [
            "Que su amor sea siempre el lugar al que quieran volver.",
            "El amor no necesita ser perfecto, solo verdadero.",
            "Hoy comienza una historia que merece ser contada toda la vida.",
            "Que nunca les falten motivos para seguir eligiéndose.",
            "Dos corazones, una historia y toda una vida por compartir.",
            "Que cada día juntos sea mejor que el anterior.",
            "El verdadero amor es el que se construye todos los días."
        ]
    },

    /* ============================================
       ☀️ CLIMA
    ============================================ */
    clima: {
        mostrarClima: true,
        tituloClima: "CLIMA",
        mensajeClima: "Temperatura actual y pronóstico para nuestro gran día.",
        latitud: 19.645,
        longitud: -99.061
    },

    /* ============================================
       ⏰ CUENTA REGRESIVA
    ============================================ */
    cuentaRegresiva: {
        mostrarCuentaRegresiva: true,
        tituloCuenta: "FALTAN",
        mensajeAntesBoda: "Nuestro gran día está por llegar",
        mensajeDiaBoda: "¡Hoy estamos celebrando!",
        mensajeDespuesBoda: "Gracias por formar parte de nuestro día"
    },

    /* ============================================
       💍 CIERRE
    ============================================ */
    cierre: {
        mostrarCierre: true,
        tituloCierre: "¡TE ESPERAMOS!",
        mensajeCierre: "El mejor regalo será contar con tu presencia en este día tan especial. Gracias por formar parte de nuestra historia.",
        fechaCierre: "14 · Noviembre · 2026"
    },

    /* ============================================
       ✦ CONTACTO COMERCIAL
    ============================================ */
    contactoComercial: {
        mostrarContactoComercial: true,
        tituloContacto: "¿Te gustaría una invitación como esta?",
        textoBotonContacto: "✨ Contáctanos",
        linkContacto: "https://wa.me/525581300404?text=Hola,%20me%20interesa%20una%20invitación%20digital"
    },

    /* ============================================
       🖼️ IMÁGENES PRINCIPALES
    ============================================ */
    imagenes: {
        fondoPortada: "img/Fondo.jpg",
        monograma: "img/Monograma.png",
        sello: "img/sello.png",
        fotoNovios1: "img/FotoNovios.jpg",
        fotoNovios2: "img/FotoNovios2.jpg",
        musica: "musica/cancion.mp3"
    },

    /* ============================================
       🎵 MÚSICA
    ============================================ */
    musica: {
        activarMusica: true,
        volumen: 0.6,
        iniciarAutomatico: true,
        mostrarControlVolumen: true
    },

    /* ============================================
       ✨ EFECTOS VISUALES
    ============================================ */
    efectos: {
        petalos: true,
        confeti: true,
        destellos: true,
        particulas: true,
        modoNocturno: true
    },

    /* ============================================
       📱 TEXTO DE PORTADA
    ============================================ */
    portada: {
        textoApertura: "Toca el sobre para abrir",
        textoInferior: "Invitación de boda"
    },

    /* ============================================
       🔄 CONFIGURACIÓN POST-BODA
    ============================================ */
    postBoda: {
        mostrarContadorPostBoda: true,
        tituloNuevaEtapa: "UNA NUEVA ETAPA COMIENZA",
        mensajeNuevaEtapa: "El evento ha terminado, pero comienza una nueva etapa llena de amor y bendiciones.",
        mensajePostBoda: "Han pasado {dias} días desde que comenzamos esta nueva etapa juntos. Gracias por ser parte de nuestra historia.",
        diasActivosMensajesYFotos: 30,
        mostrarFotosDiaBoda: true,
        mostrarMensajesDiaBoda: true,
        mostrarContactoDiaBoda: true
    }
};