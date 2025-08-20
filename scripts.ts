const testData = [
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
  {
    data: {
      category: "creatures",
      common_locations: ["Hyrule Field", "West Necluda"],
      description:
        "These medium-sized beasts can be found all throughout Hyrule. you can most often find them foraging for food in forests or meadows. Although usually docile, they won't hesitate to charge you full force if you get too close.",
      dlc: false,
      drops: ["raw meat"],
      edible: false,
      id: 11,
      image:
        "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/woodland_boar/image?game=totk",
      name: "woodland boar",
    },
    message: "",
    status: 200,
  },
];

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

function getLocalLength() {
  const data = localStorage.getItem("data") ?? "";
  if (!data) return 1;
  const parsed = JSON.parse(data);
  return parsed.length
}

function setLocalStorage() {
  const stringArr = JSON.stringify(itemsArray);
  localStorage.setItem("data", stringArr);
}

function getLocalStorage() {
  const data = localStorage.getItem("data") ?? "";
  const parsed = JSON.parse(data)
  itemsArray.push(...parsed);
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
  } else {
    testData.forEach(({ data }) => {
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

getData().then(displayCard);
