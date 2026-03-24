// Estado inicial para medir el tiempo antes de cambiar de idioma.
let idiomaActual = 'es';
let tiempoInicio = Date.now();

// Diccionario de textos por idioma para el bloque principal (hero).
const textos = {
    es: {
        title: 'Profe Rick',
        description: years => `Ingeniero de software con ${years} años de experiencia en la industria en puestos como desarrollador Front End, Back End y Fullstack.`
    },
    en: {
        title: 'Mr Rick',
        description: years => `Software engineer with ${years} years of industry experience working as a Front End, Back End, and Fullstack developer.`
    },
    jp: {
        title: 'プロフェ・リック',
        description: years => `フロントエンド、バックエンド、フルスタック開発者として、業界で${years}年の経験を持つソフトウェアエンジニアです。`
    }
};

// Cambia el idioma del hero, calcula tiempo en idioma anterior y lo reporta a GA4.
function cambiarIdioma(nuevoIdioma) {
    // Evita cambios inválidos o repetir el mismo idioma.
    if (!textos[nuevoIdioma] || nuevoIdioma === idiomaActual) {
        return;
    }

    const idiomaAnterior = idiomaActual;

    // Tiempo transcurrido en el idioma actual (en segundos).
    const tiempoFin = Date.now();
    const segundos = Math.max(0, Math.round((tiempoFin - tiempoInicio) / 1000));

    // Recalcula años de experiencia para incrustarlos en el texto traducido.
    const yearsExperience = new Date().getFullYear() - 2015;
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');

    // Se valida que los nodos existan para evitar errores si el ID no está presente en el DOM.
    if (heroTitle) {
        heroTitle.textContent = textos[nuevoIdioma].title;
    }

    if (heroDescription) {
        heroDescription.textContent = textos[nuevoIdioma].description(yearsExperience);
    }

    // Reinicia el cronómetro inmediatamente para que el siguiente cambio cuente desde cero.
    idiomaActual = nuevoIdioma;
    tiempoInicio = Date.now();

    // Envía evento personalizado a Google Analytics 4 si gtag está disponible.
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cambio_de_idioma', {
            idioma_anterior: idiomaAnterior,
            idioma_nuevo: nuevoIdioma,
            tiempo_en_idioma: segundos
        });
    }
}

// Gestiona interacciones generales del layout: menu, fechas, tema y botón "volver arriba".
function LayoutManager() {
    this.init = () => {
        this.initMenu();
        this.initDates();
        this.initBackToTop();
        this.initTheme();
    }

    // Abre/cierra menú móvil y lo cierra al seleccionar un enlace.
    this.initMenu = () => {
        const primaryNav = document.querySelector('.primaryNav');
        const menuButton = document.getElementById('menuButton');
        const navLinks = primaryNav.querySelectorAll('a');

        menuButton.addEventListener('click', () => {
            primaryNav.toggleAttribute('aria-expanded');
            menuButton.toggleAttribute('aria-expanded');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.removeAttribute('aria-expanded');
                menuButton.removeAttribute('aria-expanded');
            });
        });
    }

    // Inserta año actual y años de experiencia/empresa en los spans del HTML.
    this.initDates = () => {
        const currentYear = new Date().getFullYear();
        const yearsExperience =  currentYear - 2015;
        const yearsEntrepreneur = currentYear - 2021;

        const expSpans = document.querySelectorAll('.years_experience');
        const entSpans = document.querySelectorAll('.years_entrepreneur');
        const yearSpan = document.getElementById('year_current');
        
        expSpans.forEach(span => span.textContent = yearsExperience);
        entSpans.forEach(span => span.textContent = yearsEntrepreneur);
        yearSpan.textContent = currentYear;
    }
    
    // Muestra botón de "back to top" al hacer scroll y permite volver al inicio.
    this.initBackToTop = () => {
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            let scrollpos = window.scrollY;
        
            if (scrollpos >= 200) {
                backToTop.setAttribute('aria-hidden', 'false');
            } else {
                backToTop.setAttribute('aria-hidden', 'true');
            }
        });
        
        backToTop.addEventListener('click', () => {
            document.querySelector('#content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Conecta el botón de tema con el método que alterna claro/oscuro.
    this.initTheme = () => {
        const theme_button = document.querySelector('.theme_button');
        theme_button.addEventListener('click', this.switchTheme);
    }

    // Aplica clase de tema al body.
    this.setTheme = preference => {
        const body = document.body;
        body.classList.remove('theme-light');
        body.classList.remove('theme-dark');
        body.classList.add(preference);
    }

    // Alterna entre tema claro y oscuro.
    this.switchTheme = () => {
        const body = document.body;
        body.classList.contains('theme-light') ? this.setTheme('theme-dark') : this.setTheme('theme-light');
    }
}

// Inicializa el layout cuando el DOM está listo.
document.addEventListener('DOMContentLoaded', () => {
    const layoutManager = new LayoutManager;
    layoutManager.init();
})



