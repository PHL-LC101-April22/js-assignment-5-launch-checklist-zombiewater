// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageURL) {
   // Here is the HTML formatting for our mission target div.
   document.getElementById("missionTarget").innerHTML = 
   `          <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageURL}">`
}

function validateInput(testInput) {
   if (testInput === ""){
    return "Empty"
   } else if (isNaN(testInput)) {
    return 'Not a Number'
   } else {
    return 'Is a Number'
   }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   if (validateInput(pilot) === 'Is a Number' || validateInput(pilot) ===  'Empty'){
    alert('Please type a string for the pilot');
} else if (validateInput(copilot) === 'Is a Number' || validateInput(copilot) === 'Empty'){
    alert('Please type a string for the copilot');  
} else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(fuelLevel) === 'Empty'){
    alert('Please type a number for the fuel level');
} else if (validateInput(cargoLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Empty'){
        alert('Please type a number');
    } else {
        list.style.visibility = "visible";
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilot} is ready for launch`;
        
        if(fuelLevel < 10000 && cargoLevel <= 10000){
            document.getElementById("fuelStatus").innerHTML = `There is not enough fuel for this journey`;
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("fuelStatus").style.color = "red";
            document.getElementById("cargosStatus").innerHTML = "Cargo mass is low enough for the shuttle to take off";
           }else if(fuelLevel >= 10000 && cargoLevel > 10000){
            document.getElementById("cargosStatus").innerHTML = "There is too much mass for the shuttle to take off";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("cargoStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = `Fuel level is high enough for this journey`;
           }else if(fuelLevel < 10000 && cargoLevel > 10000){
            document.getElementById("fuelStatus").innerHTML = `There is not enough fuel for this journey`;
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("fuelStatus").style.color = "red";
            document.getElementById("cargosStatus").innerHTML = "There is too much mass for the shuttle to take off";
           }else {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
            document.getElementById("launchStatus").style.color = "green";
           }
        
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {

    return planets[Math.floor(Math.random()*planets.length)];

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
