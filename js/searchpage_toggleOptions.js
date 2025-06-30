var options = document.querySelectorAll(".option");

options.forEach((option)=>{
    option.addEventListener("click", (e)=>{
        option.nextElementSibling.classList.toggle("active_filter");
        option.querySelector("a").classList.toggle("active_arrow");
        option.classList.toggle("opened_option");
    })
})

var mobile_options = document.querySelector(".mobile_filter_options").querySelectorAll(".option");

var bottom_filter_options_container = document.querySelector(".bottom_filter_options_container");

mobile_options.forEach((mobile_option)=>{
    mobile_option.addEventListener("click", (e)=>{
        bottom_filter_options_container.classList.toggle("active_bottom_filter_container");
    })
})

var close_filter = document.querySelector(".close_filter");

close_filter.addEventListener("click", (e)=>{
    bottom_filter_options_container.classList.remove("active_bottom_filter_container");
})