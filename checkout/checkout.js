let checkoutData = JSON.parse(localStorage.getItem("cart")) || []
const checkout = document.getElementById("content")

async function checkoutApiData() {

    try {
        const apiLink = "https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI"
        const response = await fetch(apiLink + "/products.json")
        const api = await response.json()

        checkoutData = JSON.parse(localStorage.getItem("cart")) 

        checkout.innerHTML = ""
        
        if (checkoutData === null || checkoutData.length === 0) {
            const div = document.createElement("div")
            div.classList.add("noItems")
            div.innerHTML = `No item in the cart.`
            checkout.appendChild(div)
        } else {
            const amountNumbers = checkoutData.reduce((key, id) => {
                key[id] = (key[id] || 0) + 1
                return key
            }, {})
            let fullPrice = 0
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
                checkout.appendChild(div)
            }


            const bottomDiv = document.createElement("div")
            bottomDiv.id = "bottomCheckout"
            bottomDiv.innerHTML = `
            <button id="clearCart">Clear cart</button>
            <button onclick="checkoutOpen()">Checkout</button>
            <h3>Total: ${fullPrice} kr</h3>
            `// Checkout knappen ska inte ha någon funktion då det inte ska göras.
            checkout.appendChild(bottomDiv)
            cartRendered()
        }
    } catch(error) {
        console.error("Error loading homepage products:", error)
        checkout.innerHTML = "<p>Failed to load products.</p>"
    }
}

checkoutApiData()

checkout.addEventListener("click", function (e) {
    const id = e.target.getAttribute("btn-id");
    if(!id) {
        return
    }

    if (e.target.classList.contains("plusBtn")) {
        checkoutData.push(Number(id))
    } else if (e.target.classList.contains("minusBtn")) {
        const index = checkoutData.indexOf(Number(id));
        if (index > -1) {
            checkoutData.splice(index, 1)
        }
    }
    localStorage.setItem("cart", JSON.stringify(checkoutData));
    checkoutApiData()
})