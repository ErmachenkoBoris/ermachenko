export class Player {
  constructor({ x, y, radious, color, ctx }, { draw }) {
    this.x = x;
    this.y = y;
    this.radious = radious;
    this.color = color;
    this.ctx = ctx;
    this._drawInner = draw;
  }

  draw() {
    this._drawInner({
      ctx: this.ctx,
      x: this.x,
      y: this.y,
      radious: this.radious,
      color: this.color,
    });
  }
}
