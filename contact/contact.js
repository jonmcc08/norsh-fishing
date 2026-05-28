const forms = document.getElementsByClassName("forumdiv")
const submit = document.getElementById("submitBtn")

const emailTypes = ["@gmail.com", "@skola.taby.se", "@hotmail.com", "@yahoo.com", "@taby.se"]
const phoneNumberTypes = ["+46", "0"]
let phone = false

for (let form of forms) {
    const input = form.querySelector("input")

    if (input.type === "tel") {
        input.addEventListener("input", function(e) {
            let plusPlace = 0
                if (input.value.startsWith("+46")) {
                plusPlace = 2
            }
            if(e.data === null) {
                input.value = ""
                return
            }
            const i = input.value.length
            if (i === (3 + plusPlace) || i === (7 + plusPlace) || i === (10 + plusPlace)) {
                input.value += "-"
                console.log("-")
            }
            if (i === (13 + plusPlace)) {
                phone = true
            } else {
                phone = false
            }
        })
    }
}

submit.addEventListener("click", function () {

    let currentValues = []

    let errorMsg = null

    for (let form of forms) {

        const input = form.querySelector("input")

        let error = false

        if (input.value == "") {
            errorMsg = "Please enter a value at: " + input.placeholder
            error = true
        } else if (input.type === "email") {
            const includesEmail = emailTypes.some(email => input.value.includes(email))
            if (!includesEmail) {
                input.value = ""
                errorMsg = "Please re-enter the email with a correct type of this list: " + emailTypes.join(" | ")
                error = true
            }
        } else if (input.type === "tel") {
            const starsWith = phoneNumberTypes.some(location => input.value.startsWith(location))
            if (!starsWith) {
                errorMsg = "Please re-enter the phone number with the correct type of this list: " + phoneNumberTypes.join("/") + "xx-xxx-xx-xx"
                error = true
            }
            if (!phone) {
                errorMsg = "Please re-enter the phone number with the correct type of this list: " + phoneNumberTypes.join("/") + "xx-xxx-xx-xx"
                error = true
            }
    
        }
        if (!error) {
            currentValues.push({[input.type]: input.value})
        }
    }

    if (errorMsg != null) {
        window.alert(errorMsg)
        return
    } else {
        window.alert("Message has been sent!")
        window.location = ""
    }
})