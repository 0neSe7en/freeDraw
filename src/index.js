const clearBtn = document.getElementById('clearBtn');
const ele = document.getElementById('canvas');

const context = ele.getContext('2d');
// const ratio = window.devicePixelRatio || 1;
const ratio = 1;
const retina = ratio > 1;
console.log(ratio, context.scale);
let drawing = false;
let currentLine = [];
let lastPoint = null;

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function lerp (last, that, t) {
  if (typeof t === 'undefined') {
    t = 0.5;
  }
  t = Math.max(Math.min(1, t), 0);
  return new Point(last.x + (that.x - last.x) * t, last.y + (that.y - last.y) * t);
}

ele.addEventListener('mousedown', (e) => {
  context.beginPath();
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineCap = 'round';
  context.lineWidth = 10 / ratio;
  lastPoint = new Point(e.offsetX, e.offsetY);
  drawing = true;
})

ele.addEventListener('mouseup', () => {
  drawing = false;
})

ele.addEventListener('mouseleave', () => {
  drawing = false;
})

// ele.addEventListener('mousemove', (e) => {
//   if (!drawing) {
//     return;
//   }
//   // context.beginPath();
//
//   const currentPoint = new Point(
//     Math.floor(e.offsetX),
//     Math.floor(e.offsetY));
//   context.lineTo(currentPoint.x, currentPoint.y);
//   context.stroke();
//   lastPoint = currentPoint;
//   // context.closePath();
//   // if (retina) {
//   //   context.restore();
//   // }
// })


ele.addEventListener('mousemove', (e) => {
  if (!drawing) {
    return;
  }
  // if (retina) {
  //   context.save();
  //   context.scale(ratio, ratio);
  // }
  context.beginPath();

  context.moveTo(lastPoint.x, lastPoint.y);
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineCap = 'round';
  context.lineWidth = 10 / ratio;

  const currentPoint = new Point(Math.floor(e.offsetX), Math.floor(e.offsetY));
  const midPoint = lerp(lastPoint, currentPoint);
  console.log(currentPoint, midPoint, lastPoint);
  context.quadraticCurveTo(lastPoint.x, lastPoint.y, midPoint.x, midPoint.y);
  context.lineTo(currentPoint.x, currentPoint.y);
  context.stroke();
  lastPoint = currentPoint;
  // context.closePath();
  // if (retina) {
  //   context.restore();
  // }
})

clearBtn.addEventListener('click', () => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
})
