export class Player {
  constructor(
    { x, y, radious, color, ctx, velosity = { x: 1, y: 1 }, permanent = false},
    { draw, update, collisionBorderBehavior }
  ) {
    this.x = x;
    this.y = y;
    this.radious = radious;
    this.color = color;
    this.ctx = ctx;
    this.mass = Math.pow(radious, 2);
    this.velosity = velosity;
    this.permanent = permanent;
    this._drawInner = draw;
    this._collisionBorderBehavior = collisionBorderBehavior;
    this._update = update;
  }

  _runCollisionBorderBehavior() {
    const {x, y, vxCoeff, vyCoeff} = this._collisionBorderBehavior(this, {
        xMin: this.radious,
        xMax: this.ctx.canvas.width - this.radious,
        yMin: this.radious,
        yMax: this.ctx.canvas.height - this.radious,
      });
      this.x = x;
      this.y = y;
      this._revertAngle(vxCoeff, vyCoeff);
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

  update() {
    if(!this.permanent) {
        this._update(this);
        this._runCollisionBorderBehavior();
    }
    this.draw();
  }

  _revertAngle(newXdirection = 1, newYdirection = 1) {
    this.velosity = {
      x: newXdirection * this.velosity.x,
      y: newYdirection * this.velosity.y,
    };
  }
}
