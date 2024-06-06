import SwiperCard from "./swiperCard";
import { SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import likeButton from "../image/likeButton.svg";
import "./home.css";
import { useEffect } from "react";
import {fetchPokeApiData, setLocalStorageData} from "../lib/apicall"

const HomeCard = ({theme}) => {
    const navigate = useNavigate(); // Hook for navigation

    // Function to fetch Pokemon data from an API and store it in local storage
    const fetchData = async () => {
        const data = await fetchPokeApiData(); // Fetch data from the PokeAPI
        setLocalStorageData(data); // Store the fetched data in local storage
    }
    
    // Effect to fetch data when the component mounts
    useEffect(() => {
        fetchData(); // Call the fetchData function to load the data
    }, []);

    return (
        <SwiperCard>
            {[1,2,3].map((_,index) => (
                <SwiperSlide key={index}>
                    <div className={theme ? "card": "dark-card"}>
                        <img className="like-button" src={likeButton} alt="like-button"/>
                        <h2>How to Play PokéSwipe</h2>
                        <p>Pokémon Appear One at a Time</p>
                        <p>Choose "Like" or "Dislike"</p>
                        <p>Build Your Favorite Team</p>
                        <button onClick={() => navigate("/pokemon")}>Let's Go!</button>
                    </div>
                </SwiperSlide>
            ))}
        </SwiperCard>
    )

}

export default HomeCard;