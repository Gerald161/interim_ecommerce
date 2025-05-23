const actualColors = document.querySelectorAll(".actual_color");

actualColors.forEach((actual_color)=>{
    actual_color.addEventListener("click", (e)=>{
        if(actual_color.children[0].style.display == "none" || actual_color.children[0].style.display == ""){
            actual_color.children[0].style.display = "flex";
        }else{
            actual_color.children[0].style.display = "none";
        }
    })
})