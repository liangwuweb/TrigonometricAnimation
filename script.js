var c = document.getElementById('c');
var ctx = c.getContext('2d');
var icon = { left: 250, top: 250, x: 0, y: 0, width: 10, height: 10 };
let mouse = { x: 0, y: 0 };
let mouseMoved = false;

TweenLite.ticker.addEventListener('tick', draw);

c.addEventListener('mousemove', mouseMove);

function draw() {

  if (mouseMoved) {

    let dx = mouse.x - icon.left;
    let dy = mouse.y - icon.top;
    let angle = Math.atan2(dy, dx);

    TweenMax.to(icon, 1,
      {
        x: Math.cos(angle) * 20, y: Math.sin(angle) * 20
      });

  }

  ctx.clearRect(0, 0, c.width, c.height);
  // save the context of clear whole canvas before transform the context, without clearRect offset x&y 250px. Restore it after drawing the icon, as result, for evey tick,
  //the system clear the whole canvas, and do the tranform, draw the icon. After all, we restore the context, so next time we start with the
  // default context again -> clear whole canvas, and draw the icon.
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, icon.left + icon.x, icon.top + icon.y);
  ctx.beginPath();
  // ctx.moveTo(-icon.width / 2, 0);
  // ctx.lineTo(icon.width / 2, 0);

  // ctx.moveTo(0, -icon.height / 2);
  // ctx.lineTo(0, icon.height / 2);

  ctx.moveTo(-5, 0);
  ctx.lineTo(5, 0);

  ctx.moveTo(0, -5);
  ctx.lineTo(0, 5);


  ctx.closePath();
  ctx.stroke();
  // restore the untransformed context
  ctx.restore();
  mouseMoved = false;

}

function mouseMove(e) {
  const rect = c.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouseMoved = true;
}
