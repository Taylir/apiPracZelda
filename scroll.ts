const hero = document.getElementById("heroSection");
const navBar = document.querySelector("nav");
const filterBar = document.getElementById("filterBar");

const scrollCheck = window.addEventListener("scroll", () => {
  const height = window.innerHeight;
  let scrollPos = window.scrollY;
  if (navBar && filterBar) {
    navBar.classList.toggle("scrollNav", scrollPos > height - 120);
    filterBar.classList.toggle("scrolled", scrollPos > height - 120);
  }
});
