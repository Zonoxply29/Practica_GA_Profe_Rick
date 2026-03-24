# proferick.com

Este es el repositorio del código fuente para el sitio web **proferick.com**. El proyecto está configurado con un flujo de trabajo de desarrollo que automatiza la compilación y minificación de SASS y JavaScript.

## Tecnologías Utilizadas

-   **SASS**: Para la escritura de estilos CSS de forma modular y avanzada.
-   **JavaScript**: Minificado para producción utilizando `esbuild`.
-   **Font Awesome**: Se utiliza una versión personalizada para optimizar el peso del archivo final. Solo se compilan los íconos necesarios, que se activan descomentando las variables correspondientes en el archivo `src/scss/fonts/fontawesome/_variables.scss`.
-   **Prism**: Para mostrar bloques de código en la página (sección mentorías).
-   **Nodemon**: Para observar cambios en los archivos JavaScript y reconstruirlos automáticamente.
-   **npm-run-all**: Para ejecutar múltiples scripts de npm en paralelo.

## Requisitos Previos

-   [Node.js](https://nodejs.org/) y npm.

## Instalación

1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone git@github.com:GiseaSoft/proferick.com.git
    ```

2.  Navega al directorio del proyecto:
    ```bash
    cd proferick.com
    ```

3.  Instala las dependencias de desarrollo:
    ```bash
    npm install
    ```

## Uso

### Entorno de Desarrollo

Para iniciar el entorno de desarrollo, ejecuta el siguiente comando. Este compilará los archivos SASS y JavaScript, y quedará a la espera de cambios para reconstruirlos automáticamente.

```bash
npm start
```

El comando `npm start` ejecuta las siguientes tareas en paralelo:
-   **Compilación de SASS**: Compila los archivos de `src/scss/` a `assets/css/` en formato minificado.
-   **Minificación de JavaScript**: Observa los cambios en `src/js/` y utiliza `esbuild` para minificar los archivos en `assets/js/`.

### Visualización

Para visualizar el sitio y ver los cambios en tiempo real, se recomienda usar la extensión **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** para Visual Studio Code.

Una vez instalada, haz clic derecho sobre tu archivo `index.html` y selecciona `Open with Live Server`.
---


## Bitácora de Implementación (Práctica GA4)

### Resumen

Se implementó un selector de idioma en el menú principal para actualizar el texto del hero y registrar la interacción como evento en Google Analytics 4.

### Objetivo de la práctica

-   Cambiar idioma en interfaz con opciones `es`, `en`, `jp`.
-   Medir tiempo que el usuario permanece en un idioma antes de cambiar.
-   Enviar evento personalizado a GA4 para análisis de comportamiento.

### Cambios realizados

1.  **Menú de idioma en navegación**
-   Se agregó un submenú `Idioma` en `index.html`.
-   Cada opción usa `onclick="cambiarIdioma('xx')"` con enlaces `<a>`.

2.  **Bloque objetivo para traducción**
-   Se identificó el hero para actualización dinámica con IDs:
    -   `hero-title`
    -   `hero-description`

3.  **Lógica JavaScript (archivo fuente)**
-   Archivo: `src/js/main.js`
-   Se agregó:
    -   Estado de idioma actual (`idiomaActual`).
    -   Cronómetro de permanencia (`tiempoInicio`).
    -   Diccionario `textos` por idioma.
    -   Función `cambiarIdioma(nuevoIdioma)`.

4.  **Evento personalizado a GA4**
-   Evento: `cambio_de_idioma`
-   Parámetros enviados:
    -   `idioma_anterior`
    -   `idioma_nuevo`
    -   `tiempo_en_idioma` (segundos)

5.  **Validaciones implementadas**
-   Si el idioma no existe o es el mismo, no se procesa el cambio.
-   Se valida existencia de nodos (`heroTitle`, `heroDescription`) antes de modificar `textContent` para evitar errores de DOM.

### Flujo de la función `cambiarIdioma`

1.  Valida idioma de entrada.
2.  Calcula segundos desde el último cambio.
3.  Envía evento a GA4 (si `gtag` está disponible).
4.  Actualiza título y descripción del hero.
5.  Actualiza estado interno y reinicia cronómetro.

### Archivos involucrados

-   `index.html` (submenú y elementos de texto objetivo)
-   `src/js/main.js` (lógica principal, legible)
-   `assets/js/main.js` (salida minificada para producción)

### Nota de build

-   Editar siempre en `src/js/main.js`.
-   Para reflejar cambios en sitio final:

```bash
npm run js:build
```

-   O usar watch automático con:

```bash
npm start
```

### Cómo validar la práctica

1.  Abrir el sitio y cambiar idioma desde el submenú.
2.  Confirmar que cambia el texto del hero.
3.  Revisar en GA4 DebugView que se reciba `cambio_de_idioma` con sus parámetros.



