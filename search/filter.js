const filter = document.getElementById("filter")
const filterTab = document.getElementById("filters")
const filterContainer = document.getElementById("filterContainer")
let enabled = false

filter.addEventListener("click", function(e) {
    if(!enabled) {
        console.log("Opening")
        filterContainer.classList.remove("filterClosed")
        filterTab.style.width = "300px"
        filter.src = "../svg/x-solid-full.svg"
        enabled = true
    } else {
        console.log("Closing")
        filterTab.style.width = "0px"
        filterContainer.classList.add("filterClosed")
        filter.src = "../svg/bars-solid-full.svg"
        enabled = false
    }
})