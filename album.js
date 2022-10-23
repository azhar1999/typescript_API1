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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var albumArray;
var photoArray;
var searchElement = document.getElementById('searchInput');
var searchPhotoElement = document.getElementById('searchPhotoInput');
// to create databse and objectstore
var request = window.indexedDB.open("albumDB");
request.onupgradeneeded = function (e) {
    var db = request.result;
    var albumstore = db.createObjectStore("albumobjectstore", { keyPath: 'id' });
    var photostore = db.createObjectStore("photoobjectstore", { keyPath: 'id' });
    photostore.createIndex('albumId', 'albumId');
};
//class to fetch api album
var AlbumApiFetcher = /** @class */ (function () {
    function AlbumApiFetcher(url) {
        this.array = new Array();
        this.url = url;
    }
    AlbumApiFetcher.prototype.fetcher = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.url)
                            .then(function (response) { return response.json(); })
                            .then(function (json) {
                            _this.array = json;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlbumApiFetcher;
}());
// class to fetch api photos
var PhotosApiFetcher = /** @class */ (function () {
    function PhotosApiFetcher(url) {
        this.array = new Array();
        this.url = url;
    }
    PhotosApiFetcher.prototype.fetcher = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.url)
                            .then(function (response) { return response.json(); })
                            .then(function (json) {
                            _this.array = json;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PhotosApiFetcher;
}());
//class to inputalbumdatas into indexedDB
var InputalbumDatas = /** @class */ (function () {
    function InputalbumDatas(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    InputalbumDatas.prototype.insertdatas = function (objectstorename) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                db = request.result;
                this.inputArray.forEach(function (item) {
                    var transaction = db.transaction(objectstorename, "readwrite");
                    var objectStore = transaction.objectStore(objectstorename);
                    var addRequest = objectStore.add(item);
                });
                return [2 /*return*/];
            });
        });
    };
    return InputalbumDatas;
}());
//class to inputphotodatas into indexedDB
var InputphotoDatas = /** @class */ (function () {
    function InputphotoDatas(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    InputphotoDatas.prototype.insertdatas = function (objectstorename) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                db = request.result;
                this.inputArray.forEach(function (item) {
                    var transaction = db.transaction(objectstorename, "readwrite");
                    var objectStore = transaction.objectStore(objectstorename);
                    var addRequest = objectStore.add(item);
                });
                return [2 /*return*/];
            });
        });
    };
    return InputphotoDatas;
}());
//class to get albumdatas from indexedDB
var GetalbumDatas = /** @class */ (function () {
    function GetalbumDatas(object) {
        this.objectstorename = object;
    }
    GetalbumDatas.prototype.getdatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    var db = request.result;
                    var transaction = db.transaction(_this.objectstorename, "readwrite");
                    var objectStore = transaction.objectStore(_this.objectstorename);
                    var getRequest = objectStore.getAll();
                    getRequest.onsuccess = function () {
                        var array = getRequest.result;
                        resolve(array);
                    };
                });
                return [2 /*return*/, promise];
            });
        });
    };
    return GetalbumDatas;
}());
//class to get photodatas from indexedDB
var GetphotoDatas = /** @class */ (function () {
    function GetphotoDatas(object, albumidvalue) {
        this.objectstorename = object;
        this.albumidvalue = albumidvalue;
    }
    GetphotoDatas.prototype.getdatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    var db = request.result;
                    var transaction = db.transaction(_this.objectstorename, "readwrite");
                    var objectStore = transaction.objectStore(_this.objectstorename);
                    var opencursor = objectStore.openCursor();
                    var arr = new Array();
                    opencursor.onsuccess = function () {
                        var cursor = opencursor.result;
                        if (cursor) {
                            if (cursor.value.albumId == _this.albumidvalue) {
                                arr.push(cursor.value);
                            }
                            cursor["continue"]();
                        }
                        else {
                            resolve(arr);
                            console.log("succesful");
                        }
                    };
                });
                return [2 /*return*/, promise];
            });
        });
    };
    return GetphotoDatas;
}());
//class to search inside album indexedDB
var AlbumSearch = /** @class */ (function () {
    function AlbumSearch(key, searchArray) {
        this.searchArray = new Array;
        this.key = key;
        this.searchArray = searchArray;
    }
    AlbumSearch.prototype.searchmethod = function () {
        var searching = new RegExp("".concat(this.key), "gi");
        var resultalbumname = this.searchArray.filter(function (e) {
            return searching.test(e.title);
        });
        var albumObject = new DisplayAlbums(resultalbumname);
        albumObject.displaydatas();
    };
    return AlbumSearch;
}());
//class to search inside photo of current albumID indexedDB
var PhotoSearch = /** @class */ (function () {
    function PhotoSearch(key, searchArray) {
        this.searchArray = new Array;
        this.key = key;
        this.searchArray = searchArray;
    }
    PhotoSearch.prototype.searchmethod = function () {
        var searching = new RegExp("".concat(this.key), "gi");
        var resultphotoname = this.searchArray.filter(function (e) {
            return searching.test(e.title);
        });
        var photoObject = new DisplayPhotos(resultphotoname);
        photoObject.displaydatas();
    };
    return PhotoSearch;
}());
//class to display Photos 
var DisplayPhotos = /** @class */ (function () {
    function DisplayPhotos(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    DisplayPhotos.prototype.displaydatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s, i, displayqueryphotos, modalElement, modal, span;
            return __generator(this, function (_a) {
                s = "";
                for (i = 0; i < this.inputArray.length; i++) {
                    s += "<div class =\"photocard\">\n        \n                                        <div class=\"photocontent\" id=\"phototitle\">\n                                        ".concat(this.inputArray[i].title, "\n                                        </div>\n                                        <div class=\"photocontent\" id =\"photoclick\">Hover to show color</div>\n                                        <div class=\"photocontent\" id=\"photourl\">\n                                        <img src= ").concat(this.inputArray[i].thumbnailUrl, ">\n                                        </div>\n                                        </div>");
                }
                displayqueryphotos = document.querySelector(".modalcont");
                displayqueryphotos.innerHTML = "";
                displayqueryphotos.innerHTML = s;
                modalElement = document.getElementById("modal");
                modal = modalElement.value;
                span = document.getElementsByClassName("close")[0];
                modalElement.style.display = "block";
                span.onclick = function () {
                    modalElement.style.display = "none";
                };
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modalElement.style.display = "none";
                    }
                };
                return [2 /*return*/];
            });
        });
    };
    return DisplayPhotos;
}());
//class to display Photos 
var DisplayAlbums = /** @class */ (function () {
    function DisplayAlbums(phArray) {
        this.inputArray = new Array;
        this.inputArray = phArray;
    }
    DisplayAlbums.prototype.displaydatas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var displayquery, i, classArray, i, cardid, buttonArray, i, buttonid, btns;
            return __generator(this, function (_a) {
                displayquery = document.querySelector('.row');
                displayquery.innerHTML = "";
                for (i = 0; i < this.inputArray.length; i++) {
                    displayquery.innerHTML += "<div class =\"card\">\n                                \n                                <div class=\"cardcontent\" id =\"cardtitle\">\n                                ".concat(this.inputArray[i].title, "\n                                </div>\n                                <div class=\"cardcontent\" id =\"cardid\">\n                                <p>").concat(this.inputArray[i].id, "</p>\n                                </div>\n                                <div class=\"cardcontent\" id =\"cardbutton\">\n                                <button type =\"button\" class =\"button\">click here</button>\n                                </div>\n                        </div>");
                }
                classArray = document.getElementsByClassName('card');
                for (i = 0; i < classArray.length; i++) {
                    cardid = "cardid" + classArray[i].id;
                    classArray[i].setAttribute("id", cardid);
                }
                buttonArray = document.getElementsByClassName('button');
                for (i = 0; i < classArray.length; i++) {
                    buttonid = this.inputArray[i].id;
                    buttonArray[i].setAttribute("id", buttonid);
                }
                photoArray = [];
                btns = document.querySelectorAll('.button');
                btns.forEach(function (i) {
                    i.addEventListener('click', function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var buttonid, getphoto, dispphoto;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        buttonid = +i.id;
                                        getphoto = new GetphotoDatas("photoobjectstore", buttonid);
                                        return [4 /*yield*/, getphoto.getdatas()];
                                    case 1:
                                        photoArray = _a.sent();
                                        dispphoto = new DisplayPhotos(photoArray);
                                        dispphoto.displaydatas();
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return DisplayAlbums;
}());
function debounce(func, timeout) {
    if (timeout === void 0) { timeout = 500; }
    var timer;
    console.log();
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(_this, args);
        }, timeout);
    };
}
//search albums
searchElement === null || searchElement === void 0 ? void 0 : searchElement.addEventListener('input', function (event) {
    var searchname = document.getElementById("searchInput");
    var searchalbumObject = new AlbumSearch(searchname.value, albumArray);
    searchalbumObject.searchmethod();
});
//search photos
searchPhotoElement === null || searchPhotoElement === void 0 ? void 0 : searchPhotoElement.addEventListener('input', function (event) {
    var searchname = document.getElementById("searchPhotoInput");
    var searchphotoObject = new PhotoSearch(searchname.value, photoArray);
    searchphotoObject.searchmethod();
});
var run = function () { return __awaiter(_this, void 0, void 0, function () {
    var apialbum, apiphoto, insertalbum, insertphoto, getalbum, dispdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apialbum = new AlbumApiFetcher('https://jsonplaceholder.typicode.com/albums');
                return [4 /*yield*/, apialbum.fetcher()];
            case 1:
                _a.sent();
                apiphoto = new PhotosApiFetcher('https://jsonplaceholder.typicode.com/photos');
                return [4 /*yield*/, apiphoto.fetcher()];
            case 2:
                _a.sent();
                insertalbum = new InputalbumDatas(apialbum.array);
                return [4 /*yield*/, insertalbum.insertdatas("albumobjectstore")];
            case 3:
                _a.sent();
                insertphoto = new InputphotoDatas(apiphoto.array);
                return [4 /*yield*/, insertphoto.insertdatas("photoobjectstore")];
            case 4:
                _a.sent();
                getalbum = new GetalbumDatas("albumobjectstore");
                return [4 /*yield*/, getalbum.getdatas()];
            case 5:
                albumArray = _a.sent();
                dispdata = new DisplayAlbums(albumArray);
                dispdata.displaydatas();
                return [2 /*return*/];
        }
    });
}); };
//run the program
run();
