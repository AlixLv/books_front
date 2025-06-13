"use client";

import { useState } from "react";
import { BookSearch } from "../app/utils/types";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface SearchBookProps {
  handleClose: () => void;
}


export default function SearchBook({handleClose}: SearchBookProps) {
    const [formState, setFormState] = useState<BookSearch>({
        title: "",
        author: "",
        availability: "",
        category: "",
        favourite: false,
    });
    const [checked, setChecked] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    console.log("title ", formState.title);
    console.log("author ", formState.author);
    console.log("availability ", formState.availability);
    console.log("category ", formState.category);
    console.log("favourite ", formState.favourite);


    function handleParams(formState:BookSearch) {
        const params = new URLSearchParams(searchParams);
        let query:string="";

        if (formState.title) {
            params.set(query="title", formState.title);
        } 
        else if(formState.author) {
            params.set(query="author", formState.author)
        }
        else if (formState.availability){
            params.set(query="availability", formState.availability)
        }
        else if (formState.category){
            params.set(query="category", formState.category)
        }
        else {
            params.delete(query);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSearch = (key: string, value: any) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleFavourite = (key:string, checked:boolean) => {
        setFormState((prev) => ({...prev, [key]:checked}))
    }

    const handleCheckFavourite = (event: React.ChangeEvent<HTMLInputElement>) => {
        // permet d'obtenir directement la nouvelle value du switch
        const newCheckedValue = event.target.checked;
        setChecked(newCheckedValue);
        console.log("HANDLE CHECK FAVOURITE ", checked)
        handleFavourite("favourite", newCheckedValue)
    };

    const handleSave = () => {
        handleParams(formState)
        handleClose();
        router.push('/');
    }

    return (
        <>
        <Stack direction="column">
            <label>Titre</label>
            <input
            name="titre"
            placeholder="Title"
            onChange={(e) => {
                handleSearch("title", e.target.value);
            }}
            />
            <label>Auteur</label>
            <input
            placeholder="Author"
            onChange={(e) => {
                handleSearch("author", e.target.value);
            }}
            />
            <label>Disponibilité</label>
            <input
            placeholder="Availability"
            onChange={(e) => {
                handleSearch("availability", e.target.value);
            }}
            />
            <label>Catégorie</label>
            <input
            placeholder="Category"
            onChange={(e) => {
                handleSearch("category", e.target.value);
            }}
            />
            <FormControlLabel control={<Switch checked={checked} onChange={handleCheckFavourite} color="secondary" />}label="favoris" />
            <Button onClick={handleSave}>Valider</Button>
        </Stack>
        </>
    );
}
