const forms = document.getElementsByClassName("forumdiv")
const submit = document.getElementById("submitBtn")

const emailTypes = ["@gmail.com", "@skola.taby.se", "@hotmail.com", "@yahoo.com", "@taby.se"]
const phoneNumberTypes = ["+46", "0"]

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
            if (!starsWith && (7 <= input.value.length <= 9)) {
                errorMsg = "Please re-enter the phone number with the correct type of this list: " + phoneNumberTypes.join("xx-xxx-xx-xx")
            }
            error = true
        }
        if (!error) {
            currentValues.push({[input.type]: input.value})
        }
        console.log(currentValues)
    }

    if (errorMsg != null) {
        window.alert(errorMsg)
        return
    }
})
