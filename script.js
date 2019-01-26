let keyDowned = 0;

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 32) {
    keyDowned = 1.0;
  }
});

document.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 32) {
    keyDowned = 0;
  }
});

class Obj {
  constructor (params) {
    this.name = params.name;
    this.sx = params.sx;
    this.sy = params.sy;
    this.width = params.width;
    this.height = params.height;
    this.dx = params.dx;
    this.dy = params.dy;
    this.speed = params.speed;
    this.start = params.start;
  }

  update () {
    if(keyDowned) {
      raft.speed = keyDowned;
    } else {
      raft.speed = 0.3;
    }
    this.dx += this.speed * 3;
    this.dy -= this.speed;
  };

  render () {
    if (this.dx >= 1300) {
      this.dx = 0;
      this.dy = this.start;
    }
    ctx.drawImage(img, this.sx, this.sy, this.width, this.height,
      this.dx,this.dy, this.width, this.height);
  }
}

const raft = new Obj({
  name: 'Raft',
  sx: 0,
  sy: 0,
  width: 91,
  height: 87,
  dx: 0,
  dy: 660,
  speed: 0.3,
  start: 660
});

const cloud1 = new Obj({
  name: 'Cloud_1',
  sx: 0,
  sy: 185,
  width: 187,
  height: 91,
  dx: 0,
  dy: 360,
  speed: 0.7,
  start: 360
});

function sea() {
  ctx.clearRect(0, 0, 1280, 760);
  ctx.fillStyle = '#7AE2F0';
  ctx.fillRect(0, 0, 1280, 760);
}

function mainLoop () {
  sea();
  raft.update();
  raft.render();
  cloud1.update();
  cloud1.render();
  requestAnimationFrame(mainLoop);
}


const world = document.querySelector('#world');
const ctx = world.getContext('2d');
const img = new Image();
img.src = 'raft.png';
img.onload = () => {
  mainLoop();
}
