const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const resultSection = document.getElementById("result-section")
const modal = document.getElementById("modal")
const innerModal = document.getElementById("inner-modal")

// An error message that can be reused for error handling
function renderNoResultsMessage() {
    resultSection.innerHTML = `
        <p class="error-message">Sorry, there was an error. Please try again. </p>
  `
}

//Fetch data from api and handle errors
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

//The search button functionality. 
// Preventing default form behaviour, fetching api data, and reseting the search input to be empty.
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    fetchCountryData()
    searchInput.value = ""
})

//Rendering details about about each country for search results using map
function renderCountryDetails(countryData) {
    resultSection.innerHTML = ''

    //Checking if country has previously been added to passport. 
    // And removing countries with undefined fifas, as thats the id I'm using to add them to passport.
    const exisitingPages = localStorage.getItem("passport-pages")
    const passportPages = !exisitingPages ? [] : JSON.parse(exisitingPages)
    const countryDetailsHtml = countryData.filter((country) => country.fifa !== undefined).map((country) => {

        const alreadySaved = passportPages.find((passportPage) => {
            return passportPage.country === country.name.common
        })

        const addToPassportBtn = alreadySaved ? `<a href="./journal.html">View in your journal</a>` : `<button class="add-btn" data-add-button data-add-id="${country.fifa}"> Add to my passport </button>`

        //Language and currency was nested objects with unique keys, so grabbing data this way.
        const language = Object.values(country.languages)[0]
        const { symbol, name } = Object.values(country.currencies)[0]

        //The inner html showing details about the country in search results.
        return `
                <div class="result-item">
                    <div class="img-section">
                        <img src=${country.flags.png} alt=${country.flags.alt} />
                    </div>
                   <div class="detail-section">
                      <h2>${country.name.common}</h1>
                       <h3> Quick Facts:</h2>
                       <ul>
                            <li>The capital is ${country.capital[0]}</li>
                            <li>${country.name.common} is in ${country.region}</li>
                            <li>In ${country.name.common} they speak ${language}</li>
                            <li>${country.name.common} have a population of ${country.population}</li>
                            <li>The currency is ${name} (${symbol})</li>
                        </ul>
                    </div>
                    <div class="btn-section"> 
                        ${addToPassportBtn}
                    </div>
                </div>
            `
    }).join('')

    resultSection.innerHTML = countryDetailsHtml

    //Using data sets for the 'Add to my passport' button, so that the countries data can also be used for the passport page.  
    document.querySelectorAll("[data-add-button]").forEach(button => {
        button.addEventListener("click", () => {
            const countryId = button.dataset.addId
            const country = countryData.find((country) => {
                return countryId === country.fifa
            })
            //passing the country data down to the renderPassport function
            renderPassportModal(country)
        })
    })
}

//Using the country data render the country name. 
// And creating a form for data that can be used to render a passport page.
function renderPassportModal(countryData) {

    innerModal.innerHTML = `
    <button class="close-btn" id="close-btn"><i class="fa-solid fa-circle-xmark"></i> </button>
    <h2> Your passport entry for ${countryData.name.common}</h2>

    <p> From left to right, rate your time from 1 (lowest) to 5 (highest). All fields marked with * are required.</p>
    <form id="journal-form">

    <fieldset class="star-rating"> 
        <legend> Rate Affordability* </legend>

         <input type="radio" id="cost1" name="cost-rating" value="1" required/>
            <label for="cost1"><i class="fa-solid fa-coins"></i> </label>

        <input type="radio" id="cost2" name="cost-rating" value="2" />
            <label for="cost2"><i class="fa-solid fa-coins"></i> </label>

        <input type="radio" id="cost3" name="cost-rating" value="3" />
            <label for="cost3"><i class="fa-solid fa-coins"></i> </label>

        <input type="radio" id="cost4" name="cost-rating" value="4" />
            <label for="cost4"><i class="fa-solid fa-coins"></i> </label>

        <input type="radio" id="cost5" name="cost-rating" value="5" />
            <label for="cost5"><i class="fa-solid fa-coins"></i> </label>
     
    </fieldset>

    <fieldset class="star-rating"> 
        <legend> Rate Food* </legend>

         <input type="radio" id="food1" name="food-rating" value="1" required />
            <label for="food1"> <i class="fa-solid fa-utensils"></i></label>

        <input type="radio" id="food2" name="food-rating" value="2" />
            <label for="food2"> <i class="fa-solid fa-utensils"></i></label>


        <input type="radio" id="food3" name="food-rating" value="3" />
            <label for="food3"> <i class="fa-solid fa-utensils"></i></label>

        <input type="radio" id="food4" name="food-rating" value="4" />
            <label for="food4"><i class="fa-solid fa-utensils"></i> </label>

        <input type="radio" id="food5" name="food-rating" value="5" />
            <label for="food5"><i class="fa-solid fa-utensils"></i> </label>     
    </fieldset>

    <fieldset class="star-rating"> 
        <legend> Rate Sightseeing* </legend>

            <input type="radio" id="sight1" name="sights-rating" value="1" required />
                <label for="sight1"><i class="fa-solid fa-binoculars"></i> </label>

            <input type="radio" id="sight2" name="sights-rating" value="2" />
                <label for="sight2"><i class="fa-solid fa-binoculars"></i></label>

            <input type="radio" id="sight3" name="sights-rating" value="3" />
                <label for="sight3"><i class="fa-solid fa-binoculars"></i> </label>

            <input type="radio" id="sight4" name="sights-rating" value="4" />
                <label for="sight4"><i class="fa-solid fa-binoculars"></i> </label>

            <input type="radio" id="sight5" name="sights-rating" value="5" />
                <label for="sight5"><i class="fa-solid fa-binoculars"></i> </label>
    </fieldset>
    
    <fieldset class="star-rating"> 
        <legend>Enjoyment* </legend>

          <input type="radio" id="joy1" name="joy-rating" value="1" required />
                <label for="joy1"><i class="fa-solid fa-face-smile"></i> </label>

                <input type="radio" id="joy2" name="joy-rating" value="2" />
                <label for="joy2"><i class="fa-solid fa-face-smile"></i> </label>

                <input type="radio" id="joy3" name="joy-rating" value="3" />
                <label for="joy3"><i class="fa-solid fa-face-smile"></i> </label>

                 <input type="radio" id="joy4" name="joy-rating" value="4" />
                <label for="joy4"><i class="fa-solid fa-face-smile"></i> </label>

                <input type="radio" id="joy5" name="joy-rating" value="5" />
                <label for="joy5"><i class="fa-solid fa-face-smile"></i> </label>
    </fieldset>
<div class="form-input">
        <label> Write about your favourite memories from the trip *</label>
        <textarea type="text" name="fav-memories" required> </textarea>
<button class="submit-btn" type="submit">Add entry to my Passport </button>
</div>
    </form>
    `
    modal.style.display = "flex"

    document.getElementById("close-btn").addEventListener("click", () => {
        modal.style.display = 'none'
    })

    //Submitting the form and saving data to a passportData object. 
    // Which is then passed down to saveToPassport, so the data can be saved to localStorage and used for the passport pages. 

    const formElement = document.getElementById("journal-form")
    formElement.addEventListener("submit", (e) => {
        e.preventDefault()

        //Using input names from the form to get submitted data
        const formData = new FormData(formElement)
        const passportData = {
            country: countryData.name.common,
            countryFlag: countryData.flags.png,
            countryAlt: countryData.flags.alt,
            affordabilityRating: formData.get("cost-rating"),
            foodRating: formData.get("food-rating"),
            sightsRating: formData.get("sights-rating"),
            enjoymentRating: formData.get("joy-rating"),
            memories: formData.get("fav-memories")
        }
        saveToPassport(passportData)
        resultSection.innerHTML = ''
    })

    //Adding an event listener to the radio buttons to capture values for the highlightRatings function
    formElement.querySelectorAll("input[type=radio]").forEach((radio) => {
        radio.addEventListener("change", (e) => {
            highlightRatings(e.target)
        })
    })
}

//Adding a class to fill icons that are less than or equal to the max value that user has selected.
function highlightRatings(radioInput) {
    const group = radioInput.name
    const maxValue = radioInput.value
    const siblingInputs = document.querySelectorAll(`input[type=radio][name=${group}]`)

    siblingInputs.forEach((input) => {
        if (input.value <= maxValue) {
            input.classList.add("star-rating-filled")
        } else {
            input.classList.remove("star-rating-filled")
        }
    })
}

//saving Data to localStorage and not overriding the existing data. 
function saveToPassport(passportData) {
    const exisitingPages = localStorage.getItem("passport-pages")
    const passportPages = !exisitingPages ? [] : JSON.parse(exisitingPages)
    passportPages.push(passportData)
    const savedPages = JSON.stringify(passportPages)
    localStorage.setItem("passport-pages", savedPages)

    modal.style.display = 'none'
}
