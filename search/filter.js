const filter = document.getElementById("filter")
const filterTab = document.getElementById("filters")
const filterContainer = document.getElementById("filterContainer")
const filterBoxes = document.getElementsByClassName("filterItem")

const costChecked = document.getElementById("costCheck")
const costMax = document.getElementById("costMax")
const costMin = document.getElementById("costMin")

let enabled = false
let currentFilters = []

let costMaxValue = Number(costMax.value)
let costMinValue = Number(costMin.value)

costMax.title = `Select a value equal or over ${Number(costMin.value) + 1}`
costMin.title = `Select a value equal or below ${Number(costMax.value) - 1}`

for (let item of filterBoxes) {
    item.addEventListener("change", function (e) {
        const text = item.textContent.trim().toLowerCase()
        const checked = item.querySelector("input").checked
        if(checked) {
            currentFilters.push(text)
        } else {
            const number = currentFilters.indexOf(text)
            currentFilters.splice(number, 1)
            apiData(3, false)
        }
        apiData(2, currentFilters)
        if (costChecked.checked === true) {
            apiData(3, [costMinValue, costMaxValue])
        } 
    })
}

costMax.addEventListener("change", function (e) {
    if (costMax.value <= costMin.value) {
        costMax.value = costMaxValue
    } else {
        costMaxValue = Number(costMax.value)
        costMin.title = `Select a value equal or below ${Number(costMax.value) - 1}`
        if(costChecked.checked) {
            apiData(3, [costMinValue, costMaxValue])
        }
    }
})

costMin.addEventListener("change", function (e) {
    if (costMin.value >= costMax.value) {
        costMin.value = costMinValue
    } else {
        costMinValue = Number(costMin.value)
        costMax.title = `Select a value equal or over ${Number(costMin.value) + 1}`
        if(costChecked.checked) {
            apiData(3, [costMinValue, costMaxValue])
        }
    }
})


costChecked.addEventListener("change", function (e) {
    const checked = costChecked.checked
    if(checked) {
        apiData(3, [costMinValue, costMaxValue])
    } else {
        apiData(3, false)
        if (currentFilters.length > 0) {
            apiData(2, currentFilters)
        }
    }
})




filter.addEventListener("click", function(e) {
    if(!enabled) {
        filterContainer.classList.remove("filterClosed")
        filterTab.style.width = "360px"
        filter.src = "../svg/x-solid-full.svg"
        enabled = true
    } else {
        filterTab.style.width = "0px"
        setTimeout(() => {
            filterContainer.classList.add("filterClosed")
        }, 200)
        filter.src = "../svg/bars-solid-full.svg"
        enabled = false
    }
})
