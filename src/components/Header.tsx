'use client';

import React, {useEffect, useState} from "react";
import "./Header.css";
import logo from "/logo.png";


export default function Header() {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleMediaQueryChange = (mediaQuery) => {
            if (mediaQuery.matches){
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        };

        const mediaQuery = window.matchMedia("(max-width: 700px)");
        
        // Correct : addEventListener(event, callback)
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        
        // Appel initial pour définir l'état
        handleMediaQueryChange(mediaQuery);

        return () => {
            // Correct : removeEventListener(event, callback)
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
                <a href="/">Search</a>
                <a href="/">Profile</a>
                <a href="/">Logout</a>
            </nav>
            )}
            <button onClick={toggleNav} className="Burger">
                🍔
            </button>
        </header>
    );
}