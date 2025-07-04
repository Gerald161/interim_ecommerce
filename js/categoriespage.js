var categories_container = document.querySelector("#categories_container");

var all_categories = [
    "Clothes", "Bags", "Jewelry", "Shoes", "Embroidery Threads",
    "African Food and Market", "Cars", "Spare Parts", "Electronics",
    "Used Items", "Beads and Bead Designs", "Gold", "Diamonds"
]

all_categories.forEach((category)=>{
    categories_container.innerHTML += `
        <a href="subcategories.html" class="category">
            <div class="representation"></div>
            <p>${category}</p>
        </a>
    `
})