const modes = {
  resumen: { title: 'Empieza por lo esencial.', description: 'Explora un resumen breve o completo y encuentra las ideas principales de un libro. Tú eliges la extensión y el nivel de lenguaje.', badge: 'Resumen breve', content: '<span class="preview-chapter">Una mirada a la historia</span><h3>Las cosas importantes<br>no siempre se ven.</h3><p>Un pequeño viajero recorre distintos planetas y conoce formas muy diferentes de entender la vida. Sus encuentros invitan a pensar en la amistad, el cuidado y aquello a lo que damos valor.</p><div class="preview-tags"><span>Amistad</span><span>Curiosidad</span><span>Vínculos</span></div>' },
  lectura: { title: 'Ve un poco más allá.', description: 'Explora personajes, temas y vocabulario. Pide un análisis y ajusta el nivel de lenguaje para acercarte a cada historia a tu manera.', badge: 'Explorar temas', content: '<span class="preview-chapter">Otra forma de mirar</span><h3>¿Qué hace especial<br>a un vínculo?</h3><p>La relación del principito con su rosa invita a pensar en el cuidado. El tiempo y la atención que dedicamos a alguien cambian la forma en que lo vemos.</p><div class="preview-tags"><span>Personajes</span><span>Temas</span><span>Análisis</span></div>' },
  audio: { title: 'Dale voz a tus lecturas.', description: 'Escucha el texto en voz alta desde LibroIA. Una forma de seguir explorando historias cuando prefieres descansar la vista.', badge: 'Lectura en voz alta', content: '<span class="preview-chapter">También hay tiempo para escuchar</span><h3>Una historia<br>que va contigo.</h3><div class="audio-wave" aria-hidden="true">'+Array.from({length:28},(_,i)=>'<i style="--bar:'+([18,30,48,24,58,40,70,34,50,62,28,45,64,36][i%14])+'px"></i>').join('')+'</div><p class="audio-caption">Escucha el contenido desde la aplicación Android.</p>' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  const mode = modes[tab.dataset.mode];
  tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
  document.querySelector('#experience-title').textContent = mode.title;
  document.querySelector('#experience-description').textContent = mode.description;
  document.querySelector('#preview-badge').textContent = mode.badge;
  document.querySelector('#preview-content').innerHTML = mode.content;
  document.querySelector('#experience-panel').setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab,index) => {
 tab.addEventListener('click', () => selectTab(tab));
 tab.addEventListener('keydown', event => { let next; if(event.key === 'ArrowRight') next = (index+1)%tabs.length; if(event.key === 'ArrowLeft') next = (index+tabs.length-1)%tabs.length; if(event.key === 'Home') next = 0; if(event.key === 'End') next = tabs.length-1; if(next !== undefined){event.preventDefault();selectTab(tabs[next]);tabs[next].focus();} });
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Static hosting stores the original APK in bounded parts. Reassemble its exact
// bytes into one Android download, validating each part before offering the file.
const downloadButtons = [...document.querySelectorAll('[data-download]')];
const progressBox = document.querySelector('#download-progress');
const statusText = document.querySelector('#download-status');
const meter = document.querySelector('#download-meter');
const downloadHelp = document.querySelector('#download-help');
const cancelButton = document.querySelector('#cancel-download');
let controller = null;
let pendingUrl = null;
const hex = buffer => [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2,'0')).join('');
cancelButton.addEventListener('click', () => { if (controller) controller.abort(); else progressBox.hidden = true; });
async function downloadApk() {
 if (controller) return;
 controller = new AbortController();
 const signal = controller.signal;
 downloadButtons.forEach(button => button.disabled = true);
 progressBox.hidden = false;
 meter.value = 0;
 statusText.textContent = 'Preparando descarga…';
 downloadHelp.textContent = 'Mantén esta página abierta hasta que termine.';
 cancelButton.textContent = 'Cancelar';
 if (pendingUrl) { URL.revokeObjectURL(pendingUrl); pendingUrl = null; }
 try {
  const response = await fetch('assets/apk/manifest.json', { signal });
  if (!response.ok) throw new Error('manifest');
  const manifest = await response.json();
  const parts = [];
  let received = 0;
  for (const part of manifest.parts) {
   const response = await fetch('assets/apk/' + part.name, { signal });
   if (!response.ok) throw new Error('part');
   const buffer = await response.arrayBuffer();
   if (buffer.byteLength !== part.bytes) throw new Error('size');
   if (!crypto.subtle || hex(await crypto.subtle.digest('SHA-256', buffer)) !== part.sha256) throw new Error('integrity');
   if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
   parts.push(new Blob([buffer]));
   received += buffer.byteLength;
   const percentage = Math.round(received / manifest.bytes * 100);
   meter.value = percentage;
   statusText.textContent = 'Descargando LibroIA · ' + percentage + '%';
  }
  if (received !== manifest.bytes) throw new Error('size');
  const apk = new Blob(parts, { type: 'application/vnd.android.package-archive' });
  pendingUrl = URL.createObjectURL(apk);
  const link = document.createElement('a');
  link.href = pendingUrl;
  link.download = manifest.filename;
  link.textContent = 'Guardar APK';
  link.className = 'save-apk';
  downloadHelp.replaceChildren('Archivo preparado. Si la descarga no comienza, pulsa ', link, '.');
  link.click();
  statusText.textContent = 'Tu APK está listo';
 } catch (error) {
  statusText.textContent = error.name === 'AbortError' ? 'Descarga cancelada' : 'No se pudo completar la descarga';
  downloadHelp.textContent = error.name === 'AbortError' ? 'Puedes volver a iniciarla cuando quieras.' : 'Revisa tu conexión y vuelve a pulsar Descargar para Android.';
 } finally {
  controller = null;
  downloadButtons.forEach(button => button.disabled = false);
  cancelButton.textContent = 'Cerrar';
 }
}
downloadButtons.forEach(button => button.addEventListener('click', downloadApk));
