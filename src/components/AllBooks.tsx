'use client';

import React, {useEffect, useState, createContext, useContext} from "react";

interface Book {
    id: number; 
    title: string;
    author: string;
    availability: string;
    status: string;
    category: string;
    favourite: boolean;
}


export const AllBooksContext = createContext({
    books: [], fetchBooks: () => {}
})

export default function AllBooks(){
    const [books, setBooks] = useState([])
    const fetchBooks = async () => {
        const response = await fetch("http://localhost:8000/book/all")
        const books = await response.json()
        setBooks(books)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <AllBooksContext.Provider value={{books, fetchBooks}}>
            <div>
                {books?.map((book:Book) => ( 
                    <div key={book.id}>
                        <h4>{book.title} by {book.author}</h4>
                        <li>Category: {book.category}</li> 
                        <li>Status: {book.status}</li>
                        <li>Availability: {book.availability}</li>
                    </div>
                ))}
            </div>
        </AllBooksContext.Provider>
    )
}