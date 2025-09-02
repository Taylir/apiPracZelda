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
var tempArray = [];
var CardItem = /** @class */ (function () {
    function CardItem(name, id, picture, location, description, category) {
        ((this.name = name),
            (this.id = id),
            (this.picture = picture),
            (this.location = location),
            (this.description = description),
            (this.category = category),
            (this.liked = false));
    }
    return CardItem;
}());
function setLocalStorage(data) {
    if (data === void 0) { data = "data"; }
    localStorage.setItem("".concat(data), JSON.stringify(itemsArray));
}
function getLocalStorage(data) {
    var _a;
    if (data === void 0) { data = "data"; }
    var gottenData = (_a = localStorage.getItem("".concat(data))) !== null && _a !== void 0 ? _a : "";
    if (gottenData == "")
        return null;
    var parsedData = JSON.parse(gottenData);
    return parsedData;
}
function getAllData() {
    return __awaiter(this, void 0, void 0, function () {
        var localData, _i, localData_1, card, resp, data, _a, data_1, item, card;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    localData = getLocalStorage("data");
                    if (!((localData === null || localData === void 0 ? void 0 : localData.length) >= 300)) return [3 /*break*/, 1];
                    console.log("Got data from the storage");
                    for (_i = 0, localData_1 = localData; _i < localData_1.length; _i++) {
                        card = localData_1[_i];
                        itemsArray.push(card);
                        if (itemsArray.length === 10)
                            displayCard(itemsArray);
                    }
                    console.log(cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.childElementCount);
                    return [3 /*break*/, 4];
                case 1:
                    console.log("Got data from the api");
                    return [4 /*yield*/, fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all")];
                case 2:
                    resp = _b.sent();
                    return [4 /*yield*/, resp.json()];
                case 3:
                    data = (_b.sent()).data;
                    data.sort(function (a, b) { return a.id - b.id; });
                    for (_a = 0, data_1 = data; _a < data_1.length; _a++) {
                        item = data_1[_a];
                        card = new CardItem(item.name, item.id, item.image, item.common_locations, item.description, item.category);
                        itemsArray.push(card);
                        if (itemsArray.length === 10) {
                            displayCard(itemsArray);
                        }
                    }
                    setLocalStorage();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
loadMore === null || loadMore === void 0 ? void 0 : loadMore.addEventListener("click", function () {
    var _a;
    var usageArr = tempArray.length > 0 ? tempArray : itemsArray;
    var currentAmount = (_a = cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.childElementCount) !== null && _a !== void 0 ? _a : 0;
    var wantedCards = usageArr.slice(0, currentAmount + 10);
    displayCard(wantedCards, currentAmount + 10);
});
function displayCard(arr, num) {
    if (num === void 0) { num = 10; }
    if (cardHolder !== null) {
        cardHolder.innerHTML = "";
    }
    for (var i = 0; i < num; i++) {
        createCard(arr[i], i);
        likedOrNot(arr[i]);
    }
}
function likedOrNot(item) {
    var thisItem = document.querySelector("#zeldaItem-".concat(item.id));
    var thisHeart = thisItem === null || thisItem === void 0 ? void 0 : thisItem.querySelector(".fa-heart");
    thisHeart === null || thisHeart === void 0 ? void 0 : thisHeart.addEventListener("click", function () {
        if (thisHeart.classList.contains("fa-regular")) {
            thisHeart.classList.remove("fa-regular");
            thisHeart.classList.add("fa-solid");
            item.liked = true;
        }
        else {
            thisHeart.classList.remove("fa-solid");
            thisHeart.classList.add("fa-regular");
            item.liked = false;
        }
        console.log("Item: ".concat(item.id, ", Liked: ").concat(item.liked));
    });
}
function createCard(item, itemIndex) {
    var zeldaDiv = document.createElement("div");
    zeldaDiv.classList += "zeldaItem";
    zeldaDiv.id = "zeldaItem-".concat(item.id);
    zeldaDiv.innerHTML = "\n            <div class=\"zeldaHeadInfo\">\n              <div class=\"img_wrapper\">\n                <img\n                  src=\"".concat(item.picture, "\"\n                  alt=\"Image of ").concat(item.name, "\"\n                />\n              </div>\n              <div class=\"zeldaItemDesc\">\n                <h4>").concat(item.name, "</h4>\n                <p>\n                  <strong>Located at:</strong>\n                  <br />\n                  ").concat((item === null || item === void 0 ? void 0 : item.location) || "No Location", "\n                </p>\n                <div class=\"itemDescInternal\">\n                  <p>ID: ").concat(item.id, "</p>\n                  <i class=\"fa-regular fa-heart\"></i>\n                </div>\n              </div>\n            </div>\n            <hr />\n            <div class=\"zeldaInfo\">\n              <p>\n                \"").concat(item.description, "\"\n              </p>\n            </div>\n");
    cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.appendChild(zeldaDiv);
}
var filterButtons = document.querySelectorAll(".filterButton");
function getFilterButton(value) {
    tempArray = itemsArray.filter(function (item) { return item.category === value; });
    displayCard(tempArray);
}
filterButtons.forEach(function (button) {
    button.addEventListener("click", function (e) { var _a; return getFilterButton((_a = e.target) === null || _a === void 0 ? void 0 : _a.value); });
});
getAllData();
