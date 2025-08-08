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
      (this.description = description));
  }
}

function displayCard() {
  itemsArray.forEach((item: CardItem, i: number) => {
    createCard(item, i);
  });
}

function createCard(item: CardItem, itemIndex: number): void {
  const zeldaDiv = document.createElement("div");
  zeldaDiv.classList += "zeldaItem";
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
                  ${item?.location}
                </p>
                <div class="itemDescInternal">
                  <p>id: ${item.id}</p>
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
  console.log(" I ran");
  cardHolder?.appendChild(zeldaDiv);
  console.log("I ran again");

  const heartSelection = document.querySelector(".fa-heart");
  heartSelection?.addEventListener("click", () => {
    if (heartSelection.classList.contains("fa-regular")) {
      heartSelection.classList.remove("fa-regular");
      heartSelection.classList.add("fa-solid");
    } else {
      heartSelection.classList.add("fa-regular");
      heartSelection.classList.remove("fa-solid");
    }
  });
}

getInitialData().then(displayCard);
