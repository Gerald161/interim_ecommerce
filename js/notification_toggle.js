var all_show_more_nav_icon = document.querySelectorAll(".show_more_nav_icon");

all_show_more_nav_icon.forEach((show_more_nav_icon)=>{
    show_more_nav_icon.addEventListener("click", (e)=>{
        var old_one = document.querySelector(".show_display");

        show_more_nav_icon.parentElement.querySelector(".notifications_container").classList.toggle("show_display");

        if(old_one !== null){
            old_one.classList.remove("show_display");
        }
    });
});