export interface Book {
    id: number; 
    title: string;
    author: string;
    availability: string;
    status: string;
    category: string;
    favourite: boolean;
}

export interface BookSearch {
    title?: string;
    author?: string;
    availability?: string;
    status?: string;
    category?: string;
    favourite?: boolean;
}


export interface UserProfile {
    name: string;
    email: string;
}