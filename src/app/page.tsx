'use client';
import React, {useEffect, useState}  from "react";
import Header from "../components/Header";
import { Book, BookSearch } from "./utils/types";
import BookCard from "../components/BookCard";
import SearchBook from "../components/SearchBook";


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



