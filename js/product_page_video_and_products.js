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
        
        if (!video) {
            reject(new Error('Video element not found'));
            return;
        }
        
        if (!canvas) {
            reject(new Error('Canvas element not found'));
            return;
        }
        
        const ctx = canvas.getContext("2d");
        
        // Check if video is loaded and has duration
        if (video.readyState < 2) {
            reject(new Error('Video not loaded enough for capture'));
            return;
        }
        
        if (!video.duration || video.duration === 0) {
            reject(new Error('Video duration not available'));
            return;
        }
        
        // Choose capture time (1 second or 10% of duration, whichever is smaller)
        const captureTime = Math.min(1, video.duration * 0.1);
        
        // Store original time to restore later
        const originalTime = video.currentTime;
        
        // Function to handle the actual capture
        const doCapture = () => {
            try {
                // Ensure canvas dimensions match video or are explicitly set
                if (canvas.width === 0 || canvas.height === 0) {
                    canvas.width = video.videoWidth || 320;
                    canvas.height = video.videoHeight || 240;
                }
                
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Restore original time
                video.currentTime = originalTime;
                resolve();
            } catch (error) {
                reject(new Error(`Failed to draw image: ${error.message}`));
            }
        };
        
        // If video is already at the desired time (within 0.1s), capture immediately
        if (Math.abs(video.currentTime - captureTime) < 0.1) {
            doCapture();
            return;
        }
        
        let timeoutId;
        let hasResolved = false;
        
        // Function to clean up event listeners and timeout
        const cleanup = () => {
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('error', onError);
            video.removeEventListener('loadeddata', onLoadedData);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
        
        // Handle successful seek
        const onSeeked = () => {
            if (hasResolved) return;
            hasResolved = true;
            cleanup();
            
            // Small delay to ensure frame is ready
            setTimeout(() => {
                doCapture();
            }, 50);
        };
        
        // Handle seek/load errors
        const onError = (event) => {
            if (hasResolved) return;
            hasResolved = true;
            cleanup();
            reject(new Error(`Video error during seek: ${event.message || 'Unknown error'}`));
        };
        
        // Handle case where video needs more loading
        const onLoadedData = () => {
            if (hasResolved) return;
            // Video loaded more data, try capture again
            setTimeout(() => {
                if (!hasResolved) {
                    hasResolved = true;
                    cleanup();
                    doCapture();
                }
            }, 100);
        };
        
        // Add event listeners
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('error', onError);
        video.addEventListener('loadeddata', onLoadedData);
        
        // Set timeout for fallback
        timeoutId = setTimeout(() => {
            if (hasResolved) return;
            hasResolved = true;
            cleanup();
            
            // Try to capture at current time as fallback
            try {
                doCapture();
            } catch (error) {
                reject(new Error('Seek operation timed out and fallback capture failed'));
            }
        }, 3000); // Reduced from 5s to 3s
        
        // Attempt to seek
        try {
            video.currentTime = captureTime;
        } catch (error) {
            if (!hasResolved) {
                hasResolved = true;
                cleanup();
                reject(new Error(`Failed to set video time: ${error.message}`));
            }
        }
    });
}

// Enhanced usage with retry logic
async function captureWithRetry(maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await capture();
            console.log(`Thumbnail captured successfully on attempt ${attempt}`);
            return;
        } catch (error) {
            console.warn(`Capture attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Failed to capture thumbnail after ${maxRetries} attempts: ${error.message}`);
            }
            
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 200));
        }
    }
}

// Usage examples:

// Basic usage
capture()
    .then(() => console.log('Thumbnail captured successfully'))
    .catch(error => console.error('Failed to capture thumbnail:', error));

// With retry logic
captureWithRetry()
    .then(() => console.log('Thumbnail captured with retries'))
    .catch(error => console.error('All capture attempts failed:', error));

// Wait for video to be ready before capturing
function waitForVideoReady() {
    return new Promise((resolve, reject) => {
        if (video.readyState >= 2) {
            resolve();
            return;
        }
        
        const onCanPlay = () => {
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('error', onError);
            resolve();
        };
        
        const onError = () => {
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('error', onError);
            reject(new Error('Video failed to load'));
        };
        
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('error', onError);
    });
}

// Usage with video ready check
waitForVideoReady()
    .then(() => captureWithRetry())
    .then(() => console.log('Thumbnail captured after ensuring video is ready'))
    .catch(error => console.error('Failed:', error));