var all_show_more_nav_icon = document.querySelectorAll(".show_more_nav_icon");

// here is where I take off open search bar - also named it differently since it is in another file
const search_Ideas = document.querySelectorAll(".search_ideas");

all_show_more_nav_icon.forEach((show_more_nav_icon, index)=>{
    show_more_nav_icon.addEventListener("click", (e)=>{
        var previously_opened_tab = document.querySelector(".show_display");

        if(index == 0){
            show_more_nav_icon.parentElement.querySelector(".notifications_container").classList.toggle("show_display");
        }else{
            show_more_nav_icon.parentElement.querySelector(".profile_settings_container").classList.toggle("show_display");
        }

        //implementation here
        search_Ideas[0].style.display = "none";

        if(previously_opened_tab !== null){
            previously_opened_tab.classList.remove("show_display");
        }
    });
});