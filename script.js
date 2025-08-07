const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const resultSection = document.getElementById("result-section")

//fetch data from api and handle errors
const fetchCountryData = async () => {
    let requestUrl = `https://restcountries.com/v3.1/all?fields=name,capital,currencies`

    if (searchInput.value) {
        requestUrl = `https://restcountries.com/v3.1/name/${searchInput.value}`
    }

    try {
        const res = await fetch(requestUrl)
        const data = await res.json()
        renderCountryDetails(data)
    } catch (error) {
        //Error message for console and user
        console.error("Fetch error:", error)
        resultSection.textContent = "Sorry, there was an error. Please try again."
    }
}

//search btn functionality
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetchCountryData()
    searchInput.value = ""
})


//render details about country using map
function renderCountryDetails(countryData) {

    console.log(countryData)
    const countryDetailsHtml = countryData.map((country) =>
        `
    <div class="result-item">
        <div>
            <h2>${country.name.common}</h1>
            <img src=${country.flags.png} alt=${country.flags.alt} />
        </div>
        <div>
            <h3> Quick Facts:</h2>
            <ul>
              <li>The capital is ${country.capital[0]}</li>
            <li>${country.name.common} is in ${country.region}</li>
            <li>In ${country.name.common} they speak ${country.languages}</li>
            <li>${country.name.common} have a population of ${country.population}</li>
            <li>The currency in spain is:</li>
            </ul>
          
        </div>
            <button> I've been here! </button>
            <button> I want to go! </button>
       </div>
    `
    ).join('')

    return resultSection.innerHTML += countryDetailsHtml
}