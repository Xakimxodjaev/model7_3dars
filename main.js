const form = document.querySelector("form")
const input = form.querySelector("input")
const dataWrapper = document.querySelector("#data")

const url = "https://api.nationalize.io/?name="
let inputValue = ''

input.addEventListener("input", (e) => {
    inputValue = e.target.value
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const getData = async (api, queryValue) => {
        const res = await fetch(api + queryValue)
        const data = await res.json()

        input.value = ''
        inputValue = ''
        
        dataWrapper.innerHTML = ''

        const title = document.createElement("h3")
        title.textContent = "Possible Nationalities:"
        dataWrapper.appendChild(title)

        data.country.slice(0, 5).forEach((c, i) => {
            const p = document.createElement("p")
            const flagUrl = `https://flagsapi.com/${c.country_id}/flat/32.png`
            p.innerHTML = `${i + 1}. <img src="${flagUrl}"> ${c.country_id} - ${(c.probability * 100).toFixed(1)}%`
            dataWrapper.appendChild(p)
        })
    }

    getData(url, inputValue)
})
