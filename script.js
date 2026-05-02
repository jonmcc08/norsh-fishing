const cartAmount = JSON.parse(localStorage.getItem("cart")) || []
const checkout = document.getElementById("checkout")
const containerCheckout = document.getElementById("checkoutContainer")
const box = document.getElementById("checkoutBox")
const page = document.getElementById("content")

const navBar = document.getElementById("links")
console.log(cartAmount)

async function checkoutApiData() {

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
    const response = await fetch(apiLink + "/products.json");
    const api = await response.json();

    const checkoutData = JSON.parse(localStorage.getItem("cart"))
    console.log("Data for checkout: " + checkoutData)

    if (checkoutData === null) {
        const div = document.createElement("div")
        console.log("No Items.")
        div.innerHTML = `Test`
        checkout.appendChild(div)
    } else {
        for (let i = 0; i < checkoutData.length; i++) {
            const div = document.createElement("div")
            div.classList.add("checkoutProduct")
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
            <div class="checkoutDetails">
                <div class="checkoutProduct">
                    <h3>${product.name}</h3>
                </div>
                <div class="checkoutAmount">
                    
                </div>
            </div>
            `
            console.log("Adding current product: " + product.name)
            checkout.appendChild(div)
        }
    }
}

containerCheckout.addEventListener("mouseenter", function (e) {
    checkout.classList.remove("hidden")
    navBar.style.overflow = "visible"
    box.classList.add("whiteBorder")
    checkoutApiData()
    console.log("Not Hidden")
    
})

containerCheckout.addEventListener("mouseleave", function(e) {
    checkout.classList.add("hidden")
    navBar.style.overflow = "hidden"
    box.classList.remove("whiteBorder")
    console.log("Hidden")
    checkout.innerHTML = ""
})

page.addEventListener("wheel", function(e) {
    if (e.deltaY > 0) {
        navBar.style.height = "0px"
    } else if (e.deltaY < 0) {
        navBar.style.height = "43px"
    }
})