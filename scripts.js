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
var testData = [
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
    {
        data: {
            category: "creatures",
            common_locations: ["Hyrule Field", "West Necluda"],
            description: "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
            dlc: false,
            drops: ["raw meat"],
            edible: false,
            id: 11,
            image: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
            name: "woodland boar",
        },
        message: "",
        status: 200,
    },
];
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
function checkLocal() {
    var _a;
    var stringArr = JSON.stringify(itemsArray);
    localStorage.setItem("data", stringArr);
    var returnData = (_a = localStorage.getItem("data")) !== null && _a !== void 0 ? _a : "";
    var parsedData = JSON.parse((returnData));
    console.log(parsedData.length);
}
function getData() {
    return __awaiter(this, arguments, void 0, function (num) {
        var useAPI, i, res, data, item;
        if (num === void 0) { num = 1; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    useAPI = false;
                    if (!useAPI) return [3 /*break*/, 6];
                    i = num;
                    _a.label = 1;
                case 1:
                    if (!(i <= num + 9)) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/entry/".concat(i))];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = (_a.sent()).data;
                    item = new CardItem(data.name, data.id, data.image, data.common_locations, data.description, data.category);
                    itemsArray.push(item);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    checkLocal();
                    return [3 /*break*/, 7];
                case 6:
                    testData.forEach(function (_a) {
                        var data = _a.data;
                        var card = new CardItem(data.name, data.id, data.image, data.common_locations, data.description, data.category);
                        itemsArray.push(card);
                    });
                    checkLocal();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
loadMore === null || loadMore === void 0 ? void 0 : loadMore.addEventListener("click", function () {
    var current = itemsArray.length + 1;
    getData(current).then(displayCard);
});
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
getData().then(displayCard);
