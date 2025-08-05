const cardHolder = document.querySelector<HTMLDivElement>("#displayHolder");

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
}

createCard();
