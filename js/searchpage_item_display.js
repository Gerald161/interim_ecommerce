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
    <div class="product">
            <a href="product.html" class="image_container">
                <img src="./images/${image.image}.jpg" loading="lazy" alt="Ginseng">
                ${index % 2 == 0 && `<div class="badge">30% off</div>`}
            </a>

            ${
                index % 2 == 0 ?
                `<i class="fa-regular fa-heart like_button"></i>`:
                `<i class="fa-solid fa-heart like_button" style="color: red;"></i>`
            }

            <div class="product_desc">
                <h3>${image.name}</h3>

                <div class="product_rating">
                    <div class="product_stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <span class="rating_text">(4.8) 2,341 reviews</span>
                </div>

                <div class="discount_section">
                    <div class="price_and_discount">
                        <p>£${image.price}</p>
                        <span class="discount_price">${index % 2 == 0 ? "£"+parseInt(image.price) + 20 : ""}</span>
                    </div>
                    ${index % 2 == 0 ? `<span class="discount">25% OFF</span>` : ""}
                </div>
            </div>
        </div>
    `
});