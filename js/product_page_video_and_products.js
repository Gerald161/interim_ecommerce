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
    <div class="product">
        <a href="product.html" class="image_container">
            <img src="./images/${image}.jpg" loading="lazy" alt="Ginseng">
            ${index % 2 == 0 && `<div class="badge">NEW</div>`}
        </a>

        ${
        index % 2 == 0 ?
        `<i class="fa-regular fa-heart like_button"></i>`:
        `<i class="fa-solid fa-heart like_button" style="color: red;"></i>`
        }

        <div class="product_desc">
            <h3>${product_name[index]}</h3>

            <div class="discount_section">
                <div class="price_and_discount">
                    <p>£${prices[index]}</p>
                    <span class="discount_price">${index % 2 == 0 ? "£"+parseInt(prices[index]) + 20 : ""}</span>
                </div>
                ${index % 2 == 0 ? `<span class="discount">25% OFF</span>` : ""}
            </div>
        </div>
    </div>
    `
});

const video = document.getElementById('vid');
const canvas = document.getElementById('canvas');

function capture() {
    return new Promise((resolve, reject) => {
        if (!video || !canvas) {
            reject(new Error('Video or canvas element not found'));
            return;
        }

        // Wait for video to be ready
        if (video.readyState < 2) {
            video.addEventListener('loadeddata', () => capture().then(resolve).catch(reject), { once: true });
            return;
        }

        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match video
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 240;
        
        // Draw current frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve();
    });
}

// Simple usage
capture()
    .then(() => console.log('Thumbnail captured'))
    .catch(error => console.error('Capture failed:', error));