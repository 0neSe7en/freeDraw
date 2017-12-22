
module.exports = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  mid(target) {
    return new Point(
      (this.x + target.x) / 2,
      (this.y + target.y) / 2,
    )
  }
}
