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

async function getFirstTen() {
  if (getLocalStorage() !== null) {
    const localData = getLocalStorage();
    for (const item of localData) {
      itemsArray.push(item);
    }
    console.log("Got data from storage");
  } else {
    const firstTen: Array<string> = [];
    for (let i = 1; i <= 10; i++) {
      const url = `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${i}`;
      firstTen.push(url);
    }
    try {
      const resp = await Promise.all(firstTen.map((url) => fetch(url)));
      const retData = await Promise.all(resp.map((res) => res.json()));
      retData.map(({ data }) => {
        const card = new CardItem(
          data.name,
          data.id,
          data.image,
          data.common_locations,
          data.description,
          data.category,
        );
        itemsArray.push(card);
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
    console.log("Got Data from api");
    setLocalStorage();
  }
}
async function getData(num = 1) {
  const useAPI = false;
  if (useAPI) {
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
        data.category,
      );
      itemsArray.push(item);
    }
  }
}

loadMore?.addEventListener("click", () => {
  const current: number = itemsArray.length + 1;
  getData(current).then(displayCard);
});

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

getFirstTen().then(displayCard);
