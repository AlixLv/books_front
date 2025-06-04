'use client';

import React, {useEffect, useState} from "react";
import "./Header.css";


export default function Header() {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // setup fonction
        const handleMediaQueryChange = (mediaQuery) => {
            if (mediaQuery.matches){
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        };

        // dependencies
        const mediaQuery = window.matchMedia("(max-width: 700px)");
        
        // addEventListener(event, callback)
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        
        // Appel initial pour définir l'état
        handleMediaQueryChange(mediaQuery);

        return () => {
            // removeEventListener(event, callback)
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);


    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    return(
      
            <header className="Header">
                <img src="/logo.png" className="Logo" alt="Logo Books"></img>
                {(!isSmallScreen || isNavVisible) && (
                    <nav className="Nav">
                    <a href="/search">Search</a>
                    <a href="/profile">Profile</a>
                    <a href="/logout">Logout</a>
                </nav>
                )}
                <button onClick={toggleNav} className="Burger">
                    📚
                </button>
            </header>
    );
}