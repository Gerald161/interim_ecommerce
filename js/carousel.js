var slider_controller_buttons = document.querySelector(".slider_controller").querySelectorAll("a");

var welcome_container = document.querySelector(".welcome_container");

var currentLeftValue = 0;

var play_button = document.querySelector(".play");

var pause_button = document.querySelector(".pause");

function moveForward(controller_button=null){
    if(controller_button != null){
        controller_button.style.pointerEvents = 'none';
    }
    const clone = welcome_container.firstElementChild.cloneNode(true);

    welcome_container.style.transition = "all 1s";

    currentLeftValue -= 100;

    welcome_container.style.left = `${currentLeftValue}%`;

    setTimeout(()=>{
        currentLeftValue += 100;

        welcome_container.style.transition = "all 0s";

        welcome_container.style.left = `${currentLeftValue}%`;

        welcome_container.appendChild(clone);

        welcome_container.removeChild(welcome_container.firstElementChild);

        if(controller_button != null){
            controller_button.style.pointerEvents = 'auto';
        }
    },[1000]);

    play_button.classList.add("hide_icon");

    pause_button.classList.remove("hide_icon");
}

function moveBackward(controller_button=null){
    if(controller_button != null){
        controller_button.style.pointerEvents = 'none';
    }
    const clone = welcome_container.lastElementChild.cloneNode(true);

    welcome_container.insertBefore(clone, welcome_container.firstElementChild);

    welcome_container.removeChild(welcome_container.lastElementChild);

    currentLeftValue += 100;

    welcome_container.style.transition = "all 0s";

    welcome_container.style.left = `-${currentLeftValue}%`;

    setTimeout(()=>{
        welcome_container.style.transition = "all 1s";

        currentLeftValue -= 100;

        welcome_container.style.left = `${currentLeftValue}%`;
    },[10]);


    setTimeout(()=>{
        if(controller_button != null){
            controller_button.style.pointerEvents = 'auto';
        }
    },[1000]);

    play_button.classList.add("hide_icon");

    pause_button.classList.remove("hide_icon");
}

var carousel_function;

carousel_function = setInterval(()=>{
    moveForward();
}, [5000]);

slider_controller_buttons.forEach((controller_button)=>{
    controller_button.addEventListener("click", (e)=>{
        e.preventDefault();

        switch(controller_button.classList[0]){
            case "backward":
                clearInterval(carousel_function);
                moveBackward(controller_button);
                carousel_function = setInterval(()=>{
                    moveForward();
                }, [5000]);
                break;
            case "pause":
                controller_button.classList.toggle("hide_icon");
                controller_button.nextElementSibling.classList.toggle("hide_icon");
                clearInterval(carousel_function);
                break;
            case "play":
                controller_button.previousElementSibling.classList.toggle("hide_icon");
                controller_button.classList.toggle("hide_icon");
                carousel_function = setInterval(()=>{
                    moveForward();
                }, [5000]);
                break;
            case "forward":
                clearInterval(carousel_function);
                moveForward(controller_button);
                carousel_function = setInterval(()=>{
                    moveForward();
                }, [5000]);
                break;
        }
    })
});