// Define an object that will be used to draw plus signs
const Plus = function () {
  this.x = 0;
  this.y = 0;
  this.left = 0;
  this.top = 0;
  this.width = 0;
  this.height = 0;
  this.scale = 1;
}

//Add draw method to the object
Plus.prototype.draw = function (ctx) {

  ctx.setTransform(this.scale, 0, 0, this.scale, this.left + this.x, this.top + this.y);
  
  ctx.moveTo(0, -this.height / 2);
  ctx.lineTo(0, this.height / 2);

  ctx.moveTo(-this.width / 2, 0);
  ctx.lineTo(this.width / 2, 0);
}

const c = document.getElementById('c');
const ctx = c.getContext('2d');

let signs = [];
let mouse = { x: 0, y: 0 };
const gridLength = 10;

let mouseMoved = false;
let mouseOver = false;

// Canvas full width and height
c.width = window.innerWidth;
c.height = window.innerHeight;


// For loop to create the grid array
for (i = 0; i <= gridLength; i++) {
  // create an empty array
  signs[i] = [];

  // create 9 Plus obj and put them in the empty array
  for (j = 0; j <= gridLength; j++) {
    const sign = new Plus();

    sign.left = c.width / (gridLength) * (i);
    sign.top = c.height / (gridLength) * (j);

    sign.width = 10;
    sign.height = 10;

    signs[i][j] = sign;
  }
}

console.log(signs);

// Event Listener
// Use GSAP ticker to call draw function on every frame that will draw signs to the canvas
// You can use requestAnimationFrame as well
TweenLite.ticker.addEventListener('tick', draw);
c.addEventListener('mousemove', mouseMove);
c.addEventListener('mouseleave', reset);
c.addEventListener('mouseover', function () {
  mouseOver = true;
});
// canvas resize based on window resize
window.addEventListener('resize', canvasResize);


// draw the grid
function draw() {
  if (mouseOver && mouseMoved) {
    caculateIconPosition();
    mouseMoved = false;
  }

  // Clear canvas
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.save();
  // draw a 10 X 10 grid, with 8 X 8 icon grid in the middle
  ctx.beginPath();
  for (i = 0; i <= gridLength; i++) {
    for (j = 0; j <= gridLength; j++) {
      const sign = signs[i][j];

      sign.draw(ctx);
    }
  }
  ctx.closePath();
  ctx.restore();
  ctx.strokeStyle = "#4caf50";
  ctx.stroke();
}

function mouseMove(e) {
  const rect = c.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouseMoved = true;
}

function caculateIconPosition() {
  for (i = 0; i <= gridLength; i++) {
    for (j = 0; j <= gridLength; j++) {
      const sign = signs[i][j];
      let radius = 20;
      const dx = mouse.x - sign.left;
      const dy = mouse.y - sign.top;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const angle = Math.atan2(dy, dx);

      if (dist < radius) {
        radius = dist;
        TweenMax.to(sign, 0.3, {
          scale: 2
        })
      } else {
        TweenMax.to(sign, 0.3, {
          scale: 1
        })
      }

      TweenMax.to(sign, 0.3, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }
  }
}

function reset() {
  mouseOver = false;
  for (i = 0; i <= gridLength; i++) {
    for (j = 0; j <= gridLength; j++) {
      const sign = signs[i][j];
      TweenMax.to(sign, 0.3, {
        x: 0,
        y: 0,
        scale: 1
      })
    }
  }
}

// Resize canvas when window resize
function canvasResize() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  for (i = 0; i <= gridLength; i++) {
    for(j = 0; j <= gridLength; j++) {
      const sign = signs[i][j];
      sign.left = c.width / gridLength * i;
      sign.top = c.height / gridLength * j;
    }
  }
}




