# Invitación Digital - 15 Años de Amelia

Una aplicación web moderna, interactiva y 100% optimizada para dispositivos móviles (Mobile-First) diseñada para enviarse por WhatsApp.

## Características Principales

1. **Sobre Virtual de Entrada:**
   - Animación de sobre de gala con monograma y la corona oficial de Amelia.
   - Apertura con efecto tridimensional y lluvia de confeti.

2. **Cielo Nocturno Estrellado:**
   - Más de 50 estrellas dinámicas con movimiento suave y destellos flotantes.
   - Estrellas fugaces que cruzan diagonalmente el firmamento con estelas luminosas.

3. **Carrusel 3D Circular:**
   - Inspirado en React Bits `CircularCarousel`.
   - Gira solo de forma automática cada 3.2 segundos.
   - Permite arrastrar con el dedo (*touch drag*) con inercia.
   - Tocar cualquier foto frontal abre el visor en alta definición.

4. **Ubicación con Google Maps Embebido:**
   - Mapa interactivo embebido directamente en la tarjeta de la fiesta.
   - Centrado en **Casa de Amelia** (Barriada San Judas Tadeo calle 3ra).
   - Botones directos para abrir en **Google Maps**, **Waze** y **Guardar en Google Calendar**.

5. **Confirmación de Asistencia (RSVP):**
   - Formulario sencillo y sin fricción (Nombre, Pases, Teléfono y Mensaje).
   - Generación instantánea de **Pase Digital**.
   - Notificación directa a la familia por WhatsApp con mensaje pre-redactado sin emojis.
   - Sincronización en tiempo real con **Google Sheets**.

6. **Botón Flotante:**
   - Botón fijo que acompaña al usuario para acceder en 1 toque directo a la confirmación de asistencia.

7. **Música de Fondo:**
   - Controlador flotante de audio.
   - Si deseas usar una canción específica de Amelia, simplemente coloca el archivo de audio con el nombre `music.mp3` dentro de la carpeta `public/` y se reproducirá automáticamente.

---

## Cómo Publicar la Web en Internet (Para enviar el enlace por WhatsApp)

Para que cualquier persona pueda abrir la invitación en su celular desde cualquier parte del mundo sin necesidad de que tu computadora esté encendida:

### Opción 1: Despliegue en Vercel (Recomendado - Gratuito)
1. Instala Vercel CLI o sube tu carpeta a GitHub.
2. Si usas la terminal, corre:
   ```bash
   npx vercel
   ```
3. Sigue las instrucciones en pantalla (presiona Enter a las opciones predeterminadas).
4. Al finalizar, obtendrás un enlace instantáneo tipo: `https://invitacion-amelia.vercel.app` listo para compartir por WhatsApp.

### Opción 2: Netlify Drop (Sin comandos)
1. Corre `npm run build` en tu proyecto (la carpeta de producción `dist` ya está generada).
2. Entra a [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Arrastra la carpeta `dist` directamente a la página.
4. En 10 segundos tendrás tu enlace público HTTPS activo.

---

## Sincronización con Google Sheets
El Webhook ya se encuentra configurado y enlazado en `src/config.js`. Cada confirmación que los invitados hagan desde la web aparecerá automáticamente como una nueva fila en tu hoja de cálculo.

