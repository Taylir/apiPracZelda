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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var cardHolder = document.querySelector("#displayHolder");
var loadMore = document.querySelector("#loadMore");
var itemsArray = [];
var favoritesArray = [];
var sortSelection = "";
/* ============================
    Local Stoarage functions
   ============================ */
function setLocalStorage(data) {
    if (data === void 0) { data = "data"; }
    var mixedArray = itemsArray;
    for (var _i = 0, favoritesArray_1 = favoritesArray; _i < favoritesArray_1.length; _i++) {
        var item = favoritesArray_1[_i];
        mixedArray.push(item);
    }
    favoritesArray = [];
    localStorage.setItem("".concat(data), JSON.stringify(mixedArray));
}
function getLocalStorage(data) {
    var _a;
    if (data === void 0) { data = "data"; }
    var gottenData = (_a = localStorage.getItem("".concat(data))) !== null && _a !== void 0 ? _a : "";
    if (gottenData === "")
        return null;
    var parsedData = JSON.parse(gottenData);
    return parsedData;
}
/* ============================
    API/Get data function
   ============================ */
function getAllData() {
    return __awaiter(this, void 0, void 0, function () {
        var localData, _i, localData_1, card, resp, data, _a, data_1, item, card;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    localData = (_b = getLocalStorage("data")) !== null && _b !== void 0 ? _b : [];
                    if (!((localData === null || localData === void 0 ? void 0 : localData.length) >= 300)) return [3 /*break*/, 1];
                    console.log("Got data from the storage");
                    for (_i = 0, localData_1 = localData; _i < localData_1.length; _i++) {
                        card = localData_1[_i];
                        card.liked === true ? favoritesArray.push(card) : itemsArray.push(card);
                        if (itemsArray.length === 12)
                            displayCards();
                    }
                    console.log(cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.childElementCount);
                    return [3 /*break*/, 4];
                case 1:
                    console.log("Got data from the api");
                    return [4 /*yield*/, fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all")];
                case 2:
                    resp = _c.sent();
                    return [4 /*yield*/, resp.json()];
                case 3:
                    data = (_c.sent()).data;
                    data.sort(function (a, b) { return a.id - b.id; });
                    for (_a = 0, data_1 = data; _a < data_1.length; _a++) {
                        item = data_1[_a];
                        card = {
                            name: item.name,
                            id: item.id,
                            picture: item.image,
                            location: item.common_locations,
                            description: item.description,
                            category: item.category,
                            liked: false,
                        };
                        itemsArray.push(card);
                        if (itemsArray.length === 12) {
                            displayCards();
                        }
                    }
                    setLocalStorage();
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
loadMore === null || loadMore === void 0 ? void 0 : loadMore.addEventListener("click", function () {
    var _a;
    var currentAmount = (_a = cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.childElementCount) !== null && _a !== void 0 ? _a : 0;
    displayCards(currentAmount + 12);
});
/* ============================
    Filter base Array
   ============================ */
function filterMainArrays() {
    itemsArray = itemsArray.filter(function (item) { return item.liked === false; });
    favoritesArray = favoritesArray.filter(function (item) { return item.liked === true; });
}
/* ============================
    Favoriting Section
   ============================ */
function likedOrNot(item) {
    var thisItem = document.querySelector("#zeldaItem-".concat(item.id));
    var thisHeart = thisItem === null || thisItem === void 0 ? void 0 : thisItem.querySelector(".fa-heart");
    if (item.liked === true) {
        thisHeart === null || thisHeart === void 0 ? void 0 : thisHeart.classList.remove("fa-regular");
        thisHeart === null || thisHeart === void 0 ? void 0 : thisHeart.classList.add("fa-solid");
    }
    thisHeart === null || thisHeart === void 0 ? void 0 : thisHeart.addEventListener("click", function () {
        if (thisHeart.classList.contains("fa-regular")) {
            thisHeart.classList.remove("fa-regular");
            thisHeart.classList.add("fa-solid");
            item.liked = true;
            moveFavorited(item);
        }
        else {
            thisHeart.classList.remove("fa-solid");
            thisHeart.classList.add("fa-regular");
            item.liked = false;
            moveFavorited(item);
        }
        setLocalStorage();
        console.log("Item: ".concat(item.id, ", Liked: ").concat(item.liked));
    });
}
function moveFavorited(item) {
    if (item.liked === true) {
        favoritesArray.push(item);
        displayCards();
    }
    else if (item.liked === false) {
        itemsArray.push(item);
        displayCards();
    }
    else {
        console.log("wtf is going on");
    }
}
/* ============================
    Creating and displaying cards
   ============================ */
function displayCards(num) {
    if (num === void 0) { num = 12; }
    filterMainArrays();
    if (cardHolder && (cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.childElementCount) > 0) {
        cardHolder.innerHTML = "";
    }
    if (sortSelection === "") {
        for (var i = 0; i < num; i++) {
            createCard(itemsArray[i], i);
            likedOrNot(itemsArray[i]);
        }
    }
    else if (sortSelection === "favorites") {
        for (var i = 0; i < num; i++) {
            createCard(favoritesArray[i], i);
            likedOrNot(favoritesArray[i]);
        }
    }
    else {
        var filteredArr = itemsArray.filter(function (item) { return item.category === sortSelection; });
        for (var i = 0; i < num; i++) {
            createCard(filteredArr[i], i);
            likedOrNot(filteredArr[i]);
        }
    }
}
function createCard(item, itemIndex) {
    var zeldaDiv = document.createElement("div");
    zeldaDiv.classList.add("zeldaItem");
    zeldaDiv.id = "zeldaItem-".concat(item.id);
    zeldaDiv.innerHTML = "\n  <article class=\"zeldaCard\">\n    <div class=\"zeldaImage\">\n      <img src=\"".concat(item.picture, "\" alt=\"Image of ").concat(item.name, "\" />\n    </div>\n    <div class=\"zeldaContent\">\n      <header class=\"zeldaHeader\">\n        <h2>").concat(item.name, "</h2>\n        <button class=\"favoriteButton\" aria-label=\"Add to favorites\">\n          <i class=\"fa-regular fa-heart\"></i>\n        </button>\n      </header>\n      <p class=\"location\">\n        <strong>Located at:</strong> ").concat((item === null || item === void 0 ? void 0 : item.location) || "No Location", "\n      </p>\n      <p class=\"id\">ID: ").concat(item.id, "</p>\n      <p class=\"description\">\"").concat(item.description, "\"</p>\n    </div>\n  </article>\n");
    cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.appendChild(zeldaDiv);
}
/* ============================
    Filtering section
   ============================ */
var filterButtons = document.querySelectorAll(".filterButton");
filterButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
        var _a;
        sortSelection = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value;
        displayCards();
    });
});
getAllData();
console.log(favoritesArray);
