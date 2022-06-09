const Algorithm = {
  BUBBLE_SORT: 0,
  INSERTION_SORT: 1,
  SELECTION_SORT: 2,
  MERGE_SORT: 3,
  QUICK_SORT: 4,
  COUNTING_SORT: 5,
  HEAP_SORT: 6,
};

class Sorter {
  constructor(num) {
    this._num = num;

    this.setAlgorithm();
  }

  setAlgorithm(algorithm) {
    switch (algorithm) {
      case Algorithm.BUBBLE_SORT:
        this.sort = this._bubbleSort.bind(this);
        break;

      case Algorithm.INSERTION_SORT:
        this.sort = this._insertionSort.bind(this);
        break;

      case Algorithm.SELECTION_SORT:
        this.sort = this._selectionSort.bind(this);
        break;

      case Algorithm.MERGE_SORT:
        this.sort = this._mergeSort.bind(this);
        break;

      case Algorithm.QUICK_SORT:
        this.sort = this._quickSort.bind(this);
        break;

      case Algorithm.COUNTING_SORT:
        this.sort = this._countingSort.bind(this);
        break;

      case Algorithm.HEAP_SORT:
        this.sort = this._heapSort.bind(this);
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
  }

  _swap(i, j) {
    const temp = this._sequence[i];
    this._sequence[i] = this._sequence[j];
    this._sequence[j] = temp;
  }

  _bubbleSort() {
    this._history = [[...this._sequence]];

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
    this._history = [[...this._sequence]];

    for (let i = 1; i < this._num; i++) {
      let j = i;

      while (j > 0 && this._sequence[j - 1] > this._sequence[j]) {
        this._swap(j - 1, j);
        this._history.push([...this._sequence]);
        j--;
      }
    }
  }

  _selectionSort() {
    this._history = [[...this._sequence]];

    for (let i = 0; i < this._num - 1; i++) {
      let min = i;

      for (let j = i + 1; j < this._num; j++) {
        if (this._sequence[j] < this._sequence[min]) {
          min = j;
        }
      }

      if (min !== i) {
        this._swap(i, min);
        this._history.push([...this._sequence]);
      }
    }
  }

  _mergeSort() {
    const merge = (arr, left, mid, right) => {
      const temp = [];
      let i = left;
      let j = mid + 1;

      for (let k = left; k <= right; k++) {
        if (i > mid) {
          temp[k] = arr[j++];
        } else if (j > right) {
          temp[k] = arr[i++];
        } else if (arr[i] < arr[j]) {
          temp[k] = arr[i++];
        } else {
          temp[k] = arr[j++];
        }
      }

      for (let k = left; k <= right; k++) {
        arr[k] = temp[k];
      }

      this._history.push([...arr]);
    };

    const merge_sort = (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
      }
    };

    this._history = [[...this._sequence]];
    merge_sort(this._sequence, 0, this._num - 1);
  }

  _quickSort() {
    const partition = (arr, left, right, pivot) => {
      let i = left;
      let j = right;

      while (i <= j) {
        while (arr[i] < pivot) {
          i++;
        }

        while (arr[j] > pivot) {
          j--;
        }

        if (i <= j) {
          this._swap(i, j);
          this._history.push([...arr]);
          i++;
          j--;
        }
      }

      return i;
    };

    const quick_sort = (arr, left, right) => {
      if (left < right) {
        const pivot = arr[Math.floor((left + right) / 2)];
        const index = partition(arr, left, right, pivot);
        quick_sort(arr, left, index - 1);
        quick_sort(arr, index, right);
      }
    };

    this._history = [[...this._sequence]];
    quick_sort(this._sequence, 0, this._num - 1);
  }

  _countingSort() {
    this._history = [[...this._sequence]];

    const max = Math.max(...this._sequence);
    const min = Math.min(...this._sequence);

    let c = Array(max - min + 1).fill(0);

    for (let i = 0; i < this._num; i++) {
      c[this._sequence[i] - min]++;
    }

    let k = 0;
    for (let i = min; i <= max; i++) {
      while (c[i - min] > 0) {
        this._sequence[k++] = i;
        c[i - min]--;
        this._history.push([...this._sequence]);
      }
    }
  }

  _heapSort() {
    const build_max_heap = (arr, n) => {
      for (let i = Math.floor(n / 2); i >= 1; i--) {
        max_heapify(arr, i, n);
      }
    };

    const max_heapify = (arr, i, n) => {
      let largest = i;
      let l = 2 * i;
      let r = 2 * i + 1;

      if (l <= n && arr[l] > arr[largest]) {
        largest = l;
      }

      if (r <= n && arr[r] > arr[largest]) {
        largest = r;
      }

      if (largest !== i) {
        this._swap(i, largest);
        max_heapify(arr, largest, n);
        this._history.push([...arr]);
      }
    };

    const heap_sort = (arr, n) => {
      build_max_heap(arr, n);

      for (let i = n; i >= 2; i--) {
        this._swap(1, i);
        max_heapify(arr, 1, i - 1);
        this._history.push([...arr]);
      }
    };

    this._history = [[...this._sequence]];
    heap_sort(this._sequence, this._num);
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
