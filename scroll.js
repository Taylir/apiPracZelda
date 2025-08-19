var hero = document.getElementById("heroSection");
var navBar = document.querySelector("nav");
var scrollCheck = window.addEventListener("scroll", function () {
    var height = window.innerHeight;
    var scrollPos = window.scrollY;
    if (scrollPos > height && navBar) {
        navBar.classList.toggle("scrollNav");
    }
});
