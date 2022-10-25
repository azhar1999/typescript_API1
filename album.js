"use strict";
//interface of album
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let albumArray;
let photoArray;
const searchElement = document.getElementById('searchInput');
const searchPhotoElement = document.getElementById('searchPhotoInput');
// to create databse and objectstore
let request = window.indexedDB.open("albumDB");
request.onupgradeneeded = (e) => {
    let db = request.result;
    let albumstore = db.createObjectStore("albumobjectstore", { keyPath: 'id' });
    let photostore = db.createObjectStore("photoobjectstore", { keyPath: 'id' });
    photostore.createIndex('albumId', 'albumId');
};
//class to fetch api album
class AlbumApiFetcher {
    constructor(url) {
        this.array = new Array();
        this.url = url;
    }
    fetcher() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(this.url)
                .then(response => response.json())
                .then(json => {
                this.array = json;
            });
        });
    }
}
// class to fetch api photos
class PhotosApiFetcher {
    constructor(url) {
        this.array = new Array();
        this.url = url;
    }
    fetcher() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(this.url)
                .then(response => response.json())
                .then(json => {
                this.array = json;
            });
        });
    }
}
//class to inputalbumdatas into indexedDB
class InputalbumDatas {
    constructor(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    insertdatas(objectstorename) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = request.result;
            this.inputArray.forEach((item) => {
                let transaction = db.transaction(objectstorename, "readwrite");
                let objectStore = transaction.objectStore(objectstorename);
                let addRequest = objectStore.add(item);
            });
        });
    }
}
//class to inputphotodatas into indexedDB
class InputphotoDatas {
    constructor(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    insertdatas(objectstorename) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = request.result;
            this.inputArray.forEach((item) => {
                let transaction = db.transaction(objectstorename, "readwrite");
                let objectStore = transaction.objectStore(objectstorename);
                let addRequest = objectStore.add(item);
            });
        });
    }
}
//class to get albumdatas from indexedDB
class GetalbumDatas {
    constructor(object) {
        this.objectstorename = object;
    }
    getdatas() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve) => {
                let db = request.result;
                let transaction = db.transaction(this.objectstorename, "readwrite");
                let objectStore = transaction.objectStore(this.objectstorename);
                let getRequest = objectStore.getAll();
                getRequest.onsuccess = () => {
                    let array = getRequest.result;
                    resolve(array);
                };
            });
            return promise;
        });
    }
}
//class to get photodatas from indexedDB
class GetphotoDatas {
    constructor(object, albumidvalue) {
        this.objectstorename = object;
        this.albumidvalue = albumidvalue;
    }
    getdatas() {
        return __awaiter(this, void 0, void 0, function* () {
            let promise = new Promise((resolve) => {
                let db = request.result;
                let transaction = db.transaction(this.objectstorename, "readwrite");
                let objectStore = transaction.objectStore(this.objectstorename);
                const opencursor = objectStore.openCursor();
                let arr = new Array();
                opencursor.onsuccess = () => {
                    const cursor = opencursor.result;
                    if (cursor) {
                        if (cursor.value.albumId == this.albumidvalue) {
                            arr.push(cursor.value);
                        }
                        cursor.continue();
                    }
                    else {
                        resolve(arr);
                        console.log("succesful");
                    }
                };
            });
            return promise;
        });
    }
}
//class to search inside album indexedDB
class AlbumSearch {
    constructor(key, searchArray) {
        this.searchArray = new Array;
        this.key = key;
        this.searchArray = searchArray;
    }
    searchmethod() {
        var searching = new RegExp(`${this.key}`, "gi");
        var resultalbumname = this.searchArray.filter(function (e) {
            return searching.test(e.title);
        });
        let albumObject = new DisplayAlbums(resultalbumname);
        albumObject.displaydatas();
    }
}
//class to search inside photo of current albumID indexedDB
class PhotoSearch {
    constructor(key, searchArray) {
        this.searchArray = new Array;
        this.key = key;
        this.searchArray = searchArray;
    }
    searchmethod() {
        var searching = new RegExp(`${this.key}`, "gi");
        var resultphotoname = this.searchArray.filter(function (e) {
            return searching.test(e.title);
        });
        let photoObject = new DisplayPhotos(resultphotoname);
        photoObject.displaydatas();
    }
}
//class to display Photos 
class DisplayPhotos {
    constructor(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    displaydatas() {
        return __awaiter(this, void 0, void 0, function* () {
            var s = "";
            for (var i = 0; i < this.inputArray.length; i++) {
                s += `<div class ="photocard">
        
                                        <div class="photocontent" id="phototitle">
                                        ${this.inputArray[i].title}
                                        </div>
                                        <div class="photocontent" id ="photoclick">Hover to show color</div>
                                        <div class="photocontent" id="photourl">
                                        <img src= ${this.inputArray[i].thumbnailUrl}>
                                        </div>
                                        </div>`;
            }
            let displayqueryphotos = document.querySelector(".modalcont");
            displayqueryphotos.innerHTML = "";
            displayqueryphotos.innerHTML = s;
            var modalElement = document.getElementById("modal");
            var modal = modalElement.value;
            var span = document.getElementsByClassName("close")[0];
            modalElement.style.display = "block";
            span.onclick = function () {
                modalElement.style.display = "none";
            };
            window.onclick = function (event) {
                if (event.target == modal) {
                    modalElement.style.display = "none";
                }
            };
        });
    }
}
//class to display Photos 
class DisplayAlbums {
    constructor(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    displaydatas() {
        return __awaiter(this, void 0, void 0, function* () {
            let displayquery = document.querySelector('.row');
            displayquery.innerHTML = "";
            for (var i = 0; i < this.inputArray.length; i++) {
                displayquery.innerHTML += `<div class ="card">
                                
                                <div class="cardcontent" id ="cardtitle">
                                ${this.inputArray[i].title}
                                </div>
                                <div class="cardcontent" id ="cardid">
                                <p>${this.inputArray[i].id}</p>
                                </div>
                                <div class="cardcontent" id ="cardbutton">
                                <button type ="button" class ="button">click here</button>
                                </div>
                        </div>`;
            }
            var classArray = document.getElementsByClassName('card');
            for (var i = 0; i < classArray.length; i++) {
                var cardid = "cardid" + classArray[i].id;
                classArray[i].setAttribute("id", cardid);
            }
            var buttonArray = document.getElementsByClassName('button');
            for (var i = 0; i < classArray.length; i++) {
                var buttonid = this.inputArray[i].id;
                buttonArray[i].setAttribute("id", buttonid);
            }
            photoArray = [];
            let btns = document.querySelectorAll('.button');
            btns.forEach(function (i) {
                i.addEventListener('click', function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        var buttonid = +i.id;
                        let getphoto = new GetphotoDatas("photoobjectstore", buttonid);
                        photoArray = yield getphoto.getdatas();
                        let dispphoto = new DisplayPhotos(photoArray);
                        dispphoto.displaydatas();
                    });
                });
            });
        });
    }
}
function debounce(func, timeout = 500) {
    let timer;
    console.log();
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}
function searchAlbums() {
    {
        var searchname = document.getElementById("searchInput");
        let searchalbumObject = new AlbumSearch(searchname.value, albumArray);
        searchalbumObject.searchmethod();
    }
}
function searchPhotos() {
    {
        var searchname = document.getElementById("searchPhotoInput");
        let searchphotoObject = new PhotoSearch(searchname.value, photoArray);
        searchphotoObject.searchmethod();
    }
}
const debounceSearchAlbum = debounce(() => searchAlbums());
const debounceSearchPhotos = debounce(() => searchPhotos());
//search albums
searchElement === null || searchElement === void 0 ? void 0 : searchElement.addEventListener('input', debounceSearchAlbum);
//search photos
searchPhotoElement === null || searchPhotoElement === void 0 ? void 0 : searchPhotoElement.addEventListener('input', debounceSearchPhotos);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    let apialbum = new AlbumApiFetcher('https://jsonplaceholder.typicode.com/albums');
    yield apialbum.fetcher();
    let apiphoto = new PhotosApiFetcher('https://jsonplaceholder.typicode.com/photos');
    yield apiphoto.fetcher();
    let insertalbum = new InputalbumDatas(apialbum.array);
    yield insertalbum.insertdatas("albumobjectstore");
    let insertphoto = new InputphotoDatas(apiphoto.array);
    yield insertphoto.insertdatas("photoobjectstore");
    let getalbum = new GetalbumDatas("albumobjectstore");
    albumArray = yield getalbum.getdatas();
    let dispdata = new DisplayAlbums(albumArray);
    dispdata.displaydatas();
});
//run the program
run();
