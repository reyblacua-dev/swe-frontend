
import type { Location } from "./Location";

export interface Character{
    id: number;
    name: string;
    species: string;
    origin: Location;
    image: string;
    status: string;
    type: string;
    gender: string;
    location: Location;

}