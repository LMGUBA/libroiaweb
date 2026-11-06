# LibroIA: comprobación de entrega

URL pública: https://libroia-lectura.luisguerebalvin.chatgpt.site

- Publicación Sites completada; acceso público confirmado.
- Escritorio 1440 × 1000 y móvil 390 × 844 revisados en navegador. Corregido desbordamiento decorativo en móvil.
- Pestañas funcionales con clic y flechas de teclado; acordeón FAQ funcional.
- JavaScript validado con `node --check` y anclas HTML revisadas.
- Descarga en navegador alcanzó 100 % y generó enlace Blob para guardar un único APK. El evento automatizado de guardado del navegador integrado no devolvió ruta, por lo que no se verificó su escritura a disco ni la instalación en un dispositivo Android.
- Los 17 fragmentos fueron descargados desde la URL pública con curl, sin cookies ni autenticación. Todos sus tamaños y SHA-256 coinciden con el manifiesto. Total: 140925185 bytes.
- La concatenación local de los fragmentos coincide con el APK original: SHA-256 `913ab98570fe60983d713160245a31f8d83f06da1acf6c3beacffc005314cf2c`.

El APK original permanece en la raíz del proyecto. El alojamiento usa fragmentos de hasta 8 MiB para cumplir límites por archivo; la página ofrece al visitante un único APK.
