var all_show_more_nav_icon = document.querySelectorAll(".show_more_nav_icon");

all_show_more_nav_icon.forEach((show_more_nav_icon, index)=>{
    show_more_nav_icon.addEventListener("click", (e)=>{
        var previously_opened_tab = document.querySelector(".show_display");

        if(index == 0){
            show_more_nav_icon.parentElement.querySelector(".notifications_container").classList.toggle("show_display");
        }else{
            show_more_nav_icon.parentElement.querySelector(".profile_settings_container").classList.toggle("show_display");
        }

        if(previously_opened_tab !== null){
            previously_opened_tab.classList.remove("show_display");
        }
    });
});