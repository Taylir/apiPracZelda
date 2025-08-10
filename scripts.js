var cardHolder = document.querySelector("#displayHolder");
var loadMore = document.querySelector("#loadMore");
var itemsArray = [];
var CardItem = /** @class */ (function () {
    function CardItem(name, id, picture, location, description) {
        ((this.name = name),
            (this.id = id),
            (this.picture = picture),
            (this.location = location),
            (this.description = description),
            (this.liked = false));
    }
    return CardItem;
}());
/*async function getData(num = 1) {
  for (let i = num; i <= num + 9; i++) {
    const res = await fetch(
      `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${i}`,
    );
    const { data } = await res.json();

    const item = new CardItem(
      data.name,
      data.id,
      data.image,
      data.common_locations,
      data.description,
    );
    itemsArray.push(item);
  }
}*/
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
