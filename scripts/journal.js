const journalSection = document.getElementById("journal-section")

//Using the data saved to localStorage to render the passport page entry
function renderPassport() {
    const storedPages = JSON.parse(localStorage.getItem("passport-pages"))
    if (storedPages === null) {
        journalSection.innerHTML = `<p class="error-message">Your passport is empty. <a href="./index.html">Get started by searching for a country. </a> </p>`
    } else {
        const pagesinnerHtml = storedPages.map((page) => `
    <div class="journal-item">
        <div class="img-section">
            <img src="${page.countryFlag}" alt="${page.countryAlt}" />
        </div>
        <div>  
            <div class="detail-section">
                <h2>${page.country} </h2>
                <h3>Your favourite memories</h3>
                <p>${page.memories}</p>
            </div>
            <div class="rating-section">
                <ul> 
                    <li class="blue-label">${page.affordabilityRating}/5 for Affordability <i class="fa-solid fa-coins"></i></li>
                    <li class="purple-label">${page.foodRating}/5 for Food <i class="fa-solid fa-utensils"></i> </li>
                    <li class="orange-label">${page.sightsRating}/5 for the Sights <i class="fa-solid fa-binoculars"></i> </li>
                    <li class="green-label">${page.enjoymentRating}/5 for Enjoyment <i class="fa-solid fa-face-smile"></i> </li>
                </ul>
            </div>
        </div>
    </div>   
            `
        ).join('')
        journalSection.innerHTML = pagesinnerHtml
    }
}
renderPassport()