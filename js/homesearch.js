const allInputs = document.querySelectorAll("input[type='text']");

const searchIdeas = document.querySelectorAll(".search_ideas");

const searchSuggestions = document.querySelectorAll(".search_suggestions");

const clearSearches = document.querySelectorAll(".clear_search");

const cameraUploads = document.querySelectorAll(".camera_upload");

allInputs.forEach((input, index)=>{
    input.addEventListener("focus", (e)=>{
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
                <a href="subcategories.html" class="category">
                    <div class="representation"></div>
                    <p>${category}</p>
                </a>
            `
        })
    }else{
        all_categories[1].forEach((category)=>{
            category_container.innerHTML += `
                <a href="subcategories.html" class="category">
                    <div class="representation"></div>
                    <p>${category}</p>
                </a>
            `
        })
    }
})