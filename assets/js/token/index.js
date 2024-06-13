// ================ select type modal box =================
let select_p_modal = document.getElementById('modal');
let next_btn = document.querySelector('#next_btn');

function next_btn_process(){
  next_btn.innerHTML = "Wait...";
}

function next_btn_normal() {
  next_btn.innerHTML = 'Next';
}

function open_payment_select_modal(){
  select_p_modal.style.display = 'block';
}
function close_payment_select_modal(){
  select_p_modal.style.display = 'none';
}

document.querySelector('.close-button').addEventListener('click', function () {
  close_payment_select_modal();
});

window.addEventListener('click', function (event) {
  if (event.target == select_p_modal) {
    close_payment_select_modal();
  }
});


// Notification 
function showNotification(message, time, type) {
  const notificationContainer = document.getElementById('notification-container');

  const notification = document.createElement('div');
  notification.className = `notification ${type ? 'success' : 'failure'}`;
  notification.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.className = 'close-btn';
  closeButton.textContent = '×';
  closeButton.onclick = () => {
    notification.classList.remove('show');
    notification.addEventListener('transitionend', () => {notification.remove();});
  };
  notification.appendChild(closeButton);

  notificationContainer.appendChild(notification);

  requestAnimationFrame(() => {
    notification.classList.add('show');
  });

  setTimeout(() => {
    notification.classList.remove('show');
    notification.addEventListener('transitionend', () => {notification.remove();});
  }, time*1000);

}


// ============= require modal box ==================
const smallModal = document.getElementById("small-modal");
const closeButton = document.querySelector(".close-button");
const smallCloseButton = document.querySelector(".small-close-button");
const saveButton = document.getElementById("saveButton");

function openSmallModal() {
    smallModal.style.display = "flex";
    select_p_modal.style.display = 'none';
}

function closeSmallModal() {
  smallModal.style.display = "none";
}

function proccess_save_payment(){
  saveButton.innerHTML = "Wait...";
}
function normal_save_payment() {
  saveButton.innerHTML = 'Wait...';
}

smallCloseButton.addEventListener("click", closeSmallModal);

window.addEventListener("click", function(event) {
    if (event.target == smallModal) {
        closeSmallModal();
    }
});

// ======= terminal mopdal js modal box =========
const terminalModal = document.getElementById('terminal-modal');
const terminalCloseButton = document.querySelector('.terminal-close-button',);

function open_terminal_modal(){
  document.getElementById('small-modal').style.display = 'none';
  document.getElementById('terminal-modal').style.display = 'flex';
}
function close_terminal_modal(){
  terminalModal.style.display = 'none';
}


terminalCloseButton.addEventListener('click', function () {
  close_terminal_modal();
});


window.addEventListener('click', function (event) {
  if (event.target == terminalModal) {
    close_terminal_modal();
  }
});



// ====== flower explose =============
function triggerFlowerExplosion() {
  const flowerContainer = document.getElementById('flower-container');

  const flowerImages = 
  [
    "🎉","💫","🌟","✨","🚀","💥","🥳","🎊","🎈","👏","🙌","👍","😄","🥂","🎆","🏆","🎇","👑","🔥","🎯","🎖️","🎗️","🎀","🏅","🥇","🎵","👌","🎶","🌠","🎖️","🏅","🥇","🏆","🏅","🏅","🥇","🎖️","🎗️"
  ];

  function createFlower(x, y, startX, startY) {
    const flower = document.createElement('div');
    flower.className = 'flower';

    const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    flower.innerHTML = randomImage;

    flower.style.setProperty('--x', `${x}px`);
    flower.style.setProperty('--y', `${y}px`);
    flower.style.left = `${startX}px`;
    flower.style.top = `${startY}px`;
    flowerContainer.appendChild(flower);

    flower.addEventListener('animationend', () => {
      flower.remove();
    });
  }

  function createExplosion(startX, startY) {
    const numberOfFlowers = 50;
    for (let i = 0; i < numberOfFlowers; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 200 + 50;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      createFlower(x, y, startX, startY);
    }
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  createExplosion(0, 0);
  createExplosion(width, 0);
  createExplosion(0, height);
  createExplosion(width, height);
  createExplosion(width / 2, height / 2);

}