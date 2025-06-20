var sideBarButton = document.querySelector(".nav_icon");

var closeButton = document.querySelector(".close_button");

var sideBar = document.querySelector(".mobile_screen_sidebar");

var drawerOverlay = document.querySelector(".drawer_overlay");

sideBarButton.addEventListener("click", (e)=>{
    sideBar.style.left = "0";
    drawerOverlay.style.opacity = 1;
    drawerOverlay.style.pointerEvents = "auto";
});

closeButton.addEventListener("click", (e)=>{
    sideBar.style.left = "-30vw";
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
});


drawerOverlay.addEventListener("click", (e)=>{
    sideBar.style.left = "-30vw";
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
})

window.onresize = checkWindowSize;

function checkWindowSize(){
    if(window.innerWidth <= '700'){
        console.log("small")
    }else{
        console.log("large")
    }
}

// below is for the categories toggle
const categoryButtons = document.querySelectorAll(".category_button");

categoryButtons.forEach((categoryButton)=>{
    categoryButton.addEventListener("click", (e)=>{
        categoryButton.nextElementSibling.classList.toggle("active_category");
        categoryButton.querySelector(".arrow").classList.toggle("active_arrow");
    })
})