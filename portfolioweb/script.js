let menubutton = document.querySelector("#MenuIcon");
let styleSideBar = document.querySelector(".Sidebar");
let crossicon = document.querySelector("#crossIcon");
menubutton.addEventListener("click", (e) => {
  styleSideBar.style.display = "flex";
  e.preventDefault();
});
crossicon.addEventListener("click", (e) => {
  styleSideBar.style.display = "none";
  e.preventDefault();
});
