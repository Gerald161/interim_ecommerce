const all_categories = document.querySelector("#all_categories");

var categories_chosen = [
	"Clothes", "Bags", "Jewelry", "Shoes", "Embroidery Threads",
	"African Food and Market", "Cars", "Spare Parts", "Electronics",
	"Used Items", "Beads and Bead Designs", "Gold", "Diamonds",
	"Vince Vineyard Charity"
]

categories_chosen.forEach((category)=>{
	all_categories.innerHTML += `
	<option value="">${category}</option>
	`
})

const all_sub_categories = document.querySelector("#all_sub_categories");

var sub_categories_chosen = [
	"Men", "Ladies", "Children", "Babies", "Car Spare Parts",
	"Machine Spare Parts", "Festive", "Designer", "Brand",
]

sub_categories_chosen.forEach((category)=>{
	all_sub_categories.innerHTML += `
	<option value="">${category}</option>
	`
})