'use client';
import React, {useEffect, useState} from "react";
import { Book } from "../app/utils/types";


interface BookCardProps {
    book: Book
}

export default function BookCard({
    book
    }: BookCardProps){
    return (
        <div>
            <h4>{book.title}, by {book.author} <span style={{marginLeft: '8px'}}>{book.favourite ? '🩷': '🩶'}</span></h4>
            <p>Category: {book.category}</p>
            <p>Status: {book.status}</p>
            <p>Availability: {book.availability}</p>
        </div>
    )
}