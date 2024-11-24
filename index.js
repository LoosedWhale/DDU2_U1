// Recommended: All functions declared here

function createCityBoxes() {
    for (let city of cities) {
        let cityBox = document.createElement("div");  
        cityBox.classList.add("cityBox");  
        cityBox.textContent = city.name;  
        
        citiesDiv.appendChild(cityBox);
    }
}

function findCityById(cityId) {
    for (let city of cities) {
        if (city.id === cityId) {
            return city;
        }
    }
    return null;
}

function getCityByDistance(targetCityObject, findClosest = true) {
    let targetCity = null;
    let targetDistance;
    if (findClosest) {
        targetDistance = Infinity;
    } else {
        targetDistance = 0;
    }

    for (let distance of distances) {
        if ([distance.city1, distance.city2].includes(targetCityObject.id)) {

            let otherCityId;
            if (distance.city1 === targetCityObject.id) {
                otherCityId = distance.city2;
            } else {
                otherCityId = distance.city1;
            }

            if ((findClosest && distance.distance < targetDistance) || (!findClosest && distance.distance > targetDistance)) {
                targetDistance = distance.distance;
                targetCity = findCityById(otherCityId);
            }
        }
    }

    if (targetCity) {
        targetCity.distance = targetDistance;
    }

    return targetCity;
}

function getClosestCity(targetCityObject) {
    return getCityByDistance(targetCityObject, true);
}

function getFurthestCity(targetCityObject) {
    return getCityByDistance(targetCityObject, false);
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