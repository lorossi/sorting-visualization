class Palette {
  constructor(num) {
    this._num = num;
    this._interpolated = [];
    this._palette = [
      new Color(158, 96, 166),
      new Color(4, 138, 191),
      new Color(2, 115, 74),
      new Color(242, 159, 5),
      new Color(217, 54, 17),
    ];

    this._interpolate();
  }

  _interpolate() {
    for (let i = 0; i < this._num; i++) {
      const x = (i / this._num) * (this._palette.length - 1);

      const x_floor = Math.floor(x);
      const x_frac = x - x_floor;

      const color_from = this._palette[x_floor];
      const color_to = this._palette[x_floor + 1];
      const percent = this._polyEase(x_frac);

      const r = color_from.r + (color_to.r - color_from.r) * percent;
      const g = color_from.g + (color_to.g - color_from.g) * percent;
      const b = color_from.b + (color_to.b - color_from.b) * percent;

      this._interpolated.push(new Color(r, g, b));
    }
  }

  _polyEase(x, n = 3) {
    return x < 0.5
      ? Math.pow(2, n - 1) * Math.pow(x, n)
      : 1 - Math.pow(-2 * x + 2, n) / 2;
  }

  getColour(i) {
    return this._interpolated[i];
  }
}
