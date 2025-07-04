const allInputs = document.querySelectorAll("input[type='text']");

const searchIdeas = document.querySelectorAll(".search_ideas");

const searchSuggestions = document.querySelectorAll(".search_suggestions");

const clearSearches = document.querySelectorAll(".clear_search");

const cameraUploads = document.querySelectorAll(".camera_upload");

// Closing containers here
var notifications_container = document.querySelector(".notifications_container");

var profile_settings_container = document.querySelector(".profile_settings_container");

allInputs.forEach((input, index)=>{
    input.addEventListener("focus", (e)=>{
        // here is where I actually close it
        notifications_container.classList.remove("show_display");
        profile_settings_container.classList.remove("show_display")
        // it ends here

        cameraUploads[index].style.display = "none";
        clearSearches[index].style.display = "block";

        if(input.value.trim() == ""){
            searchIdeas[index].style.display = "flex";
        }else{
            searchSuggestions[index].style.display = "flex";
        }
    })

    input.addEventListener("keyup", (e)=>{
        if(e.key == "Escape"){
            searchSuggestions[index].style.display = "none";
            searchIdeas[index].style.display = "none";
        }else if(e.target.value.trim() !== ""){
            searchIdeas[index].style.display = "none";
            cameraUploads[index].style.display = "none";
            clearSearches[index].style.display = "block";
            
            // typing here
            var filtered_suggestions = temp_searchSuggestions.filter((word)=> word.toLowerCase().startsWith(e.target.value.toLowerCase().trimStart()));

            searchSuggestions[index].innerHTML = ``

            filtered_suggestions.forEach((word)=>{
                searchSuggestions[index].innerHTML += `
                    <a href="search.html">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <p>${word}</p>
                    </a>
                `
            })

            searchSuggestions[index].style.display = "flex";
        }else{
            searchIdeas[index].style.display = "flex";
            cameraUploads[index].style.display = "none";
            clearSearches[index].style.display = "block";
            searchSuggestions[index].style.display = "none";
        }
    })

    input.addEventListener("keydown", (e)=>{
        if(e.key == "Escape"){
            searchSuggestions[index].style.display = "none";
            searchIdeas[index].style.display = "none";
        }
    })

    // the undefined check is for the products pageXOffset, not sure what is going on there and I am too lazy to debug
    if(clearSearches[index] !== undefined){
        clearSearches[index].addEventListener("click", (e)=>{
            allInputs[0].value = ``;
            allInputs[1].value = ``;

            searchIdeas[0].style.display = "none";
            cameraUploads[0].style.display = "block";
            clearSearches[0].style.display = "none";
            searchSuggestions[0].style.display = "none";

            searchIdeas[1].style.display = "none";
            cameraUploads[1].style.display = "block";
            clearSearches[1].style.display = "none";
            searchSuggestions[1].style.display = "none";
        })
    }
})

// below is for the second search bar
var show_search_form_button = document.querySelector(".show_search_form_button");

var second_header_form = document.querySelector("header").querySelector(".second_form");

show_search_form_button.addEventListener("click", (e)=>{
    e.preventDefault();
    second_header_form.classList.toggle("show_header");
});

var categories_containers = document.querySelectorAll(".categories_container");

var all_categories = [
    ["Clothes", "Bags", "Jewelry"], ["Shoes",
    "Cars", "Spare Parts", "Electronics",
    "Used Items", "Beads and Bead Designs", "Gold", "Diamonds"]
]

categories_containers.forEach((category_container, index)=>{
    if(index % 2 == 0){
        all_categories[0].forEach((category)=>{
            category_container.innerHTML += `
                <a href="search.html" class="category">
                    <div class="representation"></div>
                    <p>${category}</p>
                </a>
            `
        })
    }else{
        all_categories[1].forEach((category)=>{
            category_container.innerHTML += `
                <a href="search.html" class="category">
                    <div class="representation"></div>
                    <p>${category}</p>
                </a>
            `
        })
    }
})

// Below is an array to work with
const temp_searchSuggestions = [
  // A
  "Apple iPhone 15",
  "AirPods Pro",
  "Adventure Backpack",
  "Artificial Plants",
  "Acrylic Nail Kit",
  "Android Tablet",
  "Aloe Vera Gel",
  "Air Fryer",
  "Action Camera",
  "Adjustable Dumbbells",

  // B
  "Bluetooth Speaker",
  "Baby Stroller",
  "Board Games",
  "Bike Helmet",
  "Bean Bag Chair",
  "Bathroom Organizer",
  "Blender",
  "Body Lotion",
  "Bed Sheets",
  "Bookshelf",

  // C
  "Camping Tent",
  "Camera Tripod",
  "Car Seat Cover",
  "Coffee Maker",
  "Ceiling Fan",
  "Cutting Board",
  "Cookware Set",
  "Charging Cable",
  "Cotton Towels",
  "Clothing Rack",

  // D
  "Desk Lamp",
  "Digital Watch",
  "Dog Leash",
  "Drone with Camera",
  "Dish Rack",
  "Duvet Cover",
  "Dumbbell Set",
  "Dry Erase Board",
  "Desk Organizer",

  // E
  "Electric Kettle",
  "Earbuds",
  "E-Reader",
  "Exercise Bike",
  "Electric Toothbrush",
  "Eyeliner Pen",
  "Extension Cord",
  "Espresso Machine",
  "Electric Heater",

  // F
  "Fitness Tracker",
  "Fashion Dresses",
  "Floor Lamp",
  "Furniture Covers",
  "Frying Pan",
  "Facial Steamer",
  "Folding Chair",
  "Food Processor",
  "Foot Massager",

  // G
  "Gaming Laptop",
  "Graphic Tablets",
  "Garden Tools",
  "Gourmet Coffee",
  "Glass Water Bottle",
  "Grill Pan",
  "Gaming Mouse",
  "Gold Necklace",
  "Grocery Storage Containers",

  // H
  "Hair Dryer",
  "Home Security Camera",
  "Hiking Boots",
  "Hydro Flask",
  "Hand Blender",
  "Hammock Chair",
  "Heated Blanket",
  "HD Projector",
  "Hair Clipper",

  // I
  "Indoor Plants",
  "Instant Pot",
  "iPad Case",
  "Insulated Water Bottle",
  "Ice Cube Tray",
  "Ink Cartridge",
  "Inflatable Mattress",
  "Ironing Board",

  // J
  "Jewelry Sets",
  "Jogging Stroller",
  "Juicer Machine",
  "Journal Notebook",
  "Jeans for Women",
  "Jigsaw Puzzle",
  "Jacket for Men",
  "Jump Rope",

  // K
  "Kitchen Knife Set",
  "Kids' Puzzle",
  "Kettlebell",
  "Key Organizer",
  "Kids' Tablet",
  "Kitchen Towels",
  "Karaoke Microphone",
  "Korean Skincare Set",

  // L
  "LED TV",
  "Laptop Stand",
  "Leather Wallet",
  "Luggage Set",
  "Lunch Box",
  "LED Strip Lights",
  "Laptop Backpack",
  "Linen Curtains",
  "Laundry Basket",

  // M
  "Men's Sneakers",
  "Milk Frother",
  "Massage Gun",
  "Mobile Phone Case",
  "Microwave Oven",
  "Makeup Brushes",
  "Memory Foam Pillow",
  "Monitor Arm",
  "Men's Watch",
  "Mouse Pad",

  // N
  "Noise-Cancelling Headphones",
  "Notebook Computer",
  "Nail Art Kit",
  "Nutrition Supplements",
  "Neck Massager",
  "Night Light",
  "Nursing Pillow",
  "Nylon Rope",

  // O
  "Outdoor Grill",
  "Office Chair",
  "Oil Diffuser",
  "Oscillating Fan",
  "Oven Mitts",
  "Over-Ear Headphones",
  "Organizer Box",
  "Outdoor Lights",

  // P
  "Pet Food",
  "Portable Charger",
  "Phone Screen Protector",
  "Projector",
  "Power Strip",
  "Pressure Cooker",
  "Photo Frame",
  "Plastic Storage Bins",
  "Pasta Maker",

  // Q
  "QR Code Reader",
  "Quilted Jacket",
  "Quiet Keyboard",
  "Quick-Dry Towel",
  "Quartz Watch",
  "Queen Size Bed",
  "Quilling Kit",

  // R
  "Running Shoes",
  "Rice Cooker",
  "Robot Vacuum",
  "Reusable Water Bottle",
  "Reading Lamp",
  "Rug for Living Room",
  "Resistance Bands",
  "Raincoat",
  "Rolling Suitcase",

  // S
  "Smart Watch",
  "SSD Hard Drive",
  "Scented Candles",
  "Solar Power Bank",
  "Sneakers for Women",
  "Shower Curtain",
  "Standing Desk",
  "Storage Drawers",
  "Suitcase Set",
  "Soundbar",

  // T
  "Tablet Case",
  "Thermal Socks",
  "TV Stand",
  "Travel Adapter",
  "Toaster Oven",
  "Tool Kit",
  "Treadmill",
  "Tea Kettle",
  "Tripod Stand",
  "Tote Bag",

  // U
  "Umbrella",
  "USB-C Hub",
  "Ultralight Backpack",
  "Underdesk Treadmill",
  "Upholstery Cleaner",
  "UV Phone Sanitizer",
  "USB Flash Drive",

  // V
  "Vacuum Cleaner",
  "VR Headset",
  "Video Doorbell",
  "Vinyl Records",
  "Vitamin C Serum",
  "Vegetable Chopper",
  "Vanity Mirror",
  "Vegan Snacks",

  // W
  "Wireless Charger",
  "Waterproof Jacket",
  "Waffle Maker",
  "Wristband Tracker",
  "Wall Clock",
  "Whiteboard",
  "Wine Glass Set",
  "Window Curtains",
  "Wireless Mouse",
  "Work Boots",

  // X
  "Xbox Controller",
  "Xiaomi Smartphone",
  "XPS Laptop",
  "Xylophone Toy",
  "X-Men Action Figure",
  "X-Banner Stand",
  "Xtreme Bluetooth Speaker",

  // Y
  "Yoga Mat",
  "Yeti Cooler",
  "Youth Backpack",
  "Yarn Knitting Kit",
  "Yellow Sunglasses",
  "Yoga Pants",
  "Yogurt Maker",

  // Z
  "Zipper Hoodie",
  "Zero-Waste Starter Kit",
  "Zebra Print Rug",
  "Zip-Top Storage Bags",
  "Zinc Supplement",
  "Zoodle Maker",
  "Zoom Lens"
];