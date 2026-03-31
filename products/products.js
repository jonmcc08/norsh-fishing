const site = window.location.search;
let searchParams = new URLSearchParams(site);
let productId = Number(searchParams.get("id"));

console.log(productId)

async function apiData() {

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/"
    const response = await fetch(apiLink + "products.json");
    const api = await response.json();

    const page = document.getElementById("page") 
    const product = api.products.find(p => p.id === productId)

    console.log(product)
    const div = document.createElement("div");
    div.classList.add("productInfo")
    if(!product) {
        div.innerHTML = `
        <h1>Failed to load product</h1>
        `
    } else {
        div.innerHTML = `
        <h1>${product.name}</h1>
        <h2>${product.price}</h2>
        `
    };
    page.appendChild(div);

}
apiData();