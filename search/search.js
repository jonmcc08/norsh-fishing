const btn = document.getElementById("searchBtn");
const searchValue = document.getElementById("search");
const searchParams = new URLSearchParams(window.location.search);

let productList = []
let originalList = []
let removedItems = []

async function apiData(term, string) {

    const productsPage = document.getElementById("products")

    try {

        const response = await fetch("https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/products.json")
        const api = await response.json()

        productsPage.innerHTML = ""

        if (term === 1) {
            productList = searchListing(string.split(" "), api.products)
            if (productList.length == 0) {
                const div = renderError(`No items matched with: ${string}`)
                productsPage.appendChild(div)
                return
            }
            originalList = [...productList]
        } else if (term === 2) {
            // Filter sektionen
            if (string.length > 0) {
                productList = filterSorting(string, originalList)
            } else {
                productList = [...originalList]
                removedItems = []
            }
        } else if (term === 3) {
            // Filter sektionen gällande priser
            if(string === false) {
                removedItems.forEach(item => {
                    productList.push(item)
                })
                removedItems = []
            } else {
                productList = priceSorting(string[0], string[1], productList)
            }
        } else {
            productList = api.products
            originalList = [...productList]
        }

        if(productList.length == 0) {
            const div = renderError("No items matched with the filters")
            productsPage.appendChild(div)
            return
        }


        for (let i = 0; i < productList.length; i++) {
           const div = document.createElement("div")
            div.classList.add("productPage")
            div.id = productList[i].id
            let productimage = "../images/No_Image_Available.jpg"
            if (productList[i].imageLink !== "/images/") {
                productimage = `https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI${productList[i].imageLink}`
            }
            div.innerHTML = `
            <a href="../products/index.html?id=${productList[i].id}">
                <img class="productImage" src="${productimage}">
                <h3 class="productName pLeft">${productList[i].name}</h3>
                <div class="productInfo pLeft">
                    <p class="productDescription"><i class="fa-solid fa-table-list"></i>${productList[i].productDescription}</p>
                    <p class="productPrice">${productList[i].price} kr</p>
                </div>
            </a>
            `
        productsPage.appendChild(div)
    }
    } catch(error) {
        console.error("Error loading homepage products:", error)
        productsPage.innerHTML = "<p>Failed to load products.</p>"
    }
}

function renderError(str) {
    const div = document.createElement("div")
    div.classList.add("failedLoad")
    div.innerHTML = str
    return div
}

function searchPress(e) {
    const isClicked = e.type === "click"
    const isEnterPressed = e.key === "Enter"
    if (isClicked || isEnterPressed) {
        if (searchValue.value != "") {
        searchParams.set("search", searchValue.value)
        } else {
            searchParams.delete("search")
        }
        window.location.search = searchParams.toString();
    }
}

function searchListing(searchTerm, products) {
    let newProducts = []
    searchTerm.forEach(sentance => {
        for(let i = 0; i < products.length; i++) {
            const productName = products[i].name.toLowerCase()
            const productDescription = products[i].productDescription.toLowerCase()
            if(productName.includes(sentance) || productDescription.includes(sentance)) {
                const productExist = newProducts.some(p => p.id === products[i].id)
                if(!productExist) {
                    newProducts.push(products[i])
                }
            }
    }})
    return newProducts
}

function filterSorting(filters, items) {
    const returnData = []
    filters.forEach(filter => {
        if(filters.length > 0) {
            for(let i = 0; i < items.length; i++) {
                const item = items[i]
                if(item.productType == filter) {
                    returnData.push(item)
                }
            }
        } 
    })
    return returnData
}

function priceSorting(min, max, items) {
    const returnData = []
    for(let i = 0; i < items.length; i++) {
        const item = items[i]
        if(min <= item.price && item.price <= max) {
            returnData.push(item)
        } else {
            removedItems.push(item)
        }
    }
    for(let i = removedItems.length - 1; i >= 0; i--) {
        const item = removedItems[i]
        if(min <= item.price && item.price <= max) {
            returnData.push(item)
            removedItems.splice(i, 1)
        }
    }
    return returnData
}

btn.addEventListener("click", searchPress)
searchValue.addEventListener("keydown", searchPress)

if (searchParams.size === 0) {
    apiData(false);
} else {
    const searchTerm = searchParams.get("search")
    searchValue.value = searchTerm

    apiData(1, searchTerm.toLowerCase());
}

