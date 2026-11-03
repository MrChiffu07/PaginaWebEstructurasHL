# PaginaWebEstructurasHL
Página de presentación de Estructuras HL. Sitio estático; abrir `index.html` para consultar la versión de respaldo. Para probar la carga del contenido administrable, servir el directorio por HTTP, por ejemplo con `python3 -m http.server 8080`.

## Pendientes antes de publicar comercialmente

- Confirmar el teléfono `+57 300 123 4567`: parece un número de ejemplo y se conserva del sitio original, no está verificado. Se encuentra en `index.html`, `script.js` y `docs/portafolio.html`.
- Verificar que `contacto@estructurashl.com` existe y recibe correo. Es el buzón ya presente en el sitio original, no se ha creado ni probado una cuenta.
- Confirmar direcciones, cobertura, materiales disponibles, plazos típicos y garantía. No se inventan cifras ni promesas de entrega.
- Aprobar la política de `privacidad.html`, completar NIT, identificación legal, retención y vigencia, y verificar los canales para ejercer derechos. Es un borrador, no una certificación de cumplimiento.
- Sustituir referencias por fotografías propias autorizadas; no se presentan fotos urbanas genéricas como sedes. Las imágenes actuales son ejemplos y el sitio lo advierte.
- La sección de reseñas contiene tres perfiles y comentarios ficticios, identificados como ejemplos tanto en el encabezado como en cada tarjeta. Sustituirlos por testimonios reales con autorización antes de usarlos como prueba social; no quitar las etiquetas para presentarlos como auténticos. Las cifras de experiencia siguen pendientes de documentación.
- Facebook e Instagram se omiten hasta disponer de sus URL oficiales; no publicar enlaces `#` ni inventar perfiles.
- El formulario prepara mensajes para WhatsApp o el cliente de correo; no hay servidor de recepción, confirmación de entrega ni registro de consentimientos. Para un respaldo independiente de esas aplicaciones se necesita un servicio de formularios con tratamiento de datos aprobado.

## Imágenes

Referencias de Unsplash descargadas como WebP con calidad 75, sin hotlinks en la página. Miniaturas de 640 × 426, imagen de nosotros de 800 × 600 y portada de 1600 × 1000. El logotipo existente se mantiene como favicon y Open Graph.

| Archivo en `img/` | Identificador de la fuente en Unsplash |
| --- | --- |
| ejemplo-portada.webp | photo-1600607687920-4e2a09cf159d |
| ejemplo-rejas.webp | photo-1600607687939-ce8a6c25118c |
| ejemplo-puertas.webp | photo-1506377295352-e3154d43ea9e |
| ejemplo-ventanas.webp | photo-1600566753086-00f18fb6b3ea |
| ejemplo-barandas.webp | photo-1600585154340-be6161a56a0c |
| ejemplo-estructuras.webp | photo-1486406146926-c627a92ad1ab |
| ejemplo-soldadura.webp | photo-1504917595217-d4dc5ebe6122 |
| ejemplo-taller.webp | photo-1487958449943-2429e8be8625 |
| ejemplo-escalera.webp | photo-1600566753190-17f0baa2a6c3 |
| ejemplo-cubierta.webp | photo-1511818966892-d7d671e672a2 |
| ejemplo-ventanales.webp | photo-1600585154526-990dced4db0d |

Las fuentes originales se consultan en `https://images.unsplash.com/` seguido del identificador. Revisar licencia y pertinencia antes de su uso comercial. Los títulos describen referencias, no obras de la empresa.

## Verificación

- Sintaxis: `node --check script.js`.
- Navegador: comprobar cada botón de cotización, filtros y `aria-pressed`, ampliación/cierre de imágenes por teclado, formulario inválido/válido, consentimiento obligatorio y ambos canales sin borrar datos.
- Revisar escritorio y móvil, foco visible, contraste y política accesible también desde el pie móvil.
- Lighthouse puede ejecutarse contra el servidor local; PageSpeed Insights requiere una URL pública con estos cambios desplegados. No evaluar la versión anterior como si fuera esta revisión.
