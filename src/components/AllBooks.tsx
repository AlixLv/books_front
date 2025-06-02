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


const AllBooksContext = createContext({
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
            <ul>
                {books?.map((book:Book) => (
                    <li key={book.id}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </AllBooksContext.Provider>
    )
}