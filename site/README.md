# LibroIA landing

Sitio estático en español. Ejecutar `npm run dev` y abrir http://localhost:4173.

Los archivos públicos están en `dist/`. El APK se conserva en fragmentos de 8 MiB en `dist/assets/apk/` para respetar los límites del alojamiento. Los botones descargan y verifican SHA-256 de cada fragmento y ofrecen un único APK con los bytes originales. Requiere JavaScript y HTTPS (o localhost). La interfaz muestra progreso, cancelación, errores y un enlace de guardado manual.

APK: 140925185 bytes. SHA-256: `913ab98570fe60983d713160245a31f8d83f06da1acf6c3beacffc005314cf2c`.

El mockup principal usa la captura real proporcionada por el propietario en `dist/assets/libroia-home.png`. El contenido de los ejemplos es editorial e ilustrativo. La landing no llama servicios de IA ni recopila datos.

Tipografía: Manrope vía Google Fonts, con alternativa Arial local.
