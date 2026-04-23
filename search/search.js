const btn = document.getElementById("searchBtn");
const searchValue = document.getElementById("search");
const searchParams = new URLSearchParams(window.location.search);

async function apiData(search, searchTerm) {

    const response = await fetch("https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/products.json");
    const api = await response.json();
    console.log(api);

    const productsPage = document.getElementById("products");
    
    let productList = api.products

    if (search) {
        productList = searchListing(searchTerm.split(" "), productList)
    }

    for (let i = 0; i < productList.length; i++) {
        const div = document.createElement("div");
        div.classList.add("productPage");
        div.id = productList[i].id
        let productimage = "../No_Image_Available.jpg";
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
        `; // FUNGERAR
        productsPage.appendChild(div);
    }
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
    console.log("Works.")
}

function searchListing(searchTerm, products) {
    // Testing
    console.log(products)
    console.log(searchTerm)

    let newProducts = []

    searchTerm.forEach(sentance => {
        console.log("Current checking: " + sentance)
        for(let i = 0; i < products.length; i++) {
            const productName = products[i].name.toLowerCase()
            console.log("Does it contain: " + productName)
            if(productName.includes(sentance)) {
                newProducts.push(products[i])
            }
    }})

    return newProducts
}

btn.addEventListener("click", searchPress)
searchValue.addEventListener("keydown", searchPress)


if (searchParams.size === 0) {
    apiData();
} else {
    const searchTerm = searchParams.get("search")
    console.log(searchTerm)
    searchValue.value = searchTerm

    apiData(true, searchTerm.toLowerCase());
}
 // W.I.P (Testar att anropa "API"n)