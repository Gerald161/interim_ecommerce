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
        
        // Detect mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                         window.innerWidth <= 768 ||
                         ('ontouchstart' in window);
        
        // Choose capture time (be more conservative on mobile)
        const captureTime = isMobile ? 
            Math.min(0.5, video.duration * 0.05) : // Mobile: 0.5s or 5% of duration
            Math.min(1, video.duration * 0.1);     // Desktop: 1s or 10% of duration
        
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
                
                // Restore original time (with delay on mobile)
                if (isMobile) {
                    setTimeout(() => {
                        video.currentTime = originalTime;
                    }, 100);
                } else {
                    video.currentTime = originalTime;
                }
                
                resolve();
            } catch (error) {
                reject(new Error(`Failed to draw image: ${error.message}`));
            }
        };
        
        // If video is already at the desired time (within 0.2s on mobile, 0.1s on desktop), capture immediately
        const tolerance = isMobile ? 0.2 : 0.1;
        if (Math.abs(video.currentTime - captureTime) < tolerance) {
            // Add small delay on mobile to ensure frame is rendered
            const delay = isMobile ? 200 : 0;
            setTimeout(doCapture, delay);
            return;
        }
        
        let timeoutId;
        let hasResolved = false;
        
        // Mobile-specific timeout (longer for mobile devices)
        const timeoutDuration = isMobile ? 8000 : 3000; // 8s for mobile, 3s for desktop
        
        // Function to clean up event listeners and timeout
        const cleanup = () => {
            video.removeEventListener('seeked', onSeeked);
            video.removeEventListener('canplaythrough', onCanPlayThrough);
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
            
            // Longer delay on mobile to ensure frame is ready
            const delay = isMobile ? 300 : 50;
            setTimeout(() => {
                doCapture();
            }, delay);
        };
        
        // Handle when enough data is loaded for smooth playback (better for mobile)
        const onCanPlayThrough = () => {
            if (hasResolved) return;
            hasResolved = true;
            cleanup();
            
            setTimeout(() => {
                doCapture();
            }, isMobile ? 200 : 50);
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
            // Video loaded more data, try capture again with mobile-friendly delay
            setTimeout(() => {
                if (!hasResolved) {
                    hasResolved = true;
                    cleanup();
                    doCapture();
                }
            }, isMobile ? 300 : 100);
        };
        
        // Add event listeners (including canplaythrough for better mobile support)
        video.addEventListener('seeked', onSeeked);
        video.addEventListener('canplaythrough', onCanPlayThrough);
        video.addEventListener('error', onError);
        video.addEventListener('loadeddata', onLoadedData);
        
        // Set timeout for fallback
        timeoutId = setTimeout(() => {
            if (hasResolved) return;
            hasResolved = true;
            cleanup();
            
            // Try to capture at current time as fallback
            try {
                console.warn('Capture timed out, attempting fallback capture at current time');
                doCapture();
            } catch (error) {
                reject(new Error(`Seek operation timed out after ${timeoutDuration}ms and fallback capture failed`));
            }
        }, timeoutDuration);
        
        // Attempt to seek (with mobile-specific handling)
        try {
            if (isMobile) {
                // On mobile, sometimes seeking works better with a small delay
                setTimeout(() => {
                    video.currentTime = captureTime;
                }, 50);
            } else {
                video.currentTime = captureTime;
            }
        } catch (error) {
            if (!hasResolved) {
                hasResolved = true;
                cleanup();
                reject(new Error(`Failed to set video time: ${error.message}`));
            }
        }
    });
}

// Enhanced usage with mobile-aware retry logic
async function captureWithRetry(maxRetries = 3) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     window.innerWidth <= 768 ||
                     ('ontouchstart' in window);
    
    // More retries on mobile due to hardware variability
    const actualMaxRetries = isMobile ? Math.max(maxRetries, 4) : maxRetries;
    
    for (let attempt = 1; attempt <= actualMaxRetries; attempt++) {
        try {
            await capture();
            console.log(`Thumbnail captured successfully on attempt ${attempt}`);
            return;
        } catch (error) {
            console.warn(`Capture attempt ${attempt} failed:`, error.message);
            
            if (attempt === actualMaxRetries) {
                throw new Error(`Failed to capture thumbnail after ${actualMaxRetries} attempts: ${error.message}`);
            }
            
            // Longer wait between retries on mobile
            const baseDelay = isMobile ? 500 : 200;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * baseDelay));
        }
    }
}

// Mobile-optimized video ready check
function waitForVideoReady() {
    return new Promise((resolve, reject) => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                         window.innerWidth <= 768 ||
                         ('ontouchstart' in window);
        
        // On mobile, wait for more comprehensive loading
        const requiredReadyState = isMobile ? 3 : 2; // HAVE_FUTURE_DATA on mobile, HAVE_CURRENT_DATA on desktop
        
        if (video.readyState >= requiredReadyState) {
            resolve();
            return;
        }
        
        const timeout = isMobile ? 10000 : 5000; // 10s timeout on mobile
        let timeoutId;
        
        const cleanup = () => {
            video.removeEventListener('canplay', onCanPlay);
            video.removeEventListener('canplaythrough', onCanPlayThrough);
            video.removeEventListener('error', onError);
            if (timeoutId) clearTimeout(timeoutId);
        };
        
        const onCanPlay = () => {
            if (isMobile && video.readyState < 3) return; // Wait for more data on mobile
            cleanup();
            resolve();
        };
        
        const onCanPlayThrough = () => {
            cleanup();
            resolve();
        };
        
        const onError = () => {
            cleanup();
            reject(new Error('Video failed to load'));
        };
        
        video.addEventListener('canplay', onCanPlay);
        video.addEventListener('canplaythrough', onCanPlayThrough);
        video.addEventListener('error', onError);
        
        // Timeout fallback
        timeoutId = setTimeout(() => {
            cleanup();
            if (video.readyState >= 2) {
                resolve(); // Accept current state if we have some data
            } else {
                reject(new Error('Video loading timed out'));
            }
        }, timeout);
    });
}

// Usage examples:

// Basic usage
capture()
    .then(() => console.log('Thumbnail captured successfully'))
    .catch(error => console.error('Failed to capture thumbnail:', error));

// With retry logic (recommended for mobile)
captureWithRetry()
    .then(() => console.log('Thumbnail captured with retries'))
    .catch(error => console.error('All capture attempts failed:', error));

// Complete mobile-optimized workflow (recommended)
waitForVideoReady()
    .then(() => captureWithRetry())
    .then(() => console.log('Thumbnail captured after ensuring video is ready'))
    .catch(error => console.error('Failed:', error));

// Alternative: Capture at current position (fallback for problematic videos)
function captureCurrentFrame() {
    return new Promise((resolve, reject) => {
        const canvas = document.getElementById("canvas");
        if (!video || !canvas) {
            reject(new Error('Video or canvas element not found'));
            return;
        }
        
        const ctx = canvas.getContext("2d");
        
        try {
            if (canvas.width === 0 || canvas.height === 0) {
                canvas.width = video.videoWidth || 320;
                canvas.height = video.videoHeight || 240;
            }
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve();
        } catch (error) {
            reject(new Error(`Failed to capture current frame: ${error.message}`));
        }
    });
}