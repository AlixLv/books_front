'use client';

import React, { useEffect, useState } from "react";
import "./Header.css";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";

interface HeaderProps {
    handleOpen: () => void
}

export default function Header({handleOpen}: HeaderProps) {
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
                <Link href="/"><img src="/logo.png" className="Logo" alt="Logo Books"></img></Link>
                {(!isSmallScreen || isNavVisible) && (
                    <nav className="Nav">
                    <IconButton onClick={handleOpen}><SearchIcon/></IconButton>
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