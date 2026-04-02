const site = window.location.search;
let searchParams = new URLSearchParams(site);
let productId = Number(searchParams.get("id"));

console.log(productId);

async function apiData() {

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
    const response = await fetch(apiLink + "/products.json");
    const api = await response.json();

    const page = document.getElementById("page");
    const product = api.products.find(p => p.id === productId);

    console.log(product);
    const div = document.createElement("div");
    if(!product) {
        div.classList.add("failedLoad");
        div.innerHTML = `
        <h1>Failed to load product</h1>
        `;
    } else {
        let image = apiLink + product.imageLink;
        if(image === apiLink + "/images/") {
            image = "../search/No_Image_Available.jpg";
        };
        console.log(image);
        div.classList.add("productPage");
        div.innerHTML = `
        <div class="left">
            <div class="image">
                <img class="productImage" src="${image}">
            </div>
            <div class="productName">
                <h1>${product.name}</h1>
            </div>
        </div>
        <div class="productInformation">
            <p>${product.productType}</p>
            <p>${product.productDescription}</p>
            <p>${product.price} kr</p>
            <button id="cart"><img class="svgImg" src="../svg/cart-shopping-solid-full.svg"> Add to Cart</button>
        </div>
        `;
    };
    page.appendChild(div);
};
apiData();