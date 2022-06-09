class Sketch extends Engine {
  preload() {
    this._num = 100; // number of elements
    this._horizontal_fraction = 0.8; // fraction of the line that stays horizontal
    this._title_size = 0.1; // fraction of the canvas that is used for the title
  }

  setup() {
    // instantiate the sorter and create a sequence of numbers
    this._sorter = new Sorter(this._num);
    this._sorter.generateSequence();

    // instantiate the palette
    this._palette = new Palette(this._num);

    // set the algorithm to the first one
    this._algorithm_index = 0;
  }

  draw() {
    // pick and algorithm
    const a = this._algorithm_index % this._sorter.algorithms_num;
    console.log(this._sorter.algorithms[a]);
    // sort the sequence in the sorter
    this._sorter.setAlgorithm(a);
    this._sorter.sort();

    // number of steps and position of each number
    const steps = this._sorter.steps;
    const positions = this._sorter.positions;

    // lines scales
    const dy = this._title_size * this.height;
    const x_scl = this.width / steps;
    const y_scl = (this.height - dy) / this._num;
    const length = x_scl * this._horizontal_fraction;

    this.ctx.save();
    this.ctx.filter = "sepia(0.25);contrast(200%);";
    this.background("#161616");

    this.ctx.save();
    this.ctx.translate(x_scl / 2, dy + y_scl / 2);

    this.ctx.lineWidth = 2;

    // iterate over each item and draw its corresponding line
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

    // draw the title
    this.ctx.fillStyle = "#f5f5f5";

    this.ctx.font = `${this._title_size * this.height * 0.7}px RobotoThin`;
    const dx = this.ctx.measureText(" ").width;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this._sorter.algorithms[a].toLowerCase(), dx, dy / 2);

    this.ctx.restore();

    this.noLoop();
  }

  click() {
    this._algorithm_index++;
    this.loop();
  }

  keyPress(_, code) {
    console.log(code);

    switch (code) {
      case 13:
        // enter
        this._sorter.generateSequence();
        this.loop();
        break;
      case 97:
        // A, previous algorithm
        this._algorithm_index--;
        if (this._algorithm_index < 0)
          this._algorithm_index += this._sorter.algorithms_num;
        this.loop();
        break;
      case 100:
        // D, next algorithm
        this._algorithm_index++;
        this.loop();
        break;
      case 32:
        // space
        const a = this._algorithm_index % this._sorter.algorithms_num;
        const filename = this._sorter.algorithms[a]
          .toLowerCase()
          .replace(" ", "")
          .replace("-", "");
        this.saveFrame(filename);
        break;
      default:
        break;
    }
  }
}
