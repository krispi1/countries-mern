function hashStringToInt(str, tableSize) {
  let hash = 23; // An arbitrary prime number

  for (let i = 0; i < str.length; i++) {
    hash = (13 * hash * str.charCodeAt(i)) % tableSize;
  }

  return hash;
}; // hashStringToInt

class HashTable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length)
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]]
          }
        })
      }
    });
    this.table = newTable;
  } // resize
  
  setItem = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor > 0.8) {
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length)
    if (this.table[idx]) {
      // Adopt chaining in case of a collision
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  } // setItem

  getItem = key => {
    const idx = hashStringToInt(key, this.table.length)

    try {
      if (!this.table[idx]) {
        throw new Error('Item not found');
      }
      return this.table[idx].find(x => x[0] === key)[1];
    } catch (err) {
      return err;
    }
    
  } // getItem

}; // HashTable

export default HashTable;
