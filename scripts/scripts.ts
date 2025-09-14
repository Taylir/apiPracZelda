const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");
const loadMore = document.querySelector<HTMLButtonElement>("#loadMore");

let itemsArray: Array<CardItem> = [];
let favoritesArray: CardItem[] = [];
let sortSelection: string = "";

/* ============================
    Local Stoarage functions
   ============================ */

function setLocalStorage(data: string = "data"): void {
  const mixedArray: CardItem[] = itemsArray;
  for (const item of favoritesArray) {
    mixedArray.push(item);
  }
  favoritesArray = [];
  localStorage.setItem(`${data}`, JSON.stringify(mixedArray));
}

function getLocalStorage(data: string = "data"): any {
  const gottenData = localStorage.getItem(`${data}`) ?? "";
  if (gottenData === "") return null;
  const parsedData = JSON.parse(gottenData);
  return parsedData;
}

/* ============================
    API/Get data function
   ============================ */

async function getAllData(): Promise<void> {
  const localData: CardItem[] = getLocalStorage("data") ?? [];

  if (localData?.length >= 300) {
    console.log("Got data from the storage");
    for (const card of localData) {
      card.liked === true ? favoritesArray.push(card) : itemsArray.push(card);
      if (itemsArray.length === 12) displayCards();
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
      const card: CardItem = {
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
  }
}

loadMore?.addEventListener("click", (): void => {
  const currentAmount: number = cardHolder?.childElementCount ?? 0;
  displayCards(currentAmount + 12);
});

/* ============================
    Filter base Array
   ============================ */

function filterMainArrays() {
  itemsArray = itemsArray.filter((item) => item.liked === false);
  favoritesArray = favoritesArray.filter((item) => item.liked === true);
}
/* ============================
    Favoriting Section
   ============================ */

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
      moveFavorited(item);
    } else {
      thisHeart.classList.remove("fa-solid");
      thisHeart.classList.add("fa-regular");
      item.liked = false;
      moveFavorited(item);
    }
    setLocalStorage();
    console.log(`Item: ${item.id}, Liked: ${item.liked}`);
  });
}

function moveFavorited(item: CardItem) {
  if (item.liked === true) {
    favoritesArray.push(item);
    displayCards();
  } else if (item.liked === false) {
    itemsArray.push(item);
    displayCards();
  } else {
    console.log("wtf is going on");
  }
}

/* ============================
    Creating and displaying cards
   ============================ */

function displayCards(num: number = 12) {
  filterMainArrays();
  if (cardHolder && cardHolder?.childElementCount > 0) {
    cardHolder.innerHTML = "";
  }
  if (sortSelection === "") {
    for (let i = 0; i < num; i++) {
      createCard(itemsArray[i], i);
      likedOrNot(itemsArray[i]);
    }
  } else if (sortSelection === "favorites") {
    for (let i = 0; i < num; i++) {
      createCard(favoritesArray[i], i);
      likedOrNot(favoritesArray[i]);
    }
  } else {
    const filteredArr = itemsArray.filter(
      (item) => item.category === sortSelection,
    );
    for (let i = 0; i < num; i++) {
      createCard(filteredArr[i], i);
      likedOrNot(filteredArr[i]);
    }
  }
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

/* ============================
    Filtering section
   ============================ */

const filterButtons = document.querySelectorAll(".filterButton");
filterButtons.forEach((button): void => {
  button.addEventListener("click", (e: any): void => {
    sortSelection = e?.target?.value;
    displayCards();
  });
});

getAllData();
console.log(favoritesArray);
