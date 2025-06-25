'use client'

import { useState } from "react";
import Header from "../components/Header"
import { Box, Modal } from "@mui/material";
import SearchBook from "../components/SearchBook";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        </body>
    </html>
  )
}