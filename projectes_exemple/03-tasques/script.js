// Projecte de pràctica: les tasques NO es guarden en recarregar.
// Ampliació: investiga localStorage i afegeix persistència.
const formulari = document.getElementById('formulari');
const entrada = document.getElementById('tasca');
const llista = document.getElementById('llista');
const missatge = document.getElementById('missatge');
const recompte = document.getElementById('recompte');
function actualitzarRecompte() {
  const nombre = llista.children.length;
  recompte.textContent = nombre + (nombre === 1 ? ' tasca' : ' tasques');
}
formulari.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = entrada.value.trim();
  if (!text) { missatge.textContent = 'Escriu una tasca abans d’afegir-la.'; return; }
  missatge.textContent = '';
  const element = document.createElement('li');
  const descripcio = document.createElement('span'); descripcio.textContent = text;
  const eliminar = document.createElement('button'); eliminar.type = 'button'; eliminar.textContent = 'Eliminar';
  eliminar.setAttribute('aria-label','Eliminar tasca: '+text);
  eliminar.addEventListener('click', () => {element.remove(); actualitzarRecompte();});
  element.append(descripcio, eliminar); llista.appendChild(element);
  entrada.value = ''; entrada.focus(); actualitzarRecompte();
});
