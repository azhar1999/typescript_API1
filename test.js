
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
        }, 500);
    });


}


async function albumDisplay(albumArray1) {

    var f = document.querySelector('.row');
    f.innerHTML=""

    for (var i = 0; i < albumArray1.length; i++) {
        p = albumArray1[i]
        f.innerHTML += `<div class ="card">
                                <h3>${p.title}</h3>
                                <p>${p.id}</p>
                                <button type ="button" class ="button">click here</button>
                        </div>`

    }

    console.log(f);
   


    var classArray = document.getElementsByClassName('card');
  
    for (var i = 0; i < classArray.length; i++) {
        p = classArray[i];
        var cardid = "cardid" + albumArray1[i].id

        p.setAttribute("id", cardid)
    }
    var buttonArray = document.getElementsByClassName('button');
    for (var i = 0; i < classArray.length; i++) {
        p = buttonArray[i];
        var buttonid = albumArray1[i].id
        p.setAttribute("id", buttonid)
    }

  

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
    var s="";

    
    for (var i = 0; i < photoArray.length; i++) {
        if (photoArray[i].albumId == albumID) {


            s += `<div class ="photocard">
                                <img src= ${photoArray[i].thumbnailUrl}>
                                </div>`
                            
        }
    }

    // f+= `<div class ="modal" id="mymodal">
    // <div class="modal-content">
    //     <span class ="close">&times;</span>`+s+`</div></div>`
    var g = document.querySelector(".modalcont")
    g.innerHTML = "";
    g.innerHTML=s;
    console.log(g);
    var modal = document.getElementById("modal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    console.log(modal);
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

async function search()
{  
    var searchname=document.getElementById("searchInput").value;
    
    searchBy(searchname,albumArray);
    
}

function searchBy(searchname, albumArray){
    var searching = new RegExp(`${searchname}`,"gi")
   

    var resultalbumname = albumArray.filter(function(el){
        return searching.test(el.title);

    });


    albumDisplay(resultalbumname);


 }


async function runDisplay(){
    getAlbum();
    await wait();
    albumDisplay(albumArray);

}




function debounce(func,timeout){
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(() =>{
            func.apply(this,args);},500);
        };
    }

const process = debounce (() => search())



//photoDisplay();

//callPhotos();
//callAlbums()
runDisplay();
// document.getElementById('row').addEventListener("click",function(e)){
//     if (e.target && e.target.matches(""))
// }
