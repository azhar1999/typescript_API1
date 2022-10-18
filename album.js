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
var x;
var y;
var p;
var f;
var g;
var albID;
var albumArray = [];
var photoArray = [];
var photoArrayused = [];
var btns;
var getPhotos = new Promise(function (resolve) {
    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(function (response1) { return response1.json(); })
        .then(function (json) { resolve(json); });
});
var getAlbums = new Promise(function (resolve) {
    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(function (response1) { return response1.json(); })
        .then(function (json) { resolve(json); });
});
function callPhotos() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPhotos];
                case 1:
                    x = _a.sent();
                    request = indexedDB.open("photoDatabase", 5);
                    request.onerror = function (event) {
                        console.error("An error occurred with IndexedDB");
                        console.error(event);
                    };
                    request.onupgradeneeded = function () {
                        var db = request.result;
                        var store = db.createObjectStore("photos", { keyPath: "id" });
                        store.createIndex("title", ["title"]);
                    };
                    request.onsuccess = function () {
                        var db = request.result;
                        var transaction = db.transaction(["photos"], "readwrite");
                        var store = transaction.objectStore("photos");
                        for (var i = 0; i < x.length; i++) {
                            var p = x[i];
                            store.put(p);
                        }
                    };
                    return [2 /*return*/];
            }
        });
    });
}
function getPhoto() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = indexedDB.open("photoDatabase", 5);
            request.onsuccess = function () {
                var db = request.result;
                var transaction = db.transaction(["photos"], "readwrite");
                var store = transaction.objectStore("photos");
                store.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        photoArray.push(cursor.value);
                        cursor["continue"]();
                    }
                    else {
                        return photoArray;
                    }
                };
            };
            return [2 /*return*/];
        });
    });
}
function getAlbum() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = indexedDB.open("albumDatabase", 5);
            request.onsuccess = function () {
                var db = request.result;
                var transaction = db.transaction(["albums"], "readwrite");
                var store = transaction.objectStore("albums");
                store.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        albumArray.push(cursor.value);
                        cursor["continue"]();
                    }
                    else {
                        return albumArray;
                    }
                };
            };
            return [2 /*return*/];
        });
    });
}
function callAlbums() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAlbums];
                case 1:
                    x = _a.sent();
                    request = indexedDB.open("albumDatabase", 5);
                    request.onerror = function (event) {
                        console.error("An error occurred with IndexedDB");
                        console.error(event);
                    };
                    request.onupgradeneeded = function () {
                        var db = request.result;
                        var store = db.createObjectStore("albums", { keyPath: "id" });
                        store.createIndex("title", ["title"]);
                    };
                    request.onsuccess = function () {
                        var db = request.result;
                        var transaction = db.transaction(["albums"], "readwrite");
                        var store = transaction.objectStore("albums");
                        for (var i = 0; i < x.length; i++) {
                            var p = x[i];
                            store.put(p);
                        }
                    };
                    return [2 /*return*/];
            }
        });
    });
}
// getAlbum();
// getPhoto();
function wait() {
    return new Promise(function (res) {
        setTimeout(function () {
            res();
        }, 500);
    });
}
function albumDisplay(albumArray1) {
    return __awaiter(this, void 0, void 0, function () {
        var i, classArray, i, cardid, buttonArray, i, buttonid, btns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    f = document.querySelector('.row');
                    f.innerHTML = "";
                    for (i = 0; i < albumArray1.length; i++) {
                        p = albumArray1[i];
                        f.innerHTML += "<div class =\"card\">\n                                <div class=\"cardcontents\">\n                                <div class=\"cardtitle\">\n                                <h3>".concat(p.title, "</h3>\n                                </div>\n                                <div class=\"cardid\">\n                                <p>").concat(p.id, "</p>\n                                </div>\n                                <div class=\"cardbutton\">\n                                <button type =\"button\" class =\"button\">click here</button>\n                                </div>\n                                </div>\n                        </div>");
                    }
                    classArray = document.getElementsByClassName('card');
                    for (i = 0; i < classArray.length; i++) {
                        p = classArray[i];
                        cardid = "cardid" + albumArray1[i].id;
                        p.setAttribute("id", cardid);
                    }
                    buttonArray = document.getElementsByClassName('button');
                    for (i = 0; i < classArray.length; i++) {
                        p = buttonArray[i];
                        buttonid = albumArray1[i].id;
                        p.setAttribute("id", buttonid);
                    }
                    btns = document.querySelectorAll('button');
                    photoArray = [];
                    getPhoto();
                    return [4 /*yield*/, wait()];
                case 1:
                    _a.sent();
                    btns.forEach(function (i) {
                        i.addEventListener('click', function () {
                            albID = i.id;
                            photoArrayused = [];
                            for (var j = 0; j < photoArray.length; j++) {
                                if (photoArray[j].albumId == albID) {
                                    photoArrayused.push(photoArray[j]);
                                }
                            }
                            photoDisplay(albID, photoArrayused);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function photoDisplay(albumID, photoArray1) {
    return __awaiter(this, void 0, void 0, function () {
        var s, i, modalElement, modal, span;
        return __generator(this, function (_a) {
            s = "";
            for (i = 0; i < photoArray1.length; i++) {
                if (photoArray1[i].albumId == albumID) {
                    s += "<div class =\"photocard\">\n\n                                <div class=\"phototitle\">\n                                <h3>".concat(photoArray1[i].title, "</h3>\n                                </div>\n                                <div class=\"photourl\">\n                                <img src= ").concat(photoArray1[i].thumbnailUrl, ">\n                                </div>\n                                </div>");
                }
            }
            // f+= `<div class ="modal" id="mymodal">
            // <div class="modal-content">
            //     <span class ="close">&times;</span>`+s+`</div></div>`
            g = document.querySelector(".modalcont");
            g.innerHTML = "";
            g.innerHTML = s;
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
}
function search() {
    return __awaiter(this, void 0, void 0, function () {
        var searchname1, searchname;
        return __generator(this, function (_a) {
            searchname1 = document.getElementById("searchInput");
            searchname = searchname1.value;
            searchBy(searchname, albumArray);
            return [2 /*return*/];
        });
    });
}
function searchPhotos() {
    return __awaiter(this, void 0, void 0, function () {
        var searchname1, searchname;
        return __generator(this, function (_a) {
            searchname1 = document.getElementById("searchPhotoInput");
            searchname = searchname1.value;
            if (searchname === "" || searchname == null) {
                photoDisplay(albID, photoArrayused);
            }
            else {
                searchByPhotos(searchname, photoArrayused);
            }
            return [2 /*return*/];
        });
    });
}
function searchBy(searchname, albumArray) {
    var searching = new RegExp("".concat(searchname), "gi");
    var resultalbumname = albumArray.filter(function (el) {
        return searching.test(el.title);
    });
    albumDisplay(resultalbumname);
}
function searchByPhotos(searchname, photoArraydup1) {
    var searching = new RegExp("".concat(searchname), "gi");
    var resultphotoname = photoArraydup1.filter(function (el) {
        return searching.test(el.title);
    });
    photoDisplay(albID, resultphotoname);
}
function runDisplay() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getAlbum();
                    return [4 /*yield*/, wait()];
                case 1:
                    _a.sent();
                    albumDisplay(albumArray);
                    return [2 /*return*/];
            }
        });
    });
}
function debounce(func, timeout) {
    if (timeout === void 0) { timeout = 500; }
    var timer;
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
var process = debounce(function () { return search(); });
var processPhotos = debounce(function () { return searchPhotos(); });
//photoDisplay();
//callPhotos();
//callAlbums()
runDisplay();
// document.getElementById('row').addEventListener("click",function(e)){
//     if (e.target && e.target.matches(""))
// }
