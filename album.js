
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let x;
let y;

var albumArray = [];

var photoArray = [];

var btns;

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
        store.createIndex("title", ["title"]);
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



// getAlbum();
// getPhoto();

function wait() {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, 3000);
    });


}


async function albumDisplay() {
    getAlbum();
    await wait();
    var f = document.querySelector('.row');

    for (var i = 0; i < albumArray.length; i++) {
        p = albumArray[i]
        f.innerHTML += `<div class ="card">
                                <h3>${p.title}</h3>
                                <p>${p.id}</p>
                                <button type ="button" class ="button">click here</button>
                        </div>`

    }


    var classArray = document.getElementsByClassName('card');
    for (var i = 0; i < classArray.length; i++) {
        p = classArray[i];
        var cardid = "cardid" + albumArray[i].id

        p.setAttribute("id", cardid)
    }
    var buttonArray = document.getElementsByClassName('button');
    for (var i = 0; i < classArray.length; i++) {
        p = buttonArray[i];
        var buttonid = albumArray[i].id
        p.setAttribute("id", buttonid)
    }

    console.log(f);

    let btns = document.querySelectorAll('button');

    btns.forEach(function (i) {
        i.addEventListener('click', function () {

            photoDisplay(i.id);
        });
    });
}


async function photoDisplay(albumID) {
    photoArray = []
    getPhoto();


    await wait();
    console.log(photoArray);
    var g = document.getElementById("modal")
    g.innerHTML = "";

    var s="";
    s+= `<div class ="modal" id="mymodal">
    <div class="modal-content">
        <span class ="close">&times;</span>`
    
    for (var i = 0; i < photoArray.length; i++) {
        if (photoArray[i].albumId == albumID) {
            console.log("hii");

            s += `<div class ="card">
                                <img width=100% height=100% src= ${photoArray[i].thumbnailUrl}>
                                </div>`
                            
        }
    }
    s+=`</div></div>`
    g.innerHTML=s;
    var modal = document.getElementById("mymodal");
    var span = document.getElementsByClassName("close")[0];
    console.log(g);
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }






}


//photoDisplay();
albumDisplay();
//callPhotos();
//callAlbums()

// document.getElementById('row').addEventListener("click",function(e)){
//     if (e.target && e.target.matches(""))
// }
