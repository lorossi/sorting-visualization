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
      {
        name: "Odd-Even Sort",
        method: this._oddEvenSort.bind(this),
      },
      {
        name: "Stooge Sort",
        method: this._stoogeSort.bind(this),
      },
    ];

    this.setAlgorithm();
  }

  setAlgorithm(algorithm = 0) {
    this._sortingAlgorithm = this._algorithms[algorithm].method;
  }

  generateSequence() {
    this._to_order = Array(this._num)
      .fill()
      .map((_, i) => ({ val: i, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((a) => a.val);
  }

  _swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  _flip(arr, i) {
    let start = 0;
    while (start < i) {
      this._swap(arr, i, start);
      start++;
      i--;
    }
  }

  _bubbleSort() {
    let swapped = true;

    while (swapped) {
      swapped = false;

      for (let i = 0; i < this._num - 1; i++) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(this._sequence, i, i + 1);
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
        this._swap(this._sequence, j - 1, j);
        this._history.push([...this._sequence]);
        j--;
      }
    }
  }

  _selectionSort() {
    for (let i = 0; i < this._num - 1; i++) {
      let min = i;

      for (let j = i + 1; j < this._num; j++) {
        if (this._sequence[j] < this._sequence[min]) {
          min = j;
        }
      }

      if (min !== i) {
        this._swap(this._sequence, i, min);
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
          this._swap(arr, i, j);
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

    quick_sort(this._sequence, 0, this._num - 1);
  }

  _countingSort() {
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
        this._swap(arr, i, largest);
        max_heapify(arr, largest, n);
      }
    };

    const heap_sort = (arr, n) => {
      build_max_heap(arr, n);

      for (let i = n - 1; i > 0; i--) {
        this._swap(arr, 0, i);
        this._history.push([...arr]);
        max_heapify(arr, 0, i);
      }
    };

    heap_sort(this._sequence, this._num);
  }

  _radixSort() {
    const counting_sort = (arr, size, place) => {
      let max = Math.max(...arr);
      let output = Array(size + 1).fill(0);
      let freq = Array(max + 1).fill(0);

      for (let i = 0; i < size; i++) {
        const digit = Math.floor(arr[i] / place) % 10;
        freq[digit]++;
      }

      for (let i = 1; i < max + 1; i++) freq[i] += freq[i - 1];

      for (let i = size - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / place) % 10;
        output[freq[digit] - 1] = arr[i];
        this._history.push([...output]);
        freq[digit]--;
      }

      for (let i = 0; i < size; i++) arr[i] = output[i];
    };

    const max = Math.max(...this._sequence);
    for (let i = 1; Math.floor(max / i) > 0; i *= 10)
      counting_sort(this._sequence, this._num, i);
  }

  _bucketSort() {
    const bucket = new Array(this._num).fill(0);

    for (let i = 0; i < this._num; i++) bucket[this._sequence[i]]++;

    let k = 0;
    for (let i = 0; i < this._num; i++) {
      while (bucket[i]-- > 0) {
        this._sequence[k++] = i;
        this._history.push([...this._sequence]);
      }
    }
  }

  _shellSort() {
    let gap = Math.floor(this._num / 2);

    while (gap > 0) {
      for (let i = gap; i < this._num; i++) {
        for (
          let j = i;
          j >= gap && this._sequence[j] < this._sequence[j - gap];
          j -= gap
        ) {
          this._swap(this._sequence, j, j - gap);
          this._history.push([...this._sequence]);
        }
      }
      gap = Math.floor(gap / 2);
    }
  }

  _gnomeSort() {
    let i = 1;
    while (i < this._num) {
      if (i == 0) i++;
      if (this._sequence[i] >= this._sequence[i - 1]) i++;
      else {
        this._swap(this._sequence, i, i - 1);
        this._history.push([...this._sequence]);
        i--;
      }
    }
  }

  _pancakeSort() {
    for (let curr_size = this._num; curr_size > 1; curr_size--) {
      const m = this._sequence.indexOf(
        Math.max(...this._sequence.slice(0, curr_size))
      );

      if (m != curr_size - 1) {
        this._flip(this._sequence, m);
        this._flip(this._sequence, curr_size - 1);
        this._history.push([...this._sequence]);
      }
    }
  }

  _cocktailSort() {
    let swapped = true;
    let start = 0;
    let end = this._num - 1;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end; i++) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(this._sequence, i, i + 1);
          this._history.push([...this._sequence]);
          swapped = true;
        }
      }
      end--;

      if (!swapped) break;

      swapped = false;
      for (let i = end - 1; i >= start; i--) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(this._sequence, i, i + 1);
          this._history.push([...this._sequence]);
          swapped = true;
        }
      }
      start++;
    }
  }

  _oddEvenSort() {
    let sorted = false;

    while (!sorted) {
      sorted = true;

      for (let i = 1; i <= this._num - 2; i += 2) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(this._sequence, i, i + 1);
          this._history.push([...this._sequence]);
          sorted = false;
        }
      }

      for (let i = 0; i <= this._num - 2; i += 2) {
        if (this._sequence[i] > this._sequence[i + 1]) {
          this._swap(this._sequence, i, i + 1);
          this._history.push([...this._sequence]);
          sorted = false;
        }
      }
    }
  }

  _stoogeSort() {
    const stooge_sort = (arr, l, h) => {
      if (l >= h) return;

      if (arr[l] > arr[h]) {
        this._swap(arr, l, h);
        this._history.push([...this._sequence]);
      }

      if (h - l + 1 > 2) {
        const t = Math.floor((h - l + 1) / 3);
        stooge_sort(arr, l, h - t);
        stooge_sort(arr, l + t, h);
        stooge_sort(arr, l, h - t);
      }
    };

    stooge_sort(this._sequence, 0, this._sequence.length - 1);
  }

  sort() {
    this._sequence = [...this._to_order];
    this._history = [[...this._sequence]];
    this._sortingAlgorithm();
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
