import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new database named 'textEditorDB' which will be using version 1 of the database.
  openDB('textEditor', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('textEditorDB database already exists');
        return;
      }

      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('textEditor database created');
    },
  });

  export const putDb = async (content) => {
    const textEditorDB = await openDB("textEditor", 1);
    const tx = textEditorDB.transaction("textEditor", "readwrite");
    const store = tx.objectStore("textEditor");
    const request = store.put({ textEditor: content });
    const result = await request;
    console.log("Data saved to the database", result);
  };

  export const getDb = async () => {
    const textEditorDB = await openDB("textEditor", 1);
    const tx = textEditorDB.transaction("textEditor", "readonly");
    const store = tx.objectStore("textEditor");
    const request = store.getAll();
    const result = await request;
    console.log(result);
  };

initdb();
