var extra_image_button = document.querySelector("#extra_image");

var selected_images_container = document.querySelector(".selected_images_container");

var all_extra_images = [];

if(extra_image_button !== null){
	extra_image_button.addEventListener("change", e =>{
		if(extra_image_button.files.length){
			add_extra_image_to_list(extra_image_button.files[0]);
		}
	});
}

function add_extra_image_to_list(file){
	if(file.type.startsWith("image/")){
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			all_extra_images.push(reader.result);

			updateAllExtraImages();
		}
	}
}

function updateAllExtraImages(){
	selected_images_container.innerHTML = ``;

	all_extra_images.forEach((extra_image, index)=>{
		selected_images_container.innerHTML += `
		<div class="selected_image">
          <img src="${extra_image}">
          <i data-index="${index}" class="fa-solid fa-xmark"></i>
        </div>
		` 
	});

	selected_images_container.querySelectorAll("i").forEach((cancel_button)=>{
		cancel_button.addEventListener("click", (e)=>{
			all_extra_images.splice(parseInt(cancel_button.dataset.index), 1);

			updateAllExtraImages();
		});
	});
}

//for video upload
var video_input = document.querySelector("#video_input");

if(video_input !== null){
	var video = document.querySelector("video");

const video_container = document.querySelector(".video_container");

video_input.addEventListener('change', function(){
    const file = this.files[0];

    if(file !== undefined){
        if(file.type.split("/")[1] !== "mp4"){
            video.src = null;
            return;
        }

        if(file.type.startsWith("video/")){
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                video_container.classList.remove("inactive_vid");

                video.src = reader.result;
            }
        }
		}
		else{
			video_container.classList.add("inactive_vid");
			video.src = null;
		}
	})
}