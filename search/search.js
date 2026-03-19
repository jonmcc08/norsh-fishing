async function apiData() {

    const response = await fetch("https://raw.githubusercontent.com/jonmcc08/jonmcc08.github.io/main/fishingAPI/products.json");
    const api = await response.json();
    console.log(api);

    let products = document.getElementById("products");

    for (let i = 0; i < api.products.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = `
        ${api.products[i].name} <br>
        ${api.products[i].price} <br>
        ${api.products[i].productDescription}
        ` // FUNGERAR
        products.appendChild(div)
    }
}

apiData(); // W.I.P (Testar att anropa "API"n)

// FIXA SÅ ATT DEN OCKSÅ ANVÄNDER BILDER FRÅN GITHUB PAGEN OCH ÄVEN FIXA MED CSS DECORATION FÖR PRODUCTERNA