const cartAmount = JSON.parse(localStorage.getItem("cart")) || []
const checkout = document.getElementById("checkout")
const containerCheckout = document.getElementById("container")
const box = document.getElementById("checkoutBox")

console.log(cartAmount)

async function apiData() {

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
    const response = await fetch(apiLink + "/products.json");
    const api = await response.json();

    const checkoutData = JSON.parse(localStorage.getItem("cart"))

    const div = document.createElement("div")

    if (checkoutData === null) {
        console.log("No Items.")
        div.innerHTML = `Test`
    } else {
        for (let i = 0; i < checkoutData.length; i++) {
            let productId = checkoutData[i]
            let product = api.products.find(p => p.id === productId)
            
            let productImage = "No_Image_Available.jpg"

            if (product.imageLink !== "/images/") {
                productImage = `https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI${product.imageLink}`;
            }

            div.innerHTML = `
            <div class="checkoutImage">
                <img src="${productImage}" class="checkoutImageSize">
            </div>
            `
        }
    }
    checkout.appendChild(div)
}

containerCheckout.addEventListener("mouseenter", function (e) {
    checkout.classList.remove("hidden")
    box.classList.add("whiteBorder")
    apiData()
    console.log("Not Hidden")
    
})

containerCheckout.addEventListener("mouseleave", function(e) {
    checkout.classList.add("hidden")
    box.classList.remove("whiteBorder")
    console.log("Hidden")
    checkout.innerHTML = ""
})

