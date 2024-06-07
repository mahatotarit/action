// ================ select type modal box =================
let next_btn = document.querySelector('.next_btn');
let select_p_modal = document.getElementById('modal');

next_btn.addEventListener('click', function (event) {
  event.preventDefault();
  select_p_modal.style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', function () {
  select_p_modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == select_p_modal) {
    select_p_modal.style.display = 'none';
  }
});


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

saveButton.addEventListener("click", openSmallModal);
smallCloseButton.addEventListener("click", closeSmallModal);

window.addEventListener("click", function(event) {
    if (event.target == smallModal) {
        closeSmallModal();
    }
});


setTimeout(function() {
    const yoru_wallet_bala_li = document.querySelector('.your_wallet_balance_li');
    const target_wallet_token_balan_li = document.querySelector('.target_wallet_token_balance_li',);
    const your_wallet_balance_span = document.querySelector('.your_wallet_balance_span');
    const target_wallet_token_balance_span = document.querySelector('.target_wallet_token_balance_span');
    
    yoru_wallet_bala_li.querySelector('.spinner').remove();
    target_wallet_token_balan_li.querySelector('.spinner').remove();

    your_wallet_balance_span.textContent = '0.25 ETH';
    target_wallet_token_balance_span.textContent = '3434 Token';

    yoru_wallet_bala_li.classList.add('success');
    target_wallet_token_balan_li.classList.add('fail');

}, 10000);



// ======= terminal mopdal js modal box =========

document.querySelector('.start_the_bot').addEventListener('click', function () {
    document.getElementById('small-modal').style.display = 'none';

    document.getElementById('terminal-modal').style.display = 'block';

    setTimeout(() => {
      triggerFlowerExplosion();
    }, 5000);
});

const terminalModal = document.getElementById('terminal-modal');
const terminalCloseButton = document.querySelector('.terminal-close-button',);

terminalCloseButton.addEventListener('click', function () {
  terminalModal.style.display = 'none';
});


window.addEventListener('click', function (event) {
  if (event.target == terminalModal) {
    terminalModal.style.display = 'none';
  }
});



// ====== flower explose =============
function triggerFlowerExplosion() {
  const flowerContainer = document.getElementById('flower-container');

  const flowerImages = ['../../1.jpeg','../../2.jpeg','../../3.jpeg','../../4.jpeg','../../5.jpeg','../../6.jpeg',];

  function createFlower(x, y, startX, startY) {
    const flower = document.createElement('div');
    flower.className = 'flower';

    const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    flower.style.backgroundImage = `url(${randomImage})`;

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