const hero = document.getElementById("heroSection");
const navBar = document.querySelector("nav");

const scrollCheck = window.addEventListener("scroll", () => {
  const height = window.innerHeight;
  let scrollPos = window.scrollY;
  if (scrollPos > height && navBar) {
    navBar.style.backgroundColor = "#aac878";
  }
});
