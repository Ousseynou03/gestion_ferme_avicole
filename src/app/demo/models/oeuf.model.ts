import { Batiment } from "./batiment.model";

export interface Oeuf {
    id: number;
    designation: string;
    quantite: string;
    nbrPlateau : string;
    batiment: Batiment;
}