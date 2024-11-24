// Recommended: All functions declared here

function createCityBoxes() {
    for (let city of cities) {
        let cityBox = document.createElement("div");  
        cityBox.classList.add("cityBox");  
        cityBox.textContent = city.name;  
        
        citiesDiv.appendChild(cityBox);
    }
}

function markCityBox(cityObject, typeOfCity) {
    const cityBoxes = document.querySelectorAll(".cityBox");
    let cityBox = null;
    for (let box of cityBoxes) {
        if (box.textContent === cityObject.name) {
            cityBox = box;
            break;
        }
    }

    if (cityBox) {
        if (typeOfCity === "target") {
            cityBox.classList.add(typeOfCity); 
        } else {
            let cityId;
            if (typeOfCity === "closest") {
                cityId = closestCity.id;
            } else {
                cityId = furthestCity.id;
            }
            cityBox.classList.add(cityId); 
        }
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

function getCityByName(cityName) {
    for (let city of cities) {
        if (city.name.toLowerCase() === cityName.toLowerCase()) {
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

function updateBoxDistance(furthestCity, closestCity) {
    const closestBox = document.querySelector(".closest");
    const furthestBox = document.querySelector(".furthest");

    if (closestBox) {
        closestBox.textContent += ` is ${closestCity.distance / 10} miles away`;
    }

    if (furthestBox) {
        furthestBox.textContent += ` is ${furthestCity.distance / 10} miles away`;
    }

    const closesth3 = document.querySelector("#closest");
    const furthestsh3 = document.querySelector("#furthest");

    if (closesth3) {
        closesth3.textContent = closestCity.name;
    }

    if (furthestsh3) {
        furthestsh3.textContent = furthestCity.name;
    }
}



// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.querySelector("#cities"); 
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.querySelector("#closest");
const furthestCity = document.querySelector("#furthest");
const tabName = document.head.querySelector("title"); 

// Recommended: Ask for the city name and then the rest of the code


createCityBoxes();

const userInput = prompt("Enter the name of a city:");
const targetCityObject = getCityByName(userInput);

if (targetCityObject !== null) {
    markCityBox(targetCityObject, "target");

    const closestCity = getClosestCity(targetCityObject);
    const furthestCity = getFurthestCity(targetCityObject);

    markCityBox(closestCity, "closest");
    markCityBox(furthestCity, "furthest");

    updateBoxDistance(furthestCity, closestCity);

    const h2 = document.querySelector("h2");
    h2.textContent = `${targetCityObject.name} (${targetCityObject.country})`;
    tabName.innerHTML = targetCityObject.name;
} else {

    const h2 = document.querySelector("h2");
    const h3 = document.querySelector("h3");
    h2.textContent = `${userInput} is not in the database`;
    tabName.innerHTML = "City Not Found";
    h3.style.display = "none";

}

