// Canvia el text del missatge "Gol!" per personalitzar aquest projecte.
let golsBlau = 0;
let golsVermell = 0;
const blau = document.getElementById('blau');
const vermell = document.getElementById('vermell');
const missatge = document.getElementById('missatge');

document.getElementById('gol-blau').addEventListener('click', () => {
  golsBlau++;
  blau.textContent = golsBlau;
  missatge.textContent = 'Gol! L’equip blau ha marcat.';
});
document.getElementById('gol-vermell').addEventListener('click', () => {
  golsVermell++;
  vermell.textContent = golsVermell;
  missatge.textContent = 'Gol! L’equip vermell ha marcat.';
});
document.getElementById('reiniciar').addEventListener('click', () => {
  golsBlau = 0;
  golsVermell = 0;
  blau.textContent = 0;
  vermell.textContent = 0;
  missatge.textContent = 'Comença el partit!';
});
