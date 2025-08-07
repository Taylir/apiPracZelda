const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");

const itemsArray: Array<CardItem> = [];

async function getInitialData() {
  const res = await fetch(
    "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/7",
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
getInitialData();

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

console.log(itemsArray);

function createCard(): void {
  const zeldaDiv = document.createElement("div");
  zeldaDiv.classList += "zeldaItem";
  zeldaDiv.innerHTML = `
            <div class="zeldaHeadInfo">
              <div class="img_wrapper">
                <img
                  src="https://botw-compendium.herokuapp.com/api/v3/compendium/entry/donkey/image?game=totk"
                  alt=""
                />
              </div>
              <div class="zeldaItemDesc">
                <h4>Donkey</h4>
                <p>
                  <strong>Located at:</strong>
                  <br />
                  Greater Hyrule
                </p>
                <div class="itemDescInternal">
                  <p>id:7</p>
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
            <hr />
            <div class="zeldaInfo">
              <p>
                "Smaller than horses, these are raised as livestock in the
                countryside, so they don't exist in the wild. They're more
                powerful than they look and specialize in transporting baggage.
                This has made them popular with traveling merchants."
              </p>
            </div>
`;
  cardHolder?.appendChild(zeldaDiv);
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

createCard();
