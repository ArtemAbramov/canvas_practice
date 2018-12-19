let dx = 0;
let dy = 660;
let speed = 0.3;
let keyDowned = false;

function Animation() {
  if(keyDowned) {
    speed = 1;
  } else {
    speed = 0.3;
  }
  dx += speed * 3;
  dy -= speed;
}

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 32) {
    keyDowned = true;
  }
});

document.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 32) {
    keyDowned = false;
  }
});


function Sea() {
  ctx.clearRect(0, 0, 1280, 760);
  ctx.fillStyle = '#7AE2F0';
  ctx.fillRect(0, 0, 1280, 760);
}

function MainLoop() {
  Sea();
  Animation();
  if (dx > 1300) {
    dx = 0;
    dy = 660;
  }
  ctx.drawImage(img, 0, 0, 91, 87,
    dx, dy, 91, 87);
  requestAnimationFrame(MainLoop);
}


const world = document.querySelector('#world');
const ctx = world.getContext('2d');
const img = new Image();
img.src = 'raft.png';
img.onload = () => {
  MainLoop();
}
