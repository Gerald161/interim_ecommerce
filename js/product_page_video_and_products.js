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

function capture() {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        
        if (!video) {
            reject(new Error('Video element not found'));
            return;
        }
        
        // Store original time to restore later
        const originalTime = video.currentTime;
        
        // Function to handle the actual capture
        const doCapture = () => {
            try {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                // Restore original time
                video.currentTime = originalTime;
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        
        // If video is already at time 1, capture immediately
        if (Math.abs(video.currentTime - 1) < 0.1) {
            doCapture();
            return;
        }
        
        // Listen for the seeked event
        const onSeeked = () => {
            video.removeEventListener('seeked', onSeeked);
            doCapture();
        };
        
        // Add error handling for seek failures
        const onError = () => {
            video.removeEventListener('error', onError);
            video.removeEventListener('seeked', onSeeked);
            reject(new Error('Failed to seek video'));
        };
        
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('error', onError);
        
        // Set the time to 1 second
        video.currentTime = 1;
        
        // Fallback timeout in case seeked event doesn't fire
        setTimeout(() => {
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('error', onError);
            reject(new Error('Seek operation timed out'));
        }, 5000);
    });
}

// Usage with proper error handling
capture()
.then(() => {
    console.log('Thumbnail captured successfully');
})
.catch((error) => {
    console.error('Failed to capture thumbnail:', error);
});