(() => {

function getCopyText(button) {
  const target=document.getElementById(button.dataset.target);
  return target ? target.value || target.textContent : '';
}
async function copyText(text,button){
  if (!text) return;
  try { if(navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); }
    else { const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok) throw new Error('No copy'); }
    if(button) { const s=button.nextElementSibling; if(s && s.classList.contains('copy-status'))s.textContent='Copiat! Ara ves a la IA i prem Ctrl+V.'; }
  } catch(e){ if(button){const s=button.nextElementSibling;if(s && s.classList.contains('copy-status'))s.textContent='No s’ha pogut copiar automàticament. Selecciona el text i prem Ctrl+C.';} }
}
document.addEventListener('click',e=>{const btn=e.target.closest('[data-copy]');if(btn)copyText(getCopyText(btn),btn);});
const gen=document.getElementById('prompt-generator');
if (gen) {
  const ideaData=[{"id": "penals", "title": "Penal Master", "kind": "joc", "action": "triar si xuta a l’esquerra, al centre o a la dreta durant cinc penals", "result": "el porter escull una direcció, cada xut és gol o parada i al final es mostra la puntuació, amb opció de tornar a jugar"}, {"id": "reflexos", "title": "Reflex Challenge", "kind": "joc", "action": "clicar un objectiu que canvia de lloc mentre corre un cronòmetre de 20 segons", "result": "cada clic suma punts i al final es mostra el resultat i un botó per repetir la partida"}, {"id": "quiz", "title": "Quiz Champions", "kind": "joc", "action": "respondre cinc preguntes de futbol, música o cultura general triant entre tres respostes", "result": "el joc diu si cada resposta és correcta, suma els encerts i mostra una puntuació final"}, {"id": "memory", "title": "Memory Match", "kind": "joc", "action": "girar dues cartes de cada vegada per trobar quatre parelles iguals", "result": "les parelles correctes queden descobertes, els errors es tornen a tapar i al final es mostren els intents"}, {"id": "escape", "title": "Escape Aula", "kind": "joc", "action": "llegir tres pistes i escriure un codi secret de quatre xifres", "result": "el joc comprova el codi i mostra si he escapat o si he de tornar-ho a provar"}, {"id": "carrera", "title": "Dodge Racer", "kind": "joc", "action": "moure un cotxe cap a l’esquerra o la dreta amb les fletxes del teclat per evitar obstacles", "result": "el joc compta el temps que aguanto, acaba si xoco i permet tornar a començar"}, {"id": "estudi", "title": "Planificador d’estudi", "kind": "app", "action": "afegir assignatures, tasques i minuts previstos, i marcar les tasques com a fetes", "result": "es mostra una llista de pendents i acabades amb el percentatge de feina completada"}, {"id": "torneig", "title": "Creador de tornejos", "kind": "app", "action": "escriure els noms de quatre equips i seleccionar el guanyador de cada semifinal", "result": "l’app prepara automàticament la final i mostra l’equip campió"}, {"id": "entrenament", "title": "Diari d’entrenaments", "kind": "app", "action": "introduir l’esport, la durada en minuts i el dia de cada entrenament", "result": "apareix una llista dels entrenaments i el total de minuts acumulats"}, {"id": "despeses", "title": "Control de despeses", "kind": "app", "action": "escriure una despesa, triar-ne la categoria i introduir-ne l’import", "result": "es mostra la llista de despeses, el total gastat i quant queda del pressupost inicial"}, {"id": "habits", "title": "Tracker d’hàbits", "kind": "app", "action": "triar tres hàbits personals i marcar-los quan els he completat avui", "result": "cada marca actualitza una barra de progrés i el total d’objectius assolits"}, {"id": "viatge", "title": "Organitzador de viatge", "kind": "app", "action": "afegir llocs o activitats amb una nota i marcar els que ja he visitat", "result": "l’app mostra el pla complet, diferencia pendents i fets i permet eliminar entrades"}];
  const input=id=>document.getElementById(id);
  const get=id=>input(id).value.trim();
  const fill=()=>{
    const nom=get('p-nom')||'[NOM DEL PROJECTE]';
    const tipus=get('p-tipus')==='joc'?'un joc':'una aplicació';
    const accio=get('p-accio')||'[QUÈ PODRÀ FER L’USUARI]';
    const resultat=get('p-resultat')||'[QUÈ PASSARÀ]';
    const message=[
      'Vull crear '+tipus+' que es digui «'+nom+'».',
      '',
      'Aquesta és la meva idea:',
      '- L’usuari podrà '+accio+'.',
      '- Quan ho faci, '+resultat+'.',
      '',
      'Primer, ajuda’m a concretar la primera versió. Explica en tres punts què hi haurà a la pantalla, com s’utilitzarà i com podré comprovar que funciona. No escriguis codi encara. Si alguna part és massa complicada, proposa una versió inicial més petita, però que mantingui la idea del projecte.',
      '',
      'Quan et demani el codi, vull el contingut COMPLET d’un únic fitxer index.html, amb HTML, CSS i JavaScript dins del mateix fitxer. Ha de funcionar fent doble clic a index.html a Chrome, sense servidor, instal·lacions, React, frameworks, imports, APIs, llibreries ni recursos d’Internet. Textos en català, aspecte modern, controls clars i adaptació a pantalles petites. Pot tenir els botons i controls necessaris per fer bé aquesta primera versió. No facis servir localStorage.'
    ].join('\n');
    input('prompt-result').value=message;
  };
  gen.querySelectorAll('input,select,textarea').forEach(el=>{el.addEventListener('input',fill);el.addEventListener('change',fill);});
  document.querySelectorAll('[data-idea]').forEach(btn=>btn.addEventListener('click',()=>{
    const idea=ideaData.find(v=>v.id===btn.dataset.idea);
    if(!idea)return;
    input('p-nom').value=idea.title;
    input('p-tipus').value=idea.kind;
    input('p-accio').value=idea.action;
    input('p-resultat').value=idea.result;
    document.querySelectorAll('[data-idea]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    const info=document.getElementById('idea-selected');
    if(info)info.textContent='Has triat «'+idea.title+'». Pots canviar qualsevol de les quatre respostes.';
    fill();
    gen.scrollIntoView({behavior:'smooth',block:'start'});
  }));
  fill();
}

})();
