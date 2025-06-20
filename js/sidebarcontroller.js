var sideBarButton = document.querySelector(".nav_icon");

var closeButton = document.querySelector(".close_button");

var sideBar = document.querySelector(".mobile_screen_sidebar");

var drawerOverlay = document.querySelector(".drawer_overlay");

var changeValue = 30;

sideBarButton.addEventListener("click", (e)=>{
    sideBar.style.left = "0";
    drawerOverlay.style.opacity = 1;
    drawerOverlay.style.pointerEvents = "auto";
});

closeButton.addEventListener("click", (e)=>{
    sideBar.style.left = `-${getChangeValue()}vw`;
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
});


drawerOverlay.addEventListener("click", (e)=>{
    sideBar.style.left = `-${getChangeValue()}vw`;
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
})

function getChangeValue(){
    return window.innerWidth <= 700 ? 75 : 30;
}

window.addEventListener("resize", () => {
    // If sidebar is currently closed, update its position to match new screen size
    if (sideBar.style.left !== "0px" && sideBar.style.left !== "0") {
        const changeValue = getChangeValue();
        sideBar.style.left = `-${changeValue}vw`;
    }
});

// below is for the categories toggle
const categoryButtons = document.querySelectorAll(".category_button");

categoryButtons.forEach((categoryButton)=>{
    categoryButton.addEventListener("click", (e)=>{
        categoryButton.nextElementSibling.classList.toggle("active_category");
        categoryButton.querySelector(".arrow").classList.toggle("active_arrow");
    })
})