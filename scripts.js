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
function setLocalStorage() {
    localStorage.setItem("data", JSON.stringify(itemsArray));
}
function getLocalStorage() {
    var _a;
    var gottenData = (_a = localStorage.getItem("data")) !== null && _a !== void 0 ? _a : "";
    if (gottenData == "")
        return null;
    var parsedData = JSON.parse(gottenData);
    return parsedData;
}
function getFirstTen() {
    return __awaiter(this, void 0, void 0, function () {
        var localData, _i, localData_1, item, firstTen, i, url, resp, retData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(getLocalStorage() !== null)) return [3 /*break*/, 1];
                    localData = getLocalStorage();
                    for (_i = 0, localData_1 = localData; _i < localData_1.length; _i++) {
                        item = localData_1[_i];
                        itemsArray.push(item);
                    }
                    console.log("Got data from storage");
                    return [3 /*break*/, 7];
                case 1:
                    firstTen = [];
                    for (i = 1; i <= 10; i++) {
                        url = "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/".concat(i);
                        firstTen.push(url);
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, Promise.all(firstTen.map(function (url) { return fetch(url); }))];
                case 3:
                    resp = _a.sent();
                    return [4 /*yield*/, Promise.all(resp.map(function (res) { return res.json(); }))];
                case 4:
                    retData = _a.sent();
                    console.log(retData);
                    retData.map(function (_a) {
                        var data = _a.data;
                        var card = new CardItem(data.name, data.id, data.image, data.common_locations, data.description, data.category);
                        itemsArray.push(card);
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Error fetching data", error_1);
                    return [3 /*break*/, 6];
                case 6:
                    console.log("Got Data from api");
                    setLocalStorage();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
/*async function getRestOfData() {
  let count = itemsArray.length + 1;
  while (true) {
    if (count === 100) break;
    const res = await fetch(
      `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${count}`,
    );
    const data = await res.json();
    if (data.status !== 200) {
      break;
    } else {
      const item = new CardItem(
        data.data.name,
        data.data.id,
        data.data.image,
        data.data.common_locations,
        data.data.description,
        data.data.category,
      );
      itemsArray.push(item);
      count++;
    }
  }
}

getRestOfData().then(() => {
  setLocalStorage();
});
*/
/*loadMore?.addEventListener("click", () => {
  const current: number = itemsArray.length + 1;
  getData(current).then(() => {
    displayCard();
    setLocalStorage();
  });
});
*/
function displayCard() {
    if (cardHolder !== null) {
        cardHolder.innerHTML = "";
    }
    itemsArray.forEach(function (item, i) {
        createCard(item, i);
        likedOrNot(item);
    });
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
    });
}
function createCard(item, itemIndex) {
    var zeldaDiv = document.createElement("div");
    zeldaDiv.classList += "zeldaItem";
    zeldaDiv.id = "zeldaItem-".concat(item.id);
    zeldaDiv.innerHTML = "\n            <div class=\"zeldaHeadInfo\">\n              <div class=\"img_wrapper\">\n                <img\n                  src=\"".concat(item.picture, "\"\n                  alt=\"").concat(item.name, "\"\n                />\n              </div>\n              <div class=\"zeldaItemDesc\">\n                <h4>").concat(item.name, "</h4>\n                <p>\n                  <strong>Located at:</strong>\n                  <br />\n                  ").concat((item === null || item === void 0 ? void 0 : item.location) || "No Location", "\n                </p>\n                <div class=\"itemDescInternal\">\n                  <p>ID: ").concat(item.id, "</p>\n                  <i class=\"fa-regular fa-heart\"></i>\n                </div>\n              </div>\n            </div>\n            <hr />\n            <div class=\"zeldaInfo\">\n              <p>\n                \"").concat(item.description, "\"\n              </p>\n            </div>\n");
    cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.appendChild(zeldaDiv);
}
getFirstTen().then(displayCard);
