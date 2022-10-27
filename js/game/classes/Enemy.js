export class Enemy {
    constructor({ x, y, radious, color, ctx, velosity,  itemLink}, { draw, update }) {
        this.x = x;
        this.y = y;
        this.radious = radious;
        this.color = color;
        this.ctx = ctx;
        this.velosity = velosity;
        this.area = itemLink.area;

        this._drawInner = draw;
        this._updateInner = update;

        this._generateRandomStartPositionInArea();

        this._interval = null;
        this.text = itemLink.name;
    }

    _drawAreaField() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.area.x, this.area.y, this.area.width, this.area.height);
        this.ctx.fillRect(
            this.area.x,
            this.area.y,
            this.area.width,
            this.area.height
        );
        this.ctx.fill();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y + 2* this.radious, this.radious, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this._addText();
        this.ctx.fill();
    }

    update() {
        // this._drawAreaField();
        if (!this._interval) {
            this._setRandomInterval();
            this._setRandomAngle();
        }
        this._updateInner(this);
        this._checkIfInsideBodrdersAndCorrectPositin();
        this.draw();
    }

    setAngle(event, startPosition) {
        const angle = Math.atan2(
            event.clientY - startPosition.y,
            event.clientX - startPosition.x
        );
        this.velosity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    }

    _getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    _generateRandomStartPositionInArea() {
        this.x = this._getRandomInt(this.area.x, this.area.x + this.area.width);
        this.y = this._getRandomInt(this.area.y, this.area.y + this.area.height);
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _setRandomInterval() {
        const randomTime = this._getRandomInt(1000, 2000);
        this._interval = setInterval(() => {
            clearInterval(this._interval);
            this._interval = null;
        }, randomTime);
    }

    _setRandomAngle() {
        const angle = Math.random() * Math.PI * 2;
        this.velosity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
    }

    _checkIfInsideBodrdersAndCorrectPositin() {
        const BIAS = this.radious;
        if (this.x - this.radious< this.area.x) {
            this.x = this.area.x + BIAS;
            this._revertAngle();
        }
        if (this.x - this.radious> this.area.x + this.area.width) {
            this.x = this.area.x + this.area.width - BIAS;
            this._revertAngle();
        }
        if (this.y - this.radious< this.area.y) {
            this.y = this.area.y + BIAS;
            this._revertAngle();
        }
        if (this.y - this.radious> this.area.y + this.area.height) {
            this.y = this.area.y + this.area.height - BIAS;
            this._revertAngle();
        }
    }

    _revertAngle() {
        this.velosity = {
            x: -this.velosity.x,
            y: -this.velosity.y
        };
    }

    _addText() {
        this.ctx.font = "bold 16px Arial";
        this.ctx.fillText(this.text, this.x-this.radious, this.y+this.radious/2);
    }
}
