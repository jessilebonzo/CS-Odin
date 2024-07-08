class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }
// initialCapacity is the initial size of our storage (buckets).
// loadFactor is the maximum ratio of items to buckets before we resize.
// buckets is an array where each element is another array (a bucket).
// size keeps track of the number of key-value pairs in the HashMap.
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }
    return hashCode;
  }

  set(key, value) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i];
      if (k === key) {
        bucket[i] = [key, value];
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > this.loadFactor) {
      this.resize(this.buckets.length * 2);
    }
  }
// primeNumber is used to create a more unique hash.
// For each character in the key, we update hashCode and ensure it stays within the range of buckets array size using the modulo operator %.
// It finds the correct bucket using the hash.
// If the key already exists, it updates the value.
// If not, it adds a new key-value pair.
// If the number of items exceeds the loadFactor, it resizes the buckets array to double its current size.

  get(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        return v;
      }
    }
    return null;
  }
// It finds the correct bucket using the hash.
// It looks for the key in the bucket and returns the associated value if found.
// If the key isn't found, it returns null.

  has(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i];
      if (k === key) {
        return true;
      }
    }
    return false;
  }
// It finds the correct bucket using the hash.
// It checks if the key exists in the bucket and returns true or false.
  remove(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];

    for (let i = 0; i < bucket.length; i++) {
      const [k] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }
// It finds the correct bucket using the hash.
// It looks for the key and removes it from the bucket.
// If the key is found and removed, it decreases the size and returns true.
// If the key isn't found, it returns false.

// length: Returns the number of key-value pairs.
// clear: Removes all key-value pairs.
// keys: Returns an array of all keys.
// values: Returns an array of all values.
// entries: Returns an array of all key-value pairs.

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (let bucket of this.buckets) {
      for (let [, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        entriesArray.push(entry);
      }
    }
    return entriesArray;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(newCapacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}
// It creates a new larger buckets array.
// It rehashes all existing key-value pairs and places them in the new buckets.

const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwriting existing keys
test.set('apple', 'green');
test.set('banana', 'brown');

// Adding new key to trigger resizing
test.set('moon', 'silver');

console.log(test.get('apple'));  // Output: 'green'
console.log(test.has('dog'));    // Output: true
console.log(test.remove('frog')); // Output: true
console.log(test.length());      // Output: 12
test.clear();
console.log(test.length());      // Output: 0

console.log(test.keys());        // Output: []
console.log(test.values());      // Output: []
console.log(test.entries());     // Output: []
