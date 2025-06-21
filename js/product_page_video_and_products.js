var allImages = [1,2,3,7,5];

var product_name = [
"Jade Pendant", "Diamond Earrings", "Jade Pendant", "Sneakers", "Diamond Ring"
]

var prices = [
"45.5","50.0","25.5","30.0","40.5"
]

const featured_products = document.querySelector(".featured_products");

allImages.forEach((image, index)=>{
    featured_products.innerHTML += `
    <a href="#" class="product">
        <div class="image_container">
        <img src="./images/${image}.jpg" loading="lazy" alt="Ginseng">
        </div>

        ${
        index % 2 == 0 ?
        `<i class="fa-regular fa-heart"></i>`:
        `<i class="fa-solid fa-heart" style="color: red;"></i>`
        }

        <h3>${product_name[index]}</h3>

        <p>£${prices[index]}</p>
    </a>
    `
});

const video = document.getElementById('vid');

function capture(){
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

if (video !== null){
    video.currentTime = 1;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}
}

capture();

if (video !== null){
video.currentTime = 0;
}