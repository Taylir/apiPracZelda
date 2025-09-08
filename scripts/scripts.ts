const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");
const loadMore = document.querySelector<HTMLButtonElement>("#loadMore");

const itemsArray: Array<CardItem> = [];
let tempArray: Array<CardItem> = [];

class CardItem {
  name: string;
  id: number;
  picture: string;
  location: string;
  description: string;
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

  set liked(newLike: boolean) {
    this.liked = newLike;
  }
}

function setLocalStorage(data: string = "data"): void {
  localStorage.setItem(`${data}`, JSON.stringify(itemsArray));
}

function getLocalStorage(data: string = "data"): any {
  const gottenData = localStorage.getItem(`${data}`) ?? "";
  if (gottenData == "") return null;
  const parsedData = JSON.parse(gottenData);
  return parsedData;
}

async function getAllData(): Promise<void> {
  const localData: CardItem[] = getLocalStorage("data");

  if (localData?.length >= 300) {
    console.log("Got data from the storage");
    for (const card of localData) {
      itemsArray.push(card);
      if (itemsArray.length === 10) displayCard(itemsArray);
    }
    console.log(cardHolder?.childElementCount);
  } else {
    console.log("Got data from the api");

    const resp = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all",
    );
    const { data } = await resp.json();
    data.sort((a: CardItem, b: CardItem): number => a.id - b.id);
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
      if (itemsArray.length === 10) {
        displayCard(itemsArray);
      }
    }
    setLocalStorage();
  }
}

loadMore?.addEventListener("click", (): void => {
  const usageArr = tempArray.length > 0 ? tempArray : itemsArray;
  const currentAmount: number = cardHolder?.childElementCount ?? 0;
  const wantedCards: Array<CardItem> = usageArr.slice(0, currentAmount + 10);
  displayCard(wantedCards, currentAmount + 10);
});

function displayCard(arr: CardItem[], num: number = 10): void {
  if (cardHolder !== null) {
    cardHolder.innerHTML = "";
  }
  for (let i = 0; i < num; i++) {
    createCard(arr[i], i);
    likedOrNot(arr[i]);
  }
}

function likedOrNot(item: CardItem): void {
  const thisItem = document.querySelector(`#zeldaItem-${item.id}`);
  const thisHeart = thisItem?.querySelector(".fa-heart");
  if (item.liked === true) {
    thisHeart?.classList.remove("fa-regular");
    thisHeart?.classList.add("fa-solid");
  }
  thisHeart?.addEventListener("click", (): void => {
    if (thisHeart.classList.contains("fa-regular")) {
      thisHeart.classList.remove("fa-regular");
      thisHeart.classList.add("fa-solid");
      item.liked = true;
      setLocalStorage();
    } else {
      thisHeart.classList.remove("fa-solid");
      thisHeart.classList.add("fa-regular");
      item.liked = false;
      setLocalStorage();
    }
    console.log(`Item: ${item.id}, Liked: ${item.liked}`);
  });
}

function createCard(item: CardItem, itemIndex: number): void {
  const zeldaDiv = document.createElement("div");
  zeldaDiv.classList.add("zeldaItem");
  zeldaDiv.id = `zeldaItem-${item.id}`;
  zeldaDiv.innerHTML = `
  <article class="zeldaCard">
    <div class="zeldaImage">
      <img src="${item.picture}" alt="Image of ${item.name}" />
    </div>
    <div class="zeldaContent">
      <header class="zeldaHeader">
        <h2>${item.name}</h2>
        <button class="favoriteButton" aria-label="Add to favorites">
          <i class="fa-regular fa-heart"></i>
        </button>
      </header>
      <p class="location">
        <strong>Located at:</strong> ${item?.location || "No Location"}
      </p>
      <p class="id">ID: ${item.id}</p>
      <p class="description">"${item.description}"</p>
    </div>
  </article>
`;
  cardHolder?.appendChild(zeldaDiv);
}

const filterButtons = document.querySelectorAll(".filterButton");
function getFilterButton(value: string): void {
  tempArray = itemsArray.filter((item) => item.category === value);
  displayCard(tempArray);
}
filterButtons.forEach((button): void => {
  button.addEventListener("click", (e: any): void =>
    getFilterButton(e.target?.value),
  );
});

getAllData();
