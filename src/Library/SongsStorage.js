const DB_NAME = 'SongsDB';
const DB_VERSION = 1;
const STORE_NAME = 'songs';

const openDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'createdAt' });
    }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };
  });
};

const getAllSongs = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };
  });
};

const addSongToDB = async (song) => {
  const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(song);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('IndexedDB error: ' + event.target.errorCode);
      };
    });
};

const deleteSongFromDB = async (createdAt) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(createdAt);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };
  });
};

const editSongInDB = async (song) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(song);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      reject('IndexedDB error: ' + event.target.errorCode);
    };
  });
};

export { openDB, getAllSongs, addSongToDB, deleteSongFromDB, editSongInDB };
