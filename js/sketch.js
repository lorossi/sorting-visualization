class Sketch extends Engine {
  preload() {
    this._num = 100;
    this._horizontal_fraction = 0.8;
  }

  setup() {
    this._sorter = new Sorter(this._num);
  }

  draw() {
    this._sorter.setAlgorithm(Algorithm.INSERTION_SORT);
    this._sorter.generateSequence();
    this._sorter.sort();

    const steps = this._sorter.steps;
    const positions = this._sorter.positions;

    const x_scl = this.width / steps;
    const y_scl = this.height / this._num;
    const length = x_scl * this._horizontal_fraction;

    this.ctx.save();
    this.background("#000000");
    this.ctx.translate(x_scl / 2, y_scl / 2);

    this.ctx.lineWidth = 2;

    for (let i = 0; i < this._num; i++) {
      let started = false;
      const hue = Math.floor((i / (this._num + 1)) * 360);

      this.ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 1)`;
      this.ctx.beginPath();

      for (let p = 0; p < steps; p++) {
        const center = p * x_scl;
        const sx = center - length / 2;
        const ex = center + length / 2;
        const y = positions[i][p] * y_scl;

        if (!started) {
          this.ctx.moveTo(sx, y);
          started = true;
        } else {
          this.ctx.lineTo(sx, y);
        }

        this.ctx.lineTo(ex, y);
      }

      this.ctx.stroke();
    }

    this.ctx.restore();

    this.noLoop();
  }

  click() {
    this.loop();
  }
}
