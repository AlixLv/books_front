'use client';
import React, {useEffect, useState}  from "react";
import Header from "../components/Header";
import { Book } from "./utils/types";
import BookCard from "../components/BookCard";


export default function HomePage() {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
      async function fetchBooks() {
        const response = await fetch("http://localhost:8000/book/all")
        const data = await response.json()
        setBooks(data)
  }
  fetchBooks()
  }, [])

  return (
    <>
      <Header />
    <div>
      {books?.map((book:Book) => ( 
      <div key={book.id}>
        <BookCard book={book}/>
      </div>
  ))}
    </div>
    </>
  );
}



