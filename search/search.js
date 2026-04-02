async function apiData() {

    const response = await fetch("https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/products.json");
    const api = await response.json();
    console.log(api);

    const products = document.getElementById("products");

    for (let i = 0; i < api.products.length; i++) {
        const div = document.createElement("div");
        div.classList.add("productPage");
        div.id = api.products[i].id;
        let productimage = "No_Image_Available.jpg";
        if (api.products[i].imageLink !== "/images/") {
            productimage = `https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI${api.products[i].imageLink}`;
        };
        div.innerHTML = `
        <a href="../products/index.html?id=${api.products[i].id}">
            <img class="productImage" src="${productimage}">
            <h3 class="productName pLeft">${api.products[i].name}</h3>
            <div class="productInfo pLeft">
                <p class="productDescription"><i class="fa-solid fa-table-list"></i>${api.products[i].productDescription}</p>
                <p class="productPrice">${api.products[i].price} kr</p>
            </div>
        </a>
        `; // FUNGERAR
        products.appendChild(div);
    }
}

apiData(); // W.I.P (Testar att anropa "API"n)

// FIXA SÅ ATT DEN OCKSÅ ANVÄNDER BILDER FRÅN GITHUB PAGEN OCH ÄVEN FIXA MED CSS DECORATION FÖR PRODUCTERNA

const btn = document.getElementById("searchBtn");
const searchValue = document.getElementById("search");

btn.addEventListener("click", function (e) {
    if (searchValue.value != "") {
        window.location.href = `?search=${searchValue.value}`
    } else {
        window.location.href = ""
    }
})