var cardHolder = document.querySelector("#displayHolder");
function createCard() {
    var zeldaDiv = document.createElement("div");
    zeldaDiv.classList += "zeldaItem";
    zeldaDiv.innerHTML = "\n            <div class=\"zeldaHeadInfo\">\n              <div class=\"img_wrapper\">\n                <img\n                  src=\"https://botw-compendium.herokuapp.com/api/v3/compendium/entry/donkey/image?game=totk\"\n                  alt=\"\"\n                />\n              </div>\n              <div class=\"zeldaItemDesc\">\n                <h4>Donkey</h4>\n                <p>\n                  <strong>Located at:</strong>\n                  <br />\n                  Greater Hyrule\n                </p>\n                <div class=\"itemDescInternal\">\n                  <p>id:7</p>\n                  <i class=\"fa-regular fa-heart\"></i>\n                </div>\n              </div>\n            </div>\n            <hr />\n            <div class=\"zeldaInfo\">\n              <p>\n                \"Smaller than horses, these are raised as livestock in the\n                countryside, so they don't exist in the wild. They're more\n                powerful than they look and specialize in transporting baggage.\n                This has made them popular with traveling merchants.\"\n              </p>\n            </div>\n";
    cardHolder === null || cardHolder === void 0 ? void 0 : cardHolder.appendChild(zeldaDiv);
    var heartSelection = document.querySelector(".fa-heart");
    heartSelection === null || heartSelection === void 0 ? void 0 : heartSelection.addEventListener("click", function () {
        if (heartSelection.classList.contains("fa-regular")) {
            heartSelection.classList.remove("fa-regular");
            heartSelection.classList.add("fa-solid");
        }
        else {
            heartSelection.classList.add("fa-regular");
            heartSelection.classList.remove("fa-solid");
        }
    });
}
createCard();
