const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");

const itemsArray: Array<CardItem> = [];

async function getInitialData() {
  for (let i = 1; i <= 10; i++) {
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
}

class CardItem {
  name: string;
  id: number;
  picture: string;
  location: string;
  description: string;
  liked: boolean;

  constructor(
    name: string,
    id: number,
    picture: string,
    location: string,
    description: string,
  ) {
    ((this.name = name),
      (this.id = id),
      (this.picture = picture),
      (this.location = location),
      (this.description = description),
      (this.liked = false));
  }
}

function displayCard() {
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

getInitialData().then(displayCard);
