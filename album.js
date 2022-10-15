
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let x;
let y;

var albumArray = [];

var photoArray = [];

let getPhotos = new Promise(resolve => {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(function (response1) { return response1.json(); })
        .then(function (json) { resolve(json) });
})

let getAlbums = new Promise(resolve => {
    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(function (response1) { return response1.json(); })
        .then(function (json) { resolve(json) });
})


if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}





async function callPhotos() {
    x = await getPhotos;
    const request = indexedDB.open("photoDatabase", 5);
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };
    request.onupgradeneeded = function () {
        const db = request.result;
        console.log(x);

        const store = db.createObjectStore("photos", { keyPath: "id" })
        store.createIndex("title", ["title"]);
    };

    request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction(["photos"], "readwrite");
        const store = transaction.objectStore("photos");

        for (var i = 0; i < x.length; i++) {
            var p = x[i];
            store.put(p);
        }
    }

}

async function getPhoto() {
    const request = indexedDB.open("photoDatabase", 5);
    request.onsuccess = function () {
        const db = request.result;



        const transaction = db.transaction(["photos"], "readwrite");
        const store = transaction.objectStore("photos");
        store.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                photoArray.push(cursor.value);

                cursor.continue();
            }
            else {
                return photoArray;
            }

        }
    }
}


async function getAlbum() {
    const request = indexedDB.open("albumDatabase", 5);
    request.onsuccess = function () {
        const db = request.result;



        const transaction = db.transaction(["albums"], "readwrite");
        const store = transaction.objectStore("albums");
        store.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                albumArray.push(cursor.value);

                cursor.continue();
            }
            else {
                return albumArray;
            }

        }
    }
}





async function callAlbums() {
    x = await getAlbums


    const request = indexedDB.open("albumDatabase", 5);
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };


    request.onupgradeneeded = function () {
        const db = request.result;
        console.log(x);

        const store = db.createObjectStore("albums", { keyPath: "id" })
    };

    request.onsuccess = function () {
        const db = request.result;


        const transaction = db.transaction(["albums"], "readwrite");


        const store = transaction.objectStore("albums");

        for (var i = 0; i < x.length; i++) {
            var p = x[i];
            store.put(p);
        }


    }
}

//callPhotos()
// callAlbums()


// getAlbum();
// getPhoto();

function wait(){
    return new Promise((res)=>{
        setTimeout(()=>{
            res();},3000);});
  
  
}


async function albumDisplay(){
    getAlbum();
    await wait();
    var f = document.querySelector('.row');
    
   
  
    for (var i =0 ; i< albumArray.length;i++){
        p=albumArray[i]
        f.innerHTML += `<div class ="card">
                                <h3>${p.title}</h3>
                                <p>${p.id}</p>
                                <button type ="button" class ="button">click here</button>
                        </div>`
    }
    console.log(f);

}


async function photoDisplay(){
    getPhoto();
    await wait();
    var f = document.getElementById("photos")
    for (var i =0 ;i <50;i++){

        f.innerHTML+= `<div><img src= ${photoArray[i].thumbnailUrl}></div>`
    }
}

//photoDisplay();
albumDisplay();