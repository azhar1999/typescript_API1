//interface of album

interface IAlbums{

    userId:string
    id:string
    title:string

}

//interface of photos

interface IPhotos{

    albumId:string
    id:string
    title:string
    url:string
    thumbnailUrl:string

}

//interface to photo and album fetch api

interface IApiFetcher{  

    url:string;
    array:Array<IAlbums|IPhotos>;
    fetcher();

}


//interface to inputalbumdatas  and inputphotodatas into indexedDB

interface IinputDatas{

    inputArray:Array<IAlbums|IPhotos>;
    insertdatas(objectstorename:string);

}


//interface to get albumdatas and photodatas from indexedDB



interface IgetDatas{

    objectstorename:String
    getdatas();

}

//class to search inside album and photo indexedDB


interface ISearch{

    key:string;
    searchArray:Array<IAlbums|IPhotos>;
    searchmethod();

}

//interace to displayphotos and displayalbums
interface IDisplaydatas{

    inputArray:Array<IPhotos|IAlbums>;
    displaydatas();

}

let albumArray:Array<IAlbums>;
let photoArray:Array<IPhotos>;


const searchElement = document.getElementById('searchInput')
const searchPhotoElement = document.getElementById('searchPhotoInput')



// to create databse and objectstore

let request = window.indexedDB.open("albumDB")

request.onupgradeneeded=(e)=>{

    let db = request.result
    let albumstore = db.createObjectStore("albumobjectstore",{keyPath:'id'})
    let photostore = db.createObjectStore("photoobjectstore",{keyPath:'id'})
    photostore.createIndex('albumId','albumId')
    
};



//class to fetch api album

class AlbumApiFetcher implements IApiFetcher{

    url:string;
    array= new Array<IAlbums>();

    constructor(url:string){

        this.url = url
    }

    public async fetcher(){

        await fetch(this.url)
            .then(response=>response.json())
                .then(json=>{
                    this.array=json;
                            })
    }

}


// class to fetch api photos

class PhotosApiFetcher implements IApiFetcher{

    url:string;
    array= new Array<IPhotos>();

    constructor(url:string){

        this.url = url
    }

    public async fetcher(){

        await fetch(this.url)
            .then(response=>response.json())
                .then(json=>{
                    this.array=json;
                            })
    }

}


//class to inputalbumdatas into indexedDB

class InputalbumDatas implements IinputDatas {

    inputArray = new Array<IAlbums>;
    constructor(phArray:Array<IAlbums>){

        this.inputArray=phArray
    }

    async insertdatas(objectstorename:string){

         let db = request.result
        this.inputArray.forEach((item:Object) => {

            let transaction = db.transaction(objectstorename, "readwrite"); 
            let objectStore = transaction.objectStore(objectstorename);
            let addRequest = objectStore.add(item)
        }
        )
    }

}

//class to inputphotodatas into indexedDB


class InputphotoDatas implements IinputDatas {

    inputArray = new Array<IPhotos>;

    constructor(phArray:Array<IPhotos>){

        this.inputArray=phArray
    }

    async insertdatas(objectstorename:string){

        let db = request.result
        this.inputArray.forEach((item:Object) => {

            let transaction = db.transaction(objectstorename, "readwrite"); 
            let objectStore = transaction.objectStore(objectstorename);
            let addRequest = objectStore.add(item)
        }
        )
    }

}



//class to get albumdatas from indexedDB

class GetalbumDatas implements IgetDatas{

    objectstorename :string

    constructor(object:string){

        this.objectstorename=object
    }

    async getdatas(){

        let promise:Promise<Array<IAlbums>> = new Promise((resolve)=>{

            let db = request.result
            let transaction = db.transaction(this.objectstorename, "readwrite");
            let objectStore = transaction.objectStore(this.objectstorename);
            let getRequest = objectStore.getAll()

            getRequest.onsuccess=()=>{

                let array:Array<IAlbums> =getRequest.result
                resolve(array)
            }
            }
            )
            return promise
    }

}



//class to get photodatas from indexedDB


class GetphotoDatas implements IgetDatas{

    objectstorename :string
    albumidvalue:number

    constructor(object:string,albumidvalue:number){

        this.objectstorename=object
        this.albumidvalue=albumidvalue
    }

    async getdatas(){

        let promise:Promise<Array<IPhotos>> = new Promise((resolve)=>{

            let db = request.result
            let transaction = db.transaction(this.objectstorename, "readwrite");
            let objectStore = transaction.objectStore(this.objectstorename);
            const opencursor = objectStore.openCursor()
            let arr = new Array<IPhotos>()

            opencursor.onsuccess = () => {

                const cursor = opencursor.result;
                if(cursor){
                    if (cursor.value.albumId==this.albumidvalue)
                        {
                            arr.push(cursor.value)
                        }
                    cursor.continue();
           
                }

                else{
                    resolve(arr)
                    console.log("succesful");
            
                }
            }
         
            
        })
            
        return promise

    }

}


//class to search inside album indexedDB

class AlbumSearch implements ISearch{

    key:string;
    searchArray = new Array<IAlbums>;

    constructor(key:string,searchArray:any[]){

        this.key=key;
        this.searchArray=searchArray;
    }

    searchmethod(){

    var searching = new RegExp(`${this.key}`, "gi")
    var resultalbumname = this.searchArray.filter(function (e: any) {
        return searching.test(e.title);

    });

    let albumObject = new DisplayAlbums(resultalbumname)
    albumObject.displaydatas(); 

    }

}

//class to search inside photo of current albumID indexedDB


class PhotoSearch implements ISearch{

    key:string;
    searchArray = new Array<IPhotos>;

    constructor(key:string,searchArray:any[]){

        this.key=key;
        this.searchArray=searchArray;
    }

    searchmethod(){
    
    var searching = new RegExp(`${this.key}`, "gi")
    var resultphotoname = this.searchArray.filter(function (e: any) {
        return searching.test(e.title);

    });
    
    let photoObject = new DisplayPhotos(resultphotoname)
    photoObject.displaydatas()

    }

}


//class to display Photos 

class DisplayPhotos implements IDisplaydatas {
   
    inputArray = new Array<IPhotos>;

    constructor(phArray:any){

        this.inputArray=phArray
    }

    async displaydatas(){

            var s :string= "";
            for (var i = 0; i < this.inputArray.length; i++) {
                    s += `<div class ="photocard">
        
                                        <div class="photocontent" id="phototitle">
                                        ${this.inputArray[i].title}
                                        </div>
                                        <div class="photocontent" id ="photoclick">Hover to show color</div>
                                        <div class="photocontent" id="photourl">
                                        <img src= ${this.inputArray[i].thumbnailUrl}>
                                        </div>
                                        </div>`
                
            }
        
            let displayqueryphotos= document.querySelector(".modalcont") as HTMLInputElement;
            displayqueryphotos.innerHTML = "";
            displayqueryphotos.innerHTML = s;
            
        
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
        
    }

//class to display Photos 


class DisplayAlbums implements IDisplaydatas{

    inputArray = new Array<IAlbums>;

    constructor(phArray:any){

        this.inputArray=phArray
    }

    async displaydatas(){

        let displayquery= document.querySelector('.row') as HTMLInputElement;
        displayquery.innerHTML  = ""
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
                        </div>`
        }

        var classArray = document.getElementsByClassName('card')  ;

        for (var i = 0; i < classArray.length; i++) {

            var cardid = "cardid" + classArray[i].id
            classArray[i].setAttribute("id", cardid)
        }

        var buttonArray = document.getElementsByClassName('button');

        for (var i = 0; i < classArray.length; i++) {

            var buttonid = this.inputArray[i].id
            buttonArray[i].setAttribute("id", buttonid)
        }

        photoArray=[]
        
        let btns = document.querySelectorAll('.button');
        btns.forEach(function (i) {
        i.addEventListener('click', async function () {

            var buttonid:number = +i.id
            let getphoto = new GetphotoDatas("photoobjectstore",buttonid)
            photoArray = await getphoto.getdatas()

            let dispphoto = new DisplayPhotos(photoArray)
            dispphoto.displaydatas()
            

        });
    });
        
    }
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



//search albums

const DebounceAlbums = debounce(()=>searchAlb())

const DebouncePhotos = debounce(()=>searchPhot())

function searchAlb(){
    var searchname = <HTMLInputElement>document.getElementById("searchInput");
    let searchalbumObject = new AlbumSearch(searchname.value,albumArray)
    searchalbumObject.searchmethod()

}

function searchPhot(){
    var searchname = <HTMLInputElement>document.getElementById("searchPhotoInput");
    let searchphotoObject = new PhotoSearch(searchname.value,photoArray)
    searchphotoObject.searchmethod() 
    

}

searchElement?.addEventListener('input',DebounceAlbums)



searchPhotoElement?.addEventListener('input',DebouncePhotos)


const run=async ()=>{

    let apialbum = new AlbumApiFetcher('https://jsonplaceholder.typicode.com/albums');
    await apialbum.fetcher();
    
    let apiphoto = new PhotosApiFetcher('https://jsonplaceholder.typicode.com/photos');
    await apiphoto.fetcher()
    
    let insertalbum = new InputalbumDatas(apialbum.array)
    await insertalbum.insertdatas("albumobjectstore");

    
    let insertphoto = new InputphotoDatas(apiphoto.array)
    await insertphoto.insertdatas("photoobjectstore");

    let getalbum = new GetalbumDatas("albumobjectstore")
    albumArray = await getalbum.getdatas()

    let dispdata = new DisplayAlbums(albumArray)
    dispdata.displaydatas();
}
    

//run the program

run();










