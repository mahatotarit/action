document.querySelector('.next_btn').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function () {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
});
