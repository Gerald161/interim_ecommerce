var allImages = [
{
    "image": 1,
    "name": "Jade Pendant",
    "price": "45.5"
},
{
    "image":2,
    "name": "Diamond Earrings",
    "price": "50.0"
},
{
    "image": 3,
    "name": "Jade Necklace",
    "price": "25.5"
},
{
    "image": 4,
    "name": "Jade Necklace",
    "price": "25.5"
},
{
    "image": 5,
    "name": "Diamond Ring",
    "price": "45.5"
},
{
    "image": 6,
    "name": "Jeans",
    "price": "50.0"
},
{
    "image": 7,
    "name": "Sneakers",
    "price": "25.5"
},
{
    "image": 8,
    "name": "Gold Necklace",
    "price": "30.0"
},
];

const featured_products = document.querySelector(".featured_products");

allImages.forEach((image, index)=>{
    featured_products.innerHTML += `
    <a href="#" class="product">
        <div class="image_container">
        <img src="./images/${image.image}.jpg" loading="lazy" alt="Ginseng">
        ${index % 2 == 0 && `<div class="badge">30% off</div>`}
        </div>

        <i class="fa-regular fa-heart"></i>

        <h3>${image.name}</h3>

        <div class="price_and_discount">
        <p>£${image.price}</p>
        <span>${index % 2 == 0 ? "£"+parseInt(image.price) + 20 : ""}</span>
        </div>
    </a>
    `
});