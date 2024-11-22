// Recommended: All functions declared here

function createCityBoxes() {
    for (let city of cities) {
        let cityBox = document.createElement("div");  
        cityBox.classList.add("cityBox");  
        cityBox.textContent = city.name;  
        
        citiesDiv.appendChild(cityBox);
    }
}

// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.querySelector("#cities"); 
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const furthestCity = document.querySelector("#furthest");
const closestCity = document.querySelector("#closest");
const table = document.querySelector("#table");
const tabName = document.head.querySelector("title"); 

// Recommended: Ask for the city name and then the rest of the code

/*
1. User enters city name through prompt.
2. Call getCityByName(userInput):
    - If city is found:
        - Call markCityBox(targetCity, "target")
        - Call getClosestCity(targetCity) and getFurthestCity(targetCity)
        - Call updateBoxDistance(closestCity, furthestCity)
    - Else:
        - Show "City not found" message.
3. Call createDistanceTable() to show all city-to-city distances.
*/

createCityBoxes();