const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const resultSection = document.getElementById("result-section")


function renderNoResultsMessage() {
    resultSection.innerHTML = `
        <p>Sorry, there was an error. Please try again. </p>
  `
}


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
        renderNoResultsMessage()
    }
}

//search btn functionality
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetchCountryData()
    searchInput.value = ""
})


//render details about about each country for search using map
function renderCountryDetails(countryData) {
    resultSection.innerHTML = ''
    const countryDetailsHtml = countryData.map((country) => {

        //language and currency was nested objects with unique keys, so grabbing data this way
        const language = Object.values(country.languages)[0]
        const { symbol, name } = Object.values(country.currencies)[0]

        return `
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
                        <li>In ${country.name.common} they speak ${language}</li>
                        <li>${country.name.common} have a population of ${country.population}</li>
                        <li>The currency in spain is: ${name} ${symbol}</li>
                        </ul>
                    </div>
                        <button> I've been here! </button>
                        <button> I want to go! </button>
                </div>
            `
    }).join('')

    return resultSection.innerHTML = countryDetailsHtml
}


//get saved countries for wishlist

//save to wishlist

//save to journal 