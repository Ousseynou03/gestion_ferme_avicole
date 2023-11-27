import { Batiment } from "./batiment.model";

export interface Nutrition {

    id: number;
    designation: string;
    quantite: number;
    dateEntree: string;
    dateSortie: string;
    quantiteSortie: number;
    batiment: Batiment;
    
}