'use client';
import { UserProfile } from "../utils/types";
import React, {useEffect, useState} from "react";


export default function Profile(){
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)

    useEffect(() => {
        async function fetchCurrentUser() {
            const response = await fetch("http://localhost:8000/user/me")
            const userData = await response.json()
            console.log(userData)
            setCurrentUser(userData)
        }
    fetchCurrentUser()    
    })

    return (
        <div>
            <p>Name:</p>
            <p>Email:</p>
        </div>
    )
}