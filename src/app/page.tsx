'use client';
import React, {useEffect, useState}  from "react";
import { useSearchParams } from "next/navigation";
import { Book } from "./utils/types";
import BookCard from "../components/BookCard";


export default function HomePage() {
  const [books, setBooks] = useState([])
  const searchParams = useSearchParams();

  
  useEffect(() => {
      const fetchBooks = async () => {
        try {
          const queryString = searchParams.toString();
          const response = await fetch(`http://localhost:8000/book/all?${queryString}`)
          console.log(`http://localhost:8000/book/all${queryString}`)
          if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setBooks(data);
        } catch (error){
          console.error("Erreur lors du fetch: ", error);
        }
  };

  fetchBooks();
  }, [searchParams]);

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



