const Algorithm = {
  BUBBLE_SORT: 0,
  INSERTION_SORT: 1,
  MERGE_SORT: 2,
};

class Sorter {
  constructor(num) {
    this._num = num;
  }

  setAlgorithm(algorithm) {
    switch (algorithm) {
      case Algorithm.BUBBLE_SORT:
        this.sort = this._bubbleSort.bind(this);
        break;

      case Algorithm.INSERTION_SORT:
        this.sort = this._insertionSort.bind(this);
        break;

      case Algorithm.MERGE_SORT:
        this.sort = this._mergeSort.bind(this);
        break;

      default:
        this.sort = this._bubbleSort.bind(this);
        break;
    }
  }

  generateSequence() {
    this._sequence = Array(this._num)
      .fill()
      .map((_, i) => ({ val: i, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((a) => a.val);

    this._history = [[...this._sequence]];
  }

  _bubbleSort() {
    let swapped = true;

    while (swapped) {
      swapped = false;

      for (let i = 0; i < this._num - 1; i++) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(i, i + 1);
          this._history.push([...this._sequence]);
          swapped = true;
        }
      }
    }
  }

  _insertionSort() {
    for (let i = 1; i < this._num; i++) {
      let j = i;

      while (j > 0 && this._sequence[j - 1] > this._sequence[j]) {
        this._swap(j - 1, j);
        this._history.push([...this._sequence]);
        j--;
      }
    }
  }

  _mergeSort() {
    throw new Error("Not implemented");
  }

  _swap(i, j) {
    const temp = this._sequence[i];
    this._sequence[i] = this._sequence[j];
    this._sequence[j] = temp;
  }

  get positions() {
    let positions = {};

    for (let i = 0; i < this._num; i++) {
      positions[i] = [];
    }

    for (let h = 0; h < this._history.length; h++) {
      for (let j = 0; j < this._num; j++) {
        positions[j].push(this._history[h].indexOf(j));
      }
    }

    return positions;
  }

  get history() {
    return this._history;
  }

  get steps() {
    return this._history.length;
  }
}
