async function loadFeaturedProducts() {
    
    const featured = document.getElementById("featured");

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
    
    try {
        const response = await fetch(apiLink + "/products.json");
        const data = await response.json();
        
        const featuredProducts = data.products.slice(0, 3)

        featured.innerHTML = ""

        featuredProducts.forEach(product => {
            let productImage = apiLink + product.imageLink;
            
            if (product.imageLink === "/images/") {
                productImage = "images/No_Image_Available.jpg";
            }

            const div = document.createElement("div");
            div.classList.add("productPage");
            div.id = product.id;

            div.innerHTML = `
                <a href="products/index.html?id=${product.id}">
                    <img class="productImage" src="${productImage}">
                    <h3 class="productName pLeft">${product.name}</h3>
                    <div class="productInfo pLeft">
                        <p class="productDescription"><i class="fa-solid fa-table-list"></i>${product.productDescription}</p>
                        <p class="productPrice">${product.price} kr</p>
                    </div>
                </a>
            `
            featured.appendChild(div)
        })

    } catch (error) {
        console.error("Error loading homepage products:", error)
        featured.innerHTML = "<p>Failed to load featured products.</p>"
    }
}

loadFeaturedProducts()