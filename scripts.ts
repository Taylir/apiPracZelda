const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");
const loadMore = document.querySelector("#loadMore");

const itemsArray: Array<CardItem> = [];

class CardItem {
  name: string;
  id: number;
  picture: string;
  location: string;
  description: string;
  liked: boolean;
  category: string;

  constructor(
    name: string,
    id: number,
    picture: string,
    location: string,
    description: string,
    category: string,
  ) {
    ((this.name = name),
      (this.id = id),
      (this.picture = picture),
      (this.location = location),
      (this.description = description),
      (this.category = category),
      (this.liked = false));
  }
}

function setLocalStorage() {
  localStorage.setItem("data", JSON.stringify(itemsArray));
}

function getLocalStorage() {
  const gottenData = localStorage.getItem("data") ?? "";
  if (gottenData == "") return null;
  const parsedData = JSON.parse(gottenData);
  return parsedData;
}

async function getAllData() {
  const resp = await fetch(
    "https://botw-compendium.herokuapp.com/api/v3/compendium/all",
  );
  const { data } = await resp.json();
  for (const item of data) {
    const card = new CardItem(
      item.name,
      item.id,
      item.image,
      item.common_locations,
      item.description,
      item.category,
    );
    itemsArray.push(card);
  }
}

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
  itemsArray.forEach((item: CardItem, i: number) => {
    createCard(item, i);
    likedOrNot(item);
  });
}

function likedOrNot(item: CardItem) {
  const thisItem = document.querySelector(`#zeldaItem-${item.id}`);
  const thisHeart = thisItem?.querySelector(".fa-heart");
  thisHeart?.addEventListener("click", () => {
    if (thisHeart.classList.contains("fa-regular")) {
      thisHeart.classList.remove("fa-regular");
      thisHeart.classList.add("fa-solid");
      item.liked = true;
    } else {
      thisHeart.classList.remove("fa-solid");
      thisHeart.classList.add("fa-regular");
      item.liked = false;
    }
  });
}

function createCard(item: CardItem, itemIndex: number): void {
  const zeldaDiv = document.createElement("div");
  zeldaDiv.classList += "zeldaItem";
  zeldaDiv.id = `zeldaItem-${item.id}`;
  zeldaDiv.innerHTML = `
            <div class="zeldaHeadInfo">
              <div class="img_wrapper">
                <img
                  src="${item.picture}"
                  alt="${item.name}"
                />
              </div>
              <div class="zeldaItemDesc">
                <h4>${item.name}</h4>
                <p>
                  <strong>Located at:</strong>
                  <br />
                  ${item?.location || "No Location"}
                </p>
                <div class="itemDescInternal">
                  <p>ID: ${item.id}</p>
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
            <hr />
            <div class="zeldaInfo">
              <p>
                "${item.description}"
              </p>
            </div>
`;
  cardHolder?.appendChild(zeldaDiv);
}
