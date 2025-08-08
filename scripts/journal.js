const journalSection = document.getElementById("journal-section")

function renderJournal() {
    const storedPages = JSON.parse(localStorage.getItem("passport-pages"))
    if (storedPages.length === 0) {
        console.log("Your journal is empty")
    } else {
        console.log(storedPages)
        const pagesinnerHtml = storedPages.map((page) =>
            `
            <h2>${page.country} </h2>
            <img src="${page.countryFlag}" alt="${page.countryAlt}" />
            <h3>Your ratings</h3>
            <ul> 
                <li>${page.affordabilityRating}/5 for Affordability </li>
                <li>${page.foodRating}/5 for Food </li>
                <li>${page.sightsRating}/5 for the Sights </li>
                <li>${page.enjoymentRating}/5 for Enjoyment </li>
            </ul>

            <h3>Your favourite memories</h3>
            <p>${page.memories}</p>
            `
        ).join('')
        journalSection.innerHTML = pagesinnerHtml
    }

}

renderJournal()