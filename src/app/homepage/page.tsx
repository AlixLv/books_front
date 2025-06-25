import React from "react";
import { Book, BookSearch } from "../utils/types";
import BookCard from "../../components/BookCard";


interface HomePageProps {
  searchParams: BookSearch;
}

async function fetchBooks(searchParams: HomePageProps["searchParams"]) {
  try {
    const params = new URLSearchParams();
    if (searchParams.title && searchParams.title.trim() !== "") {
      params.set("title", searchParams.title);
    }
    if (searchParams.author && searchParams.author.trim() !== "") {
      params.set("author", searchParams.author);
    }
    if (searchParams.availability && searchParams.availability.trim() !== "") {
      params.set("availability", searchParams.availability);
    }
    if (searchParams.status && searchParams.status.trim() !== "") {
      params.set("status", searchParams.status);
    }
    if (searchParams.category && searchParams.category.trim() !== "") {
      params.set("category", searchParams.category);
    }
    if (searchParams.favourite) {
      params.set("favourite", "true");
    } 

    const queryString =  params.toString();
    console.log("queryString: ", queryString)
    const response = await fetch(`http://localhost:8000/book/all?${queryString}`, {cache: "no-store"});
    console.log("FETCHING ", `http://localhost:8000/book/all?${queryString}`)
    
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
    return data;
  } catch (error) {
    console.log("Erreur lors du fetch des livres: ", error);
    return [];
  }
}


export default async function HomePage(
  {searchParams}: {searchParams:HomePageProps["searchParams"]}) {
  const books = await fetchBooks(searchParams);


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



