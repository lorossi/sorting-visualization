class Sorter {
  constructor(num) {
    this._num = num;
    this._algorithms = [
      {
        name: "Bubble Sort",
        method: this._bubbleSort.bind(this),
      },
      {
        name: "Insertion Sort",
        method: this._insertionSort.bind(this),
      },
      {
        name: "Selection Sort",
        method: this._selectionSort.bind(this),
      },
      {
        name: "Merge Sort",
        method: this._mergeSort.bind(this),
      },
      {
        name: "Quick Sort",
        method: this._quickSort.bind(this),
      },
      {
        name: "Counting Sort",
        method: this._countingSort.bind(this),
      },
      {
        name: "Heap Sort",
        method: this._heapSort.bind(this),
      },
      {
        name: "Radix Sort",
        method: this._radixSort.bind(this),
      },
      {
        name: "Bucket Sort",
        method: this._bucketSort.bind(this),
      },
      {
        name: "Shell Sort",
        method: this._shellSort.bind(this),
      },
      {
        name: "Gnome Sort",
        method: this._gnomeSort.bind(this),
      },
      {
        name: "Pancake Sort",
        method: this._pancakeSort.bind(this),
      },
      {
        name: "Cocktail Sort",
        method: this._cocktailSort.bind(this),
      },
    ];

    this.setAlgorithm();
  }

  setAlgorithm(algorithm = 0) {
    this.sort = this._algorithms[algorithm].method;
  }

  generateSequence() {
    this._to_order = Array(this._num)
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

  _flip(i) {
    let start = 0;
    while (start < i) {
      this._swap(i, start);
      start++;
      i--;
    }
  }

  _bubbleSort() {
    this._sequence = [...this._to_order];
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
    this._sequence = [...this._to_order];
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
    this._sequence = [...this._to_order];
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

    this._sequence = [...this._to_order];
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

    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];
    quick_sort(this._sequence, 0, this._num - 1);
  }

  _countingSort() {
    this._sequence = [...this._to_order];
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
      for (let i = n / 2 - 1; i >= 0; i--) {
        max_heapify(arr, i, n);
      }
    };

    const max_heapify = (arr, i, n) => {
      let largest = i;
      let l = 2 * i;
      let r = 2 * i + 1;

      if (l < n && arr[l] > arr[largest]) {
        largest = l;
      }

      if (r < n && arr[r] > arr[largest]) {
        largest = r;
      }

      if (largest !== i) {
        this._swap(i, largest);
        max_heapify(arr, largest, n);
      }
    };

    const heap_sort = (arr, n) => {
      build_max_heap(arr, n);

      for (let i = n - 1; i > 0; i--) {
        this._swap(0, i);
        this._history.push([...arr]);
        max_heapify(arr, 0, i);
      }
    };

    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];
    heap_sort(this._sequence, this._num);
  }

  _radixSort() {
    const count_sort = (arr, exp) => {
      const n = arr.length;
      let count = new Array(n).fill(0);

      for (let i = 0; i < n; i++) count[Math.floor((arr[i] / exp) % 10)]++;
      for (let i = 1; i < 10; i++) count[i] += count[i - 1];

      let output = new Array(n).fill(0);

      for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
        count[Math.floor((arr[i] / exp) % 10)]--;
        this._history.push([...output]);
      }

      output = [...arr];
    };

    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];
    const max = Math.max(...this._sequence);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10)
      count_sort(this._sequence, exp);
  }

  _bucketSort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];

    const n = this._num;
    const bucket = new Array(n).fill(0);

    for (let i = 0; i < n; i++) bucket[this._sequence[i]]++;

    let k = 0;
    for (let i = 0; i < n; i++) {
      while (bucket[i]-- > 0) {
        this._sequence[k++] = i;
        this._history.push([...this._sequence]);
      }
    }
  }

  _shellSort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];

    const n = this._num;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        for (
          let j = i;
          j >= gap && this._sequence[j] < this._sequence[j - gap];
          j -= gap
        ) {
          this._swap(j, j - gap);
          this._history.push([...this._sequence]);
        }
      }
      gap = Math.floor(gap / 2);
    }
  }

  _gnomeSort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];

    let i = 1;
    while (i < this._num) {
      if (i == 0) i++;
      if (this._sequence[i] >= this._sequence[i - 1]) i++;
      else {
        this._swap(i, i - 1);
        this._history.push([...this._sequence]);
        i--;
      }
    }
  }

  _pancakeSort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];

    const n = this._num;
    for (let curr_size = n; curr_size > 1; curr_size--) {
      const m = this._sequence.indexOf(
        Math.max(...this._sequence.slice(0, curr_size))
      );

      if (m != curr_size - 1) {
        this._flip(m);
        this._flip(curr_size - 1);
        this._history.push([...this._sequence]);
      }
    }
  }

  _cocktailSort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];

    let swapped = true;
    let start = 0;
    let end = this._num - 1;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end; i++) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(i, i + 1);
          this._history.push([...this._sequence]);
          swapped = true;
        }
      }
      end--;

      if (!swapped) break;

      swapped = false;
      for (let i = end - 1; i >= start; i--) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(i, i + 1);
          this._history.push([...this._sequence]);
          swapped = true;
        }
      }
      start++;
    }
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

  get algorithms() {
    return this._algorithms.map((a) => a.name);
  }

  get algorithms_num() {
    return this._algorithms.length;
  }
}
