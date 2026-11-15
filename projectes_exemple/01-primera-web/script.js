// Aquest fitxer decideix què passa quan prems el botó.
const boto = document.getElementById('saludar');
const campNom = document.getElementById('nom');
const resultat = document.getElementById('resultat');

function saludar() {
  const nom = campNom.value.trim();
  if (nom === '') {
    resultat.textContent = 'Escriu el teu nom primer!';
  } else {
    resultat.textContent = 'Hola, ' + nom + '! Has fet una web interactiva.';
  }
}
boto.addEventListener('click', saludar);
