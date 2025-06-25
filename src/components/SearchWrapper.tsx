'use client'
import { useState } from "react";
import SearchBook from "./SearchBook";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Box, Modal} from "@mui/material";

export default function SearchWrapper(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <IconButton onClick={handleOpen}><SearchIcon/></IconButton>
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
        </>          
    )
}