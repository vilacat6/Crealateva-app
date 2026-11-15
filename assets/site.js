
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
if(gen){
  const fill=()=>{
    const val=id=>(document.getElementById(id)?.value || '').trim();
    const nom=val('p-nom')||'El meu projecte'; const tipus=val('p-tipus')||'joc';
    const accio=val('p-accio')||'prémer el botó principal';const resultat=val('p-resultat')||'mostrar un resultat';
    document.getElementById('prompt-result').value='Sóc alumne de 15 anys i no he programat mai. Vull fer '+(tipus==='joc'?'un joc':'una app')+' que es digui «'+nom+'». L’usuari podrà '+accio+' i així '+resultat+'. Primer, explica en només tres punts què hi haurà a la pantalla i què farà l’usuari. Després, quan jo t’ho demani, crea una primera versió completa en UN ÚNIC fitxer index.html, amb HTML, CSS i JavaScript al mateix fitxer, que funcioni fent doble clic a index.html a Chrome. Sense React, frameworks, imports, llibreries, Internet, APIs, imatges externes, servidor ni instal·lacions. Una pantalla, com a màxim dos botons, textos en català, lletra llegible. No facis servir localStorage.';
  };
  gen.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',fill)); fill();
}
