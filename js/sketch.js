class Sketch extends Engine {
  preload() {
    this._num = 100;
    this._horizontal_fraction = 0.8;
  }

  setup() {
    this._sorter = new Sorter(this._num);
    this._palette = new Palette(this._num);
    this._sorter.generateSequence();

    this._algorithm_index = 0;
  }

  draw() {
    const a = this._algorithm_index % Object.keys(Algorithm).length;
    console.log(Object.keys(Algorithm)[a]);

    this._sorter.setAlgorithm(a);
    this._sorter.sort();

    const steps = this._sorter.steps;
    const positions = this._sorter.positions;

    const x_scl = this.width / steps;
    const y_scl = this.height / this._num;
    const length = x_scl * this._horizontal_fraction;

    this.ctx.save();
    this.background("#161616");
    this.ctx.translate(x_scl / 2, y_scl / 2);

    this.ctx.lineWidth = 2;

    for (let i = 0; i < this._num; i++) {
      let started = false;
      this.ctx.strokeStyle = this._palette.getColour(i).rgb;
      this.ctx.lineWidth = 3;
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
    this._algorithm_index++;
    this.loop();
  }

  keyPress(key, code) {
    console.log(code);

    switch (code) {
      case 13:
        // enter
        this._sorter.generateSequence();
        this.loop();
        break;
      case 97:
        // A
        this._algorithm_index--;
        if (this._algorithm_index < 0)
          this._algorithm_index += Object.keys(Algorithm).length;
        this.loop();
        break;
      case 100:
        // D
        this._algorithm_index++;
        this.loop();
        break;
      default:
        break;
    }
  }
}
