import SwiperCard from "./swiperCard";
import { SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import likeButton from "../image/likeButton.svg"; 
import { useEffect, useRef, useState } from "react";
import "./home.css";
import { getLocalStorageData, setLocalStorageData } from "../lib/apicall";
import { EffectCards } from 'swiper/modules';

// Array of color palettes for dynamic styling
const colorPallets = ["rgba(244,173,66,255)", "rgba(63,153,182,255)", "rgba(255,220,128,255)", "rgba(3,169,244,255)", "rgba(139,69,19,255)"]

// React component for displaying Pokemon cards
const PokemonCards = ({ theme }) => {
    const [data, setData] = useState([]); // State to store Pokemon data
    const ref = useRef(); // Ref for accessing DOM elements
    const swiperRef = useRef(); // Ref for Swiper instance
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle CSS styling of Pokemon moves
    const handleCssStyling = () => {
        const elements = document.getElementsByClassName("pokemon-move");

        // Iterate over each element and apply a random background color
        for(let i = 0; i < elements.length; i++){
            const backgroundColor = colorPallets[Math.floor(Math.random() * colorPallets.length)];
            elements[i].style.background = backgroundColor;
        }
    }

    // Function to handle like/dislike actions
    const handleAction = (id, type) => {
        const pokeData = [...data];

        // Update the like/dislike status based on the action type
        for(let item of pokeData){
            if(item.id === id){
                if(type === "like") {
                    item.like = true;
                    item.dislike = false;
                } else {
                    item.dislike = true;
                    item.like = false;
                }
            }
        }

        // Update the state and local storage with the modified data
        setData(pokeData);
        setLocalStorageData(pokeData);
    }

    // Effect to load data from local storage when the component mounts
    useEffect(() => {
        const data = getLocalStorageData("data");
        setData(data);
    }, []);

    // Effect to apply CSS styling whenever data changes
    useEffect(() => {
        handleCssStyling();
    }, [data]);

    return(
        <>
            <SwiperCard 
                modules={[EffectCards]} 
                className="mySwiper" 
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                allowTouchMove={false}
            >
                {data?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className={theme ? "card": "dark-card"}>
                            <img className="like-button" src={likeButton} alt="like-button"/>
                            <img className="pokemon-img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="like-button"/>
                            <div className="pokemon-name">{item.name}</div>
                            <div className="moves">{
                                item.abilities.map((element)=> (
                                    <div className="pokemon-move" ref={ref}>{element.ability.name}</div>
                                ))
                            }</div>
                            <div className="button-container">
                                {!item.dislike && <button className="dislike" onClick={() => {
                                    handleAction(item.id, "disLike");
                                    swiperRef.current.slideNext()
                                    }}>Dislike</button>}
                                {!item.like && <button onClick={() => {
                                        handleAction(item.id, "like")
                                        swiperRef.current.slideNext()
                                }}>Like</button>}
                            </div>
                        </div>  
                    </SwiperSlide>
                ))}
            </SwiperCard>
            <div className="like-section">
                <button onClick={() => navigate("/like")}>Liked Pokemon</button>
            </div>
        </>
    )

}

export default PokemonCards