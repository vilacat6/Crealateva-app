// Activitat: afegeix dues preguntes noves i canvia les opcions.
const preguntes = [
  { text: 'Quin llenguatge dóna estil a la web?', opcions: ['HTML', 'CSS', 'Git'], correcta: 1 },
  { text: 'Què s’utilitza per respondre a un clic?', opcions: ['JavaScript', 'PDF', 'Wi-Fi'], correcta: 0 },
  { text: 'On deses versions del codi?', opcions: ['Un navegador', 'Git', 'Una imatge'], correcta: 1 }
];
let actual = 0; let punts = 0; let respost = false;
const pregunta = document.getElementById('pregunta');
const opcions = document.getElementById('opcions');
const missatge = document.getElementById('missatge');
const progres = document.getElementById('progres');
const seguent = document.getElementById('seguent');
const reinicia = document.getElementById('reinicia');
function mostrar() {
  respost = false; missatge.textContent = ''; seguent.hidden = true;
  const p = preguntes[actual]; pregunta.textContent = p.text;
  progres.textContent = 'Pregunta ' + (actual + 1) + ' de ' + preguntes.length;
  opcions.replaceChildren();
  p.opcions.forEach((txt, i) => {
    const boto = document.createElement('button'); boto.textContent = txt;
    boto.addEventListener('click', () => respondre(i)); opcions.appendChild(boto);
  });
}
function respondre(opcio) {
  if (respost) return;
  respost = true;
  const correcte = opcio === preguntes[actual].correcta;
  if (correcte) punts++;
  missatge.textContent = correcte ? 'Molt bé! Resposta correcta.' : 'No és correcte. Torna-ho a provar en una altra partida.';
  opcions.querySelectorAll('button').forEach(b => b.disabled = true);
  seguent.hidden = false;
}
seguent.addEventListener('click', () => {
  actual++;
  if (actual < preguntes.length) mostrar();
  else {pregunta.textContent = 'Has aconseguit ' + punts + ' de ' + preguntes.length + ' punts.'; progres.textContent = 'Final de partida'; opcions.replaceChildren(); missatge.textContent = ''; seguent.hidden = true; reinicia.hidden = false;}
});
reinicia.addEventListener('click', () => {actual = 0; punts = 0; reinicia.hidden = true; mostrar();});
mostrar();
