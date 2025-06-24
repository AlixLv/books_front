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
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const selectAvailabilityId = useId();
    const selectStatusId = useId();
    const selectCategoryId = useId();


    const [formState, setFormState] = useState<BookSearch>({
        title: "",
        author: "",
        availability: "",
        status: "",
        category: "",
        favourite: searchParams.get("favourite") === "false",
    });
    

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

        if(formState.favourite){
            params.set("favourite", "true")
        } else {
            params.delete("favourite");
        }
    
        replace(`${pathname}?${params.toString()}`);
    }

    const handleSearch = (key: string, value: any) => {
        setFormState((prev) => ({ ...prev, [key]: value }));
    };

    const handleCheckFavourite = (event: React.ChangeEvent<HTMLInputElement>) => {
        // permet d'obtenir directement la nouvelle value du switch
        const newCheckedValue = event.target.checked;
        setFormState((prev) => {
            const newState = { ...prev, favourite: newCheckedValue };
            // mise à jour de l'état de formState avec la nouvelle valeur
            return newState;
        });
    };

    const handleSave = () => {
        handleParams(formState)
        handleClose();
    }

    return (
        <>
        <Stack direction="column" spacing={2}>
            <label>Titre</label>
            <input
            name="titre"
            placeholder="Title"
            value={formState.title}
            onChange={(e) => {
                handleSearch("title", e.target.value);
            }}
            />

            <label>Auteur</label>
            <input
            placeholder="Author"
            value={formState.author}
            onChange={(e) => {
                handleSearch("author", e.target.value);
            }}
            />

            <label htmlFor={selectAvailabilityId}>Disponibilité</label>
            <select
            id={selectAvailabilityId}
            name="selectAvailability"
            value={formState.availability}
            onChange={(e) => {
                handleSearch("availability", e.target.value)
            }}
            >
                <option value="none">Sélectionnez une option</option>
                <option value="borrowed">Emprunté</option>
                <option value="lent">Prêté</option>
            <option value="bought">Acheté</option>
            </select>

            <label htmlFor={selectStatusId}>Status</label>
            <select
            id={selectStatusId}
            name="selectStatus"
            value={formState.status}
            onChange={(e) => {
                handleSearch("status", e.target.value);
            }}
            >
                <option value="non">Sélectionnez une option</option>
                <option value="read">Lu</option>
                <option value="unread">Non lu</option>
            </select>

            <label htmlFor={selectStatusId}>Catégorie</label>
            <select
            id={selectCategoryId}
            name="selectCategory"
            value={formState.category}
            onChange={(e) => {
                handleSearch("category", e.target.value);
            }}
            >
                <option value="non">Sélectionnez une option</option>
                <option value="essay">Essai</option>
                <option value="fiction">Fiction</option>
                <option value="autobiography">Autobiographie</option>
                <option value="comics">Comics</option>
                <option value="manga">Manga</option>
                <option value="graphic_novel">Roman graphique</option>
                <option value="fine_book">Beau-livre</option>
            </select>
            <FormControlLabel control={<Switch checked={formState.favourite} onChange={handleCheckFavourite} color="secondary" />}label="favoris" />
            <Button onClick={handleSave}>Valider</Button>
        </Stack>
        </>
    );
}
