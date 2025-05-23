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