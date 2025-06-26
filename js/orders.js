document.querySelectorAll("tbody tr").forEach((row)=>{
    row.addEventListener("click", function () {
        const url = this.getAttribute("data-href");
        if (url) {
            window.location.href = url;
        }
    });
})