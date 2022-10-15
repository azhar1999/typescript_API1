
const indexedDB =window.indexedDB ||window.mozIndexedDB ||window.webkitIndexedDB ||window.msIndexedDB ||window.shimIndexedDB;
let x;

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
    x = await getPhotos
    
    var photos = document.querySelector('.photos');
    for (var i = 0; i < 50; i++) {

        var p = x[i]
        // var image = document.createElement('image');
        // image.src = URL.createObjectURL(songslist[i].songalbumCover);
        photos.innerHTML += `<div >
        <img src=${p.thumbnailUrl}></div>`;
        console.log(x)
    }
}


async function callAlbums() {
    x = await getAlbums
    console.log(x)
}


callPhotos()
callAlbums()

