var sideBarButton = document.querySelector(".nav_icon");

var closeButton = document.querySelector(".close_button");

var sideBar = document.querySelector(".mobile_screen_sidebar");

var drawerOverlay = document.querySelector(".drawer_overlay");

var changeValue = 30;

sideBarButton.addEventListener("click", (e)=>{
    // the opened class below is just to check window size no css attached
    sideBar.classList.toggle("opened");
    sideBar.style.left = "0";
    drawerOverlay.style.opacity = 1;
    drawerOverlay.style.pointerEvents = "auto";
});

closeButton.addEventListener("click", (e)=>{
    sideBar.style.left = `-${changeValue}vw`;
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
});


drawerOverlay.addEventListener("click", (e)=>{
    sideBar.style.left = `-${changeValue}vw`;
    drawerOverlay.style.opacity = 0;
    drawerOverlay.style.pointerEvents = "none";
})

window.onresize = checkWindowSize;

function checkWindowSize(){
    if(window.innerWidth <= '700'){
        changeValue = 75;
    }else{
        changeValue = 30;
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