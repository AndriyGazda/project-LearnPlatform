document.addEventListener('DOMContentLoaded', () => {
  let footerEl = document.getElementById('footer-container');

  fetch('/html/footer.html')
    .then(responce => responce.text())
    .then(date => {
      footerEl.innerHTML = date;
    })
    .catch(error => console.error('Error loading footer:', error));
});
