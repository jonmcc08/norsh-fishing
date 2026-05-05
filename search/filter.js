const filter = document.getElementById("filter")
const filterTab = document.getElementById("filters")
const filterContainer = document.getElementById("filterContainer")
let enabled = false

filter.addEventListener("click", function(e) {
    if(!enabled) {
        console.log("Opening")
        filterContainer.classList.remove("filterClosed")
        filterTab.style.width = "350px"
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

// Test för slider
const minBar = document.getElementById("barMin")
const maxBar = document.getElementById("barMax")
const minBarTxt = document.getElementById("barMinTxt")
const maxBarTxt = document.getElementById("barMaxTxt")

minBar.addEventListener("input", function() {
    console.log("Test")
    minBarTxt.href = `${minBar.value}`
})