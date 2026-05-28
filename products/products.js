const site = window.location.search;
let searchParams = new URLSearchParams(site);
let productId = Number(searchParams.get("id"));


async function apiData() {

    const page = document.getElementById("content");

    try {
        const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
        const response = await fetch(apiLink + "/products.json");
        const api = await response.json();
        const product = api.products.find(p => p.id === productId);

        const div = document.createElement("div");
        if(!product) {
            div.classList.add("failedLoad");
            div.innerHTML = `
            <h1>Failed to load product</h1>
            `;
            page.appendChild(div);
            return;
        } else {
            let image = apiLink + product.imageLink;
            if(image === apiLink + "/images/") {
                image = "../images/No_Image_Available.jpg";
            };
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
                <p class="productType"><img class="svgImg" src="../svg/layer-group-solid-full.svg"> ${product.productType}</p>
                <p class="productDesc">${product.productDescription}</p>
                <p class="price">${product.price} kr</p>
                <button id="cart"><img class="svgImg" src="../svg/cart-shopping-solid-full.svg"> Add to Cart</button>
            </div>
            `;
            page.appendChild(div);
        };

        let btn = document.getElementById("cart")
        btn.addEventListener("click", function (e) {
            let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
            currentCart.push(productId)
            localStorage.setItem("cart", JSON.stringify(currentCart))
        })
    } catch(error) {
        console.error("Error loading homepage products:", error)
        page.innerHTML = "<p>Failed to load products.</p>"
    }
};

apiData();