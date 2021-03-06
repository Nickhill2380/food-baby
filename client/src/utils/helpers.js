export function formatName(string) {
    const splitArr = [' ', '-', '"'];
    string = string.toLowerCase();

    // splits, formats, and joins strings for each format case in splitArr
    for (let i = 0; i < splitArr.length; i++) {
        string = string.split(splitArr[i])
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join(splitArr[i])
    };

    return string;
};

export function filterMenu(menuItems, courseName) {
    return menuItems.filter(item => item.course.name === courseName);
};

export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
        // open connection to database
        const request = window.indexedDB.open('food-baby', 1);

        // create variables to hold reference
        let db, tx, store;

        // if version changed, run this method
        request.onupgradeneeded = function(e) {
            const db = request.result;

            db.createObjectStore('menuItems', { keyPath: '_id' });
            db.createObjectStore('courses', { keyPath: '_id' });
            db.createObjectStore('cart', { keyPath: '_id' });
        };

        // handle errors
        request.onerror = function(e) {
            console.log('There was an error.');
        };

        // on successful open, save reference of database to 'db' variable, open a transaction, and save a reference to the object store
        request.onsuccess = function(e) {
            db = request.result;
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            db.onerror = function(e) {
                console.log('error', e);
            };

            switch (method) {
                case 'put': 
                    store.put(object);
                    resolve(object);
                    break;
                case 'get': 
                    const all = store.getAll();
                    all.onsuccess = function() {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    // console.log(object)
                    store.delete(object._id);
                    break;
                default:
                    console.log('Not a valid method.');
                    break
            };

            // close connection on complete
            tx.oncomplete = function() {
                db.close();
            };
        };
    });
};