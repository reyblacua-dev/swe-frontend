
export interface Location{
    name: string;
    url: string;
}

export interface Character{
    id: number;
    name: string;
    species: string;
    origin: Location;
    image: string;
    state: string;
    type: string;
    gender: string;
    location: Location;
    
}