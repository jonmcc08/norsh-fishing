const filter = document.getElementById("filter")
const filterTab = document.getElementById("filters")
const filterContainer = document.getElementById("filterContainer")
const filterBoxes = document.getElementsByClassName("filterItem")
let enabled = false
let currentFilters = []

for (let item in filterBoxes) {
    console.log(filterBoxes[item])
}

// Arbetar
filterTab.addEventListener("click", function(e) {
    const item = e.target
    if(item.tagName === "LABEL") {
        console.log(item.textContent.trim())
        const checkbox = item.querySelector('input[type="checkbox"]');
        console.log(checkbox.checked)
        return
    } else {
        console.log(item.checked)
    }
})


filter.addEventListener("click", function(e) {
    if(!enabled) {
        console.log("Opening")
        filterContainer.classList.remove("filterClosed")
        filterTab.style.width = "360px"
        filter.src = "../svg/x-solid-full.svg"
        enabled = true
    } else {
        console.log("Closing")
        filterTab.style.width = "0px"
        setTimeout(() => {
            filterContainer.classList.add("filterClosed")
        }, 200)
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
    minBarTxt.innerHTML = minBar.value
})

maxBar.addEventListener("input", function() {
    maxBarTxt.innerHTML = maxBar.value
})