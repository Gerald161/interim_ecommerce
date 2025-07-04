var allImages = [
    [
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
    {
        "image":2,
        "name": "Diamond Earrings",
        "price": "50.0"
    },
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
        "name": "Kente",
        "price": "30.0"
    },
    {
        "image": 7,
        "name": "Sneakers",
        "price": "25.5"
    },
    ],
    [
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
        "name": "Kente",
        "price": "30.0"
    },
    {
        "image": 7,
        "name": "Sneakers",
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
    {
        "image":2,
        "name": "Diamond Earrings",
        "price": "50.0"
    },
    ],
];

const featured_products = document.querySelectorAll(".featured_products");

featured_products.forEach((featured_product, index)=>{
    allImages[index].forEach((image, index2)=>{
        featured_product.innerHTML += `
        <div class="product">
            <a href="product.html" class="image_container">
                <img src="./images/${image.image}.jpg" loading="lazy" alt="Ginseng">
                ${index2 % 2 == 0 && `<div class="badge">30% off</div>`}
            </a>

            ${
                index2 % 2 == 0 ?
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
                        <span class="discount_price">${index2 % 2 == 0 ? "£"+parseInt(image.price) + 20 : ""}</span>
                    </div>
                    ${index2 % 2 == 0 ? `<span class="discount">25% OFF</span>` : ""}
                </div>

                <div class="add_container">
                    <p>${index2 % 2 == 0 ? "Added to cart": "Add to cart"}</p>
                    ${index2 % 2 == 0 ? 
                    `<i class="fa-solid fa-check add_cart_button success_added"></i>` 
                    : 
                    `<i class="fa-solid fa-plus add_cart_button"></i>`
                    }
                </div>
            </div>
        </div>
        `
    });
});