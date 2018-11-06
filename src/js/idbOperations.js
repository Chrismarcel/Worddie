class IDBOperations {
  constructor(word) {
    this.word = word;
    this.dbPromise = idb.open("Worddie", 1, upgradeDB => {
      upgradeDB.createObjectStore("definitions", { keyPath: "word" });
    });
  }

  saveDefinitionstoIDB(definitions) {
    this.dbPromise.then(dbObj => {
      const tx = dbObj.transaction("definitions", "readwrite");
      const definitionStore = tx.objectStore("definitions");
      definitionStore.put(definitions);
    });
  }

  fetchDefinitionsFromIDB(results = "single") {
    return this.dbPromise
      .then(dbObj => {
        const tx = dbObj.transaction("definitions");
        const definitionStore = tx.objectStore("definitions");
        if (results === "single") {
          return definitionStore.get(this.word.toLowerCase());
        }
        return definitionStore.getAll();
      })
      .then(definitions => definitions);
  }
}
