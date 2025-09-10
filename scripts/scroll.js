var hero = document.getElementById("heroSection");
var navBar = document.querySelector("nav");
var filterBar = document.getElementById("filterBar");
var scrollCheck = window.addEventListener("scroll", function () {
    var height = window.innerHeight;
    var scrollPos = window.scrollY;
    if (navBar && filterBar) {
        navBar.classList.toggle("scrollNav", scrollPos > height - 64);
        filterBar.classList.toggle("scrolled", scrollPos > height - 64);
    }
});
