var slider = document.querySelector('.all_images');

var next = document.querySelector('.next');

var prev = document.querySelector('.prev');

var additional_images = document.querySelectorAll(".additional_image");

var selected_index = 0;

var max_index = 0;

var current_slider_value = 45;

additional_images.forEach((additional_image, index)=>{
    additional_image.addEventListener("click", (e)=>{
        slider.style.left = `-${current_slider_value * index}vw`;

        selected_index = index;

        document.querySelector(".active").classList.remove("active");

        additional_image.classList.add("active");
    })

    max_index = index;
})

next.addEventListener("click", (e)=>{
    slider.style.transition = 'all 0.7s';

    document.querySelector(".active").classList.remove("active");

    slideRight();
})

prev.addEventListener("click", (e)=>{
    slider.style.transition = 'all 0.7s';

    document.querySelector(".active").classList.remove("active");

    if(selected_index == 0){
        selected_index = max_index;

        slider.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});

        slider.style.transition = 'all 0s';

        slider.style.left = `-${current_slider_value * selected_index}vw`;
        
        additional_images[selected_index].classList.add("active");
    }else{
        slider.style.left = `-${current_slider_value * (selected_index - 1)}vw`;

        selected_index--;

        additional_images[selected_index].classList.add("active");
    }
})

function slideRight(){
    if(selected_index == max_index){
        selected_index = 0;

        slider.animate([{opacity:'0.2'},{opacity:"1.0"}],{duration:500,fill:'forwards'});

        slider.style.transition = 'all 0s';

        slider.style.left = `-${current_slider_value * selected_index}vw`;
        
        additional_images[selected_index].classList.add("active");
    }else{
        slider.style.left = `-${current_slider_value * (selected_index + 1)}vw`;

        selected_index++;

        additional_images[selected_index].classList.add("active");
    }
}

window.onresize = checkWindowSize;

function checkWindowSize(){
    selected_index --;
    if(window.innerWidth <= '900'){
        current_slider_value = 100;
        slideRight();
    }else{
        current_slider_value = 45;
        slideRight();
    }
}

if(window.innerWidth <= '900'){
    current_slider_value = 100;
}else{
    current_slider_value = 45;
}