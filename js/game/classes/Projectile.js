export class Projectile {
    constructor({ x, y, radious, color, ctx, velosity}, { draw, update }) {
      this.x = x;
      this.y = y;
      this.radious = radious;
      this.color = color;
      this.ctx = ctx;
      this._drawInner = draw;
      this.velosity = velosity;
      this._update = update;
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
        this._update(this);
        this.draw();
    }

    setAngle(event, startPosition) {
        const angle = Math.atan2(event.clientY - startPosition.y,
            event.clientX - startPosition.x);
        this.velosity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    }
  }