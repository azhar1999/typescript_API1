

let x: any;
let y: any;
let p: any;
let f: any;
let g: any;

let albID: any;



var albumArray: any = [];

var photoArray: any = [];


var photoArrayused:any=[];

var btns: any;



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
        store.openCursor().onsuccess = (event: any) => {
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
        store.openCursor().onsuccess = (event: any) => {
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
    return new Promise((res: any) => {
        setTimeout(() => {
            res();
        }, 500);
    });


}


async function albumDisplay(albumArray1: any) {



    f = document.querySelector('.row');
    f.innerHTML = ""

    for (var i = 0; i < albumArray1.length; i++) {
        p = albumArray1[i]
        f.innerHTML += `<div class ="card">
                                <div class="cardcontents">
                                <div class="cardtitle">
                                <h3>${p.title}</h3>
                                </div>
                                <div class="cardid">
                                <p>${p.id}</p>
                                </div>
                                <div class="cardbutton">
                                <button type ="button" class ="button">click here</button>
                                </div>
                                </div>
                        </div>`

    }
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
    photoArray = []
    getPhoto();
    await wait();
    btns.forEach(function (i) {
        i.addEventListener('click', function () {
            albID = i.id
            photoArrayused=[]
            
            for (var j=0;j<photoArray.length;j++){
                if (photoArray[j].albumId==albID){
                    photoArrayused.push(photoArray[j])
                }
            }

            photoDisplay(albID, photoArrayused);
        });
    });
}


async function photoDisplay(albumID: any, photoArray1: any) {
    var s = "";

    for (var i = 0; i < photoArray1.length; i++) {
        if (photoArray1[i].albumId == albumID) {

            s += `<div class ="photocard">

                                <div class="phototitle">
                                <h3>${photoArray1[i].title}</h3>
                                </div>
                                <div class="photourl">
                                <img src= ${photoArray1[i].thumbnailUrl}>
                                </div>
                                </div>`
        }
    }


    // f+= `<div class ="modal" id="mymodal">
    // <div class="modal-content">
    //     <span class ="close">&times;</span>`+s+`</div></div>`
    g = document.querySelector(".modalcont")
    g.innerHTML = "";
    g.innerHTML = s;
    

    var modalElement = <HTMLInputElement>document.getElementById("modal")
    var modal = modalElement.value
    var span = <HTMLElement>document.getElementsByClassName("close")[0];

    modalElement.style.display = "block";

    span.onclick = function () {
        modalElement.style.display = "none";
    }

    window.onclick = function (event: any) {
        if (event.target == modal) {
            modalElement.style.display = "none";
        }
    }
}

async function search() {
    var searchname1 = <HTMLInputElement>document.getElementById("searchInput");
    var searchname = searchname1.value

    searchBy(searchname, albumArray);

}

async function searchPhotos() {
    var searchname1 = <HTMLInputElement>document.getElementById("searchPhotoInput");
    var searchname = searchname1.value

    if (searchname===""||searchname==null){
        photoDisplay(albID,photoArrayused)
    }else{

    searchByPhotos(searchname, photoArrayused);
    }

}

function searchBy(searchname: any, albumArray: any) {
    var searching = new RegExp(`${searchname}`, "gi")

    var resultalbumname = albumArray.filter(function (el: any) {
        return searching.test(el.title);

    });
    albumDisplay(resultalbumname);
}

function searchByPhotos(searchname: any, photoArraydup1: any) {
    var searching = new RegExp(`${searchname}`, "gi")

    var resultphotoname = photoArraydup1.filter(function (el: any) {
        return searching.test(el.title);

    });

    
    photoDisplay(albID, resultphotoname);
}


async function runDisplay() {
    getAlbum();
    await wait();
    albumDisplay(albumArray);

}



function debounce(func: Function, timeout = 500) {
    let timer: number;
    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);

    };
}

function deleteDatabase(){
    var r1 = indexedDB.deleteDatabase("photoDatabase")
    var r2 = indexedDB.deleteDatabase("albumDatabase")
}


const process = debounce(() => search())


const processPhotos = debounce(() => searchPhotos())

//photoDisplay();

//callPhotos();
//callAlbums()
runDisplay();
// document.getElementById('row').addEventListener("click",function(e)){
//     if (e.target && e.target.matches(""))
// }
