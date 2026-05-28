let checkoutData = JSON.parse(localStorage.getItem("cart")) || []
const checkout = document.getElementById("checkout")
const containerCheckout = document.getElementById("checkoutContainer")
const box = document.getElementById("checkoutBox")
const page = document.getElementById("content")

const navBar = document.getElementById("links")

async function checkoutApiData() {

    const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI";
    const response = await fetch(apiLink + "/products.json");
    const api = await response.json();

    console.log("Data for checkout:")
    console.log(checkoutData)

    checkoutData = JSON.parse(localStorage.getItem("cart")) 

    checkout.innerHTML = ""
    
    if (checkoutData === null || checkoutData.length === 0) {
        const div = document.createElement("div")
        console.log("No Items.")
        div.innerHTML = `Test`
        checkout.appendChild(div)
    } else {
        const amountNumbers = checkoutData.reduce((key, id) => {
            key[id] = (key[id] || 0) + 1
            return key
        }, {})
        let fullPrice = 0
        console.log(amountNumbers)
        for (const productId in amountNumbers) {

            const productQuantity = amountNumbers[productId]
            const div = document.createElement("div")
            const product = api.products.find(p => p.id === Number(productId))
            const img = new Image() 
            let productImage = "images/No_Image_Available.jpg"
            img.src = productImage
            
            if(!img.complete) { // Kollar om bilden finns, annars ändrar den till ../ på grund av upplägget
                productImage = "../images/No_Image_Available.jpg"
            }
            const productPrice = (Number(product.price) * Number(productQuantity))
            console.log(productPrice)

            fullPrice += productPrice

            div.classList.add("checkoutProduct")

            if (product.imageLink !== "/images/") {
                productImage = `https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI${product.imageLink}`
            }

            div.innerHTML = `
            <div class="checkoutImage">
                <img src="${productImage}" class="checkoutImageSize">
            </div>
            <div class="checkoutDetails">
                <div>
                    <h3 class="checkoutName">${product.name}</h3>
                    <span>${product.productDescription}</span>
                </div>
                <div class="checkoutAmount">
                    <button class="checkoutBtn minusBtn" btn-id="${productId}">-</button>
                    <span>${productQuantity}</span>
                    <button class="checkoutBtn plusBtn" btn-id="${productId}">+</button>
                </div>
            </div>
            <div class="checkoutPrice">${productPrice} kr</div>
            `
            console.log("Adding current product: " + product.name)
            checkout.appendChild(div)
        }


        const bottomDiv = document.createElement("div")
        bottomDiv.id = "bottomCheckout"
        bottomDiv.innerHTML = `
        <button id="clearCart">Clear cart</button>
        <button>Checkout</button>
        <h3>Total: ${fullPrice} kr</h3>
        `
        checkout.appendChild(bottomDiv)
        cartRendered()
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
})

page.addEventListener("wheel", function(e) {
    if (e.deltaY > 20) {
        navBar.style.height = "0px"
    } else if (e.deltaY < 0) {
        navBar.style.height = "43px"
    }
})

function cartRendered() {
    const clearCartBtn = document.getElementById("clearCart")

    clearCartBtn.addEventListener("click", function(e) {
        localStorage.removeItem("cart")
        cartAmount = []
        checkoutApiData()
    })
}

checkout.addEventListener("click", function (e) {
    const id = e.target.getAttribute("btn-id");
    if(!id) {
        return
    }
    console.log(id)

    if (e.target.classList.contains("plusBtn")) {
        checkoutData.push(Number(id))
        console.log("Added")
    } else if (e.target.classList.contains("minusBtn")) {
        const index = checkoutData.indexOf(Number(id));
        if (index > -1) {
            console.log("Removed")
            checkoutData.splice(index, 1)
        }
    }
    localStorage.setItem("cart", JSON.stringify(checkoutData));
    checkoutApiData()
})