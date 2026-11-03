# PaginaWebEstructurasHL
Página de presentación de Estructuras HL. Sitio estático; abrir `index.html` para consultar la versión de respaldo. Para probar la carga del contenido administrable, servir el directorio por HTTP, por ejemplo con `python3 -m http.server 8080`.

## Pendientes antes de publicar comercialmente

- Confirmar el teléfono `+57 300 123 4567`: parece un número de ejemplo y se conserva del sitio original, no está verificado. Se encuentra en `index.html`, `script.js` y `docs/portafolio.html`.
- Verificar que `contacto@estructurashl.com` existe y recibe correo. Es el buzón ya presente en el sitio original, no se ha creado ni probado una cuenta.
- Confirmar direcciones, cobertura, materiales disponibles, plazos típicos y garantía. No se inventan cifras ni promesas de entrega.
- Aprobar la política de `privacidad.html`, completar NIT, identificación legal, retención y vigencia, y verificar los canales para ejercer derechos. Es un borrador, no una certificación de cumplimiento.
- Sustituir referencias por fotografías propias autorizadas; no se presentan fotos urbanas genéricas como sedes. Las imágenes actuales son ejemplos y el sitio lo advierte.
- La sección de reseñas contiene tres perfiles y comentarios ficticios, identificados por un único aviso visible al inicio de la sección. Sustituirlos por testimonios reales con autorización antes de usarlos como prueba social; no quitar el aviso para presentarlos como auténticos. Las cifras de experiencia siguen pendientes de documentación.
- Facebook e Instagram se omiten hasta disponer de sus URL oficiales; no publicar enlaces `#` ni inventar perfiles.
- El envío por correo utiliza Netlify Forms y requiere activar la detección de formularios y las notificaciones en el sitio desplegado. Revisar tratamiento, conservación y acceso a los registros antes de recibir solicitudes reales. WhatsApp sigue abriéndose para que el cliente confirme el mensaje.

## Recepción y correo automático

El formulario `cotizacion` se envía mediante POST a Netlify Forms, sin abrir el cliente de correo. Tiene protección honeypot, consentimiento obligatorio y versión de política. Mientras envía desactiva ambos botones; ante un error conserva los campos y permite reintentar o usar WhatsApp. Solo borra los campos después de una respuesta satisfactoria.

Configuración necesaria en Netlify (no se puede activar desde el HTML):

1. Abrir el proyecto y activar **Forms > Enable form detection**.
2. Desplegar esta versión y comprobar que aparece el formulario **cotizacion**.
3. En **Forms > Submission notifications > Add notification**, crear una notificación de correo para ese formulario al buzón de atención verificado. Netlify exige que el destinatario sea un miembro activo del equipo; si se usa `contacto@estructurashl.com`, debe cumplir ese requisito.
4. Enviar una prueba desde la URL desplegada y verificar tanto el registro en Forms como la llegada al buzón. Revisar spam y los límites del plan.

El campo `email` establece Reply-To para responder al cliente. La confirmación de recepción del formulario no demuestra que la notificación de correo haya llegado; no se envía automáticamente un correo de confirmación al cliente.

El servidor local `python3 -m http.server` no implementa Netlify Forms: un POST local falla y debe mostrar el mensaje de error, no un éxito ficticio. Para pruebas de interfaz se pueden simular respuestas HTTP sin enviar datos reales. Documentación: [configuración de formularios](https://docs.netlify.com/manage/forms/setup/) y [notificaciones](https://docs.netlify.com/manage/forms/notifications/).

## Imágenes

Los servicios usan iconos sobre una textura de acero; no se muestran las antiguas fotos de interiores. La portada usa soldadura a 1600 × 1000. La galería contiene piezas metálicas concretas, verificadas visualmente, convertidas a WebP de 960 × 640 con recorte 3:2 y sobreimpresión oscura uniforme. No son obras de la empresa.

| Archivo en `img/` | Fuente y licencia |
| --- | --- |
| soldadura-portada.webp | [Unsplash, photo-1504917595217-d4dc5ebe6122](https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122), licencia Unsplash |
| referencia-porton.webp | [Francesco Bini (Sailko), Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Via_jacopo_nardi_3,_palazzina_con_decorazioni_liberty,_02_cancellata.jpg), CC BY-SA 4.0 |
| referencia-baranda.webp | [Editorq35, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Stainless_steel_railing.jpg), CC BY 4.0 |
| referencia-perfil.webp | [Sastognuti, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Stahltr%C3%A4ger_(steel_profile).jpg), CC BY-SA 4.0 |

Los créditos y enlaces de licencia también aparecen bajo la galería. Las adaptaciones de portón y perfil se ofrecen bajo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); la baranda bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). El emblema original se conserva en la cabecera, el pie y Open Graph. Los títulos usan rojo de marca sobre fondos claros y rojo claro sobre fondos oscuros. Las antiguas imágenes permanecen en el repositorio pero no se cargan en la página.

En el CMS, subir solo fotografías pertinentes y autorizadas. Un servicio sin foto muestra automáticamente su icono; los filtros sin imágenes se ocultan al cargar el contenido.

## Verificación

- Sintaxis: `node --check script.js`.
- Navegador: comprobar cada botón de cotización, filtros y `aria-pressed`, ampliación/cierre de imágenes por teclado, formulario inválido/válido y consentimiento obligatorio. WhatsApp conserva los datos; el envío directo los conserva si falla y los limpia si el servicio confirma recepción. Probar bloqueo de duplicados y recuperación tras error de red o HTTP.
- Revisar escritorio y móvil, foco visible, contraste y política accesible también desde el pie móvil.
- Lighthouse puede ejecutarse contra el servidor local; PageSpeed Insights requiere una URL pública con estos cambios desplegados. No evaluar la versión anterior como si fuera esta revisión.
