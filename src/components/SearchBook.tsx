"use client";

import { useState, useId } from "react";
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
        status: "",
        category: "",
        favourite: false,
    });
    const [checked, setChecked] = useState(false);
    const [availability, setAvailability] = useState("");
    const selectAvailabilityId = useId();
    const [status, setStatus] = useState("");
    const selectStatusId = useId();
    const [category, setCategory] = useState("");
    const selectCategoryId = useId();
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    console.log("title ", formState.title);
    console.log("author ", formState.author);
    console.log("availability ", formState.availability);
    console.log("status ", formState.status);
    console.log("category ", formState.category);
    console.log("favourite ", formState.favourite);
    

    function handleParams(formState:BookSearch) {
        const params = new URLSearchParams(searchParams);

        if(formState.title && formState.title.trim() !== "") {
            params.set("title", formState.title);
        } else {
            params.delete("title");
        }

        if(formState.author && formState.author.trim() !== "") {
            params.set("author", formState.author)
        } else {
            params.delete("author");
        }

        if(formState.availability && formState.availability.trim() !== ""){
            params.set("availability", formState.availability)
        } else {
            params.delete("availability");
        } 

        if(formState.status && formState.status.trim() !== "") {
            params.set("status", formState.status)
        } else {
            params.delete("status")
        }

        if(formState.category && formState.category.trim() !==""){
            params.set("category", formState.category)
        }else {
            params.delete("category");
        } 

        if(formState.favourite == true){
            params.set("favourite", "True")
        } else {
            params.delete("favourite");
        }
    
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSearch = (key: string, value: any) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearchValue = (inputValue:string, targetValue:string) => {
        const newSearchValue = targetValue;
        if (inputValue == "availability"){
            setAvailability(newSearchValue);
            handleSearch("availability", newSearchValue)
        } else if (inputValue == "status"){
            setStatus(newSearchValue);
            handleSearch("status", newSearchValue)
        } else {
            handleSearch("category", newSearchValue)
        }
    }

    const handleFavourite = (key:string, checked:boolean) => {
        setFormState((prev) => ({...prev, [key]:checked}))
    }

    const handleCheckFavourite = (event: React.ChangeEvent<HTMLInputElement>) => {
        // permet d'obtenir directement la nouvelle value du switch
        const newCheckedValue = event.target.checked;
        setChecked(newCheckedValue);
        handleFavourite("favourite", newCheckedValue)
    };

    const handleSave = () => {
        handleParams(formState)
        handleClose();
        //router.push('/');
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
            defaultValue={searchParams.get("title")?.toString()}
            />

            <label>Auteur</label>
            <input
            placeholder="Author"
            onChange={(e) => {
                handleSearch("author", e.target.value);
            }}
            defaultValue={searchParams.get("author")?.toString()}
            />

            <label htmlFor={selectAvailabilityId}>Disponibilité</label>
            <select
            id={selectAvailabilityId}
            name="selectAvailability"
            onChange={(e) => {
                handleSearchValue("availability", e.target.value)
            }}
            >
                <option value="borrowed">Emprunté</option>
                <option value="lent">Prêté</option>
            <option value="bought">cheté</option>
            </select>

            <label htmlFor={selectStatusId}>Status</label>
            <select
            id={selectStatusId}
            name="selectStatus"
            onChange={(e) => {
                handleSearchValue("status", e.target.value);
            }}
            >
                <option value="read">Lu</option>
                <option value="unread">Non lu</option>
            </select>

            <label htmlFor={selectStatusId}>Catégorie</label>
            <select
            id={selectStatusId}
            name="selectStatus"
            onChange={(e) => {
                handleSearchValue("category", e.target.value);
            }}
            >
                <option value="essay">Essai</option>
                <option value="fiction">Fiction</option>
                <option value="autobiography">Autobiographie</option>
                <option value="comics">Comics</option>
                <option value="manga">Manga</option>
                <option value="graphic_novel">Roman graphique</option>
                <option value="fine_book">Beau-livre</option>
            </select>
            <FormControlLabel control={<Switch checked={checked} onChange={handleCheckFavourite} color="secondary" />}label="favoris" />
            <Button onClick={handleSave}>Valider</Button>
        </Stack>
        </>
    );
}
