
import { useEffect, useState } from "react";
import { getLocalStorageData } from "../lib/apicall";

// React component for displaying liked Pokemon
const LikedPokemon = ({theme}) => {
    const [data, setData] = useState([]); // State to store liked Pokemon data

    // Effect to load liked Pokemon data from local storage when the component mounts
    useEffect(() => {
        const data = getLocalStorageData("data"); // Retrieve data from local storage
        
        // Filter the data to get only the liked Pokemon
        const likedData = data.filter((item) => item.like);
        setData(likedData); // Update the state with liked Pokemon
    }, []);

    return (
        <div>
            <div className="pokemon-name">Pokemon you have liked</div>
                <div className="card-container">
                    {data.map((item) => (
                        <div className={theme ? "card": "dark-card"}>
                            <img className="like-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="like-button"/>
                            <div className="like-name">{item.name}</div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default LikedPokemon;