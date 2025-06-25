import React from "react";
import HomePage from "./homepage/page";
import SearchWrapper from "../components/SearchWrapper";
import { BookSearch } from "./utils/types";
import { BookOnlineSharp } from "@mui/icons-material";

interface HomePageProps {
  searchParams: BookSearch;
}

export default function Page({searchParams}:{searchParams:HomePageProps["searchParams"]}){
  return(
    <>
    <SearchWrapper />
    <HomePage searchParams={searchParams}/>
    </>
  )
}