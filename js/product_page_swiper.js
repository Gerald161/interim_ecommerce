var slider = document.querySelector('.all_images');
var images_container = document.querySelector(".images_container")

// Touch/mouse events
var currentIndex = 0; //selected_index from product page.js
var itemWidth = 45; //current_slider_value from product page.js
var startX = 0;
var currentX = 0;
var isDragging = false;
var startTransform = 0;
var itemsLength = 4 //based on amount of images + videos

images_container.addEventListener("mousedown", (e)=>{handleStart(e)});

document.addEventListener("mousemove", (e)=>{handleMove(e)});

document.addEventListener("mouseup", (e)=>{handleEnd(e)});

images_container.addEventListener("touchstart", (e)=>{handleStart(e)});

document.addEventListener("touchmove", (e)=>{handleMove(e)});

document.addEventListener("touchend", (e)=>{handleEnd(e)});

const handleStart = (e) => {
    isDragging = true;
    startX = getClientX(e);

    startTransform = -(itemWidth * currentIndex);
    
    slider.style.transition = 'all 0s';
}

const handleMove = (e) => {
    if (!isDragging) return;

    currentX = getClientX(e);

    const deltaX = currentX - startX;

    // FIXED: Convert pixels to vw units (since you're using vw in handleEnd)
    const deltaVw = (deltaX / window.innerWidth) * 100;
    
    // FIXED: Calculate new position in vw units
    const newTransform = startTransform + deltaVw;
    
    // Apply the new position using left property
    slider.style.left = `${newTransform}vw`;
}

const handleEnd = (e) => {
    if (!isDragging) return;
                
    isDragging = false;

    slider.style.transition = 'left 0.7s ease';
    
    const deltaX = currentX - startX;

    const threshold = images_container.offsetWidth * 0.2;
    
    if (Math.abs(deltaX) > threshold) {
        if(deltaX > 0 && currentIndex > 0) {
            slider.style.left = `-${itemWidth * (currentIndex - 1)}vw`;
            currentIndex--;
        }else if(deltaX < 0 && currentIndex < itemsLength) {
            slider.style.left = `-${itemWidth * (currentIndex + 1)}vw`;
            currentIndex++; 
        }else{
            slider.style.left = `-${itemWidth * currentIndex}vw`;
        }
    } else {
        slider.style.left = `-${itemWidth * currentIndex}vw`;
    }
}

function getClientX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
}

images_container.addEventListener("dragstart", (e)=>{
    e.preventDefault();
})