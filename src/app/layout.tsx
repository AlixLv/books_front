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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <html lang="en">
      <body>
        <Header handleOpen={handleOpen}/>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{  
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4}}>
              <SearchBook handleClose={handleClose}/>
            </Box>
          </Modal>
        {children}
        </body>
    </html>
  )
}