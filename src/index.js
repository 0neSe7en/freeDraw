const Point = require('./Point');
const clearBtn = document.getElementById('clearBtn');
const paintCanvas = document.getElementById('canvas');

// TODO: 处理Retina屏幕

class Drawing {
  constructor(canvasElement) {
    console.log('start...');
    this.width = 2;
    this.color = 'red';
    this.paintElement = canvasElement;
    this.tmpCanvas = document.getElementById('tmpCanvas');
    this.tmpCanvas.width = this.paintElement.width;
    this.tmpCanvas.height = this.paintElement.height;
    this.paintCtx = this.paintElement.getContext('2d');
    this.tmpCtx = this.tmpCanvas.getContext('2d');
    this.isDrawing = false;
    this.currentPoints = [];
    this.scale = 1;
    this.selfMove = this.onMouseMove.bind(this);

    this.tmpCanvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.tmpCanvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(e) {
    this.isDrawing = true;
    this.tmpCtx.strokeStyle = this.color;
    this.tmpCtx.lineJoin = "round";
    this.tmpCtx.lineCap = 'round';
    this.tmpCtx.lineWidth =  this.width;
    this.currentPoints.push(new Point(e.offsetX, e.offsetY));
    this.tmpCanvas.addEventListener('mousemove', this.selfMove, false);
  }

  onMouseUp() {
    this.tmpCanvas.removeEventListener('mousemove', this.selfMove, false);
    this.paintCtx.drawImage(this.tmpCanvas, 0, 0);
    this.tmpCtx.clearRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height);
    this.currentPoints = [];
    this.isDrawing = false;
  }

  onMouseMove(e) {
    this.currentPoints.push(new Point(e.offsetX, e.offsetY));
    this.paint();
  }

  paint() {
    const start = this.currentPoints[0];
    if (this.currentPoints.length < 3) {
      this.tmpCtx.beginPath();
      this.tmpCtx.arc(start.x, start.y, this.tmpCtx.lineWidth / 2, 0, Math.PI * 2, true);
      this.tmpCtx.fill();
      this.tmpCtx.closePath();
      return;
    }
    this.tmpCtx.clearRect(0, 0, this.tmpCanvas.width, this.tmpCanvas.height);
    this.tmpCtx.beginPath();
    this.tmpCtx.moveTo(start.x, start.y);

    for (let i = 1; i < this.currentPoints.length - 1; i++) {
      const current = this.currentPoints[i];
      const midPoint = this.currentPoints[i].mid(this.currentPoints[i + 1]);
      this.tmpCtx.quadraticCurveTo(current.x, current.y, midPoint.x, midPoint.y);
    }
    this.tmpCtx.stroke();
  }

  clear() {
    this.paintCtx.clearRect(0, 0, this.paintElement.width, this.paintElement.height);
  }
}

const draw = new Drawing(paintCanvas);
clearBtn.addEventListener('click', draw.clear.bind(draw));

