// Function to fetch Pokemon data from the PokeAPI
export const fetchPokeApiData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon"); // Fetch list of Pokemon
    const data = await response.json(); // Parse the JSON response

    const result = []; // Array to store detailed Pokemon data

    // Loop through each Pokemon in the results
    for (let item of data.results) {
        const abilityResponse = await fetch(item.url); // Fetch detailed data for each Pokemon
        const apiData = await abilityResponse.json(); // Parse the JSON response for the detailed data

        // Push the detailed Pokemon data into the result array
        result.push({
            ...item,
            id: item.url.split("/").splice(-2)[0], // Extract Pokemon ID from the URL
            like: false, // Initialize like property
            dislike: false, // Initialize dislike property
            abilities: apiData.abilities // Store abilities data
        });
    }
    
    return result; // Return the array of detailed Pokemon data
}

// Function to set Pokemon data in local storage
export const setLocalStorageData = (pokeData) => {
    localStorage.setItem("data", JSON.stringify(pokeData)); // Store data in local storage as a JSON string
    return;
}

// Function to get Pokemon data from local storage
export const getLocalStorageData = (data) => {
    const pokeData = localStorage.getItem(data); // Retrieve data from local storage
    return JSON.parse(pokeData); // Parse the JSON string and return the data
}
