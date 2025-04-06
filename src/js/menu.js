// import "../scss/menu.scss";

document.addEventListener('DOMContentLoaded', () => {
  let menuEl = document.getElementById('menu-container');

  fetch('/html/menu.html')
    .then(responce => responce.text())
    .then(date => {
      menuEl.innerHTML = date;
    })
    .catch(error => console.error('Error loading menu:', error));
});
