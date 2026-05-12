const btn = document.getElementById("searchBtn");
const searchValue = document.getElementById("search");
const searchParams = new URLSearchParams(window.location.search);

let productList = []
let originalList = []

async function apiData(term, string, filterData) {

    const response = await fetch("https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/products.json");
    const api = await response.json();
    const productsPage = document.getElementById("products");


    if (term === 1) {
        productList = searchListing(string.split(" "), api.products)
        console.log(productList)
        if (productList.length == 0) {
            const div = renderError("No items matched with: ")
            productsPage.appendChild(div)
            return
        }
        originalList = productList
    } else if (term === 2) {
        // Filter sectionen
        const temp = filterSorting(string, filterData, productList)
        
    } else {
        productList = api.products
        originalList = productList
    }

    if(productList.length == 0) {
        const div = 
        productsPage.appendChild(div)
        return
    }


    for (let i = 0; i < productList.length; i++) {
        const div = document.createElement("div");
        div.classList.add("productPage");
        div.id = productList[i].id
        let productimage = "../images/No_Image_Available.jpg";
        if (productList[i].imageLink !== "/images/") {
            productimage = `https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI${productList[i].imageLink}`;
        };
        div.innerHTML = `
        <a href="../products/index.html?id=${productList[i].id}">
            <img class="productImage" src="${productimage}">
            <h3 class="productName pLeft">${productList[i].name}</h3>
            <div class="productInfo pLeft">
                <p class="productDescription"><i class="fa-solid fa-table-list"></i>${productList[i].productDescription}</p>
                <p class="productPrice">${productList[i].price} kr</p>
            </div>
        </a>
        `;
        productsPage.appendChild(div);
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

function filterSorting(filter, data, items) {
    if(data) {
        for(let i = 0; i < items.length; i++) {
            const item = items[i]
            console.log(item.productType)
            console.log(filter)
            if(!(item.productType == filter)) {
                console.log("Splicing")
                productList.splice(i, 1)
                console.log(productList)
            }
        }
        console.log()
    } else {
        console.log(filter)
        console.log(items)
    }
}

btn.addEventListener("click", searchPress)
searchValue.addEventListener("keydown", searchPress)

if (searchParams.size === 0) {
    apiData(false);
} else {
    const searchTerm = searchParams.get("search")
    console.log(searchTerm)
    searchValue.value = searchTerm

    apiData(1, searchTerm.toLowerCase());
}