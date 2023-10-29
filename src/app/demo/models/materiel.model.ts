import { Batiment } from "./batiment.model";
import { Fournisseur } from "./fournisseur.model";

export interface Materiel {
    id: number;
    designation: string;
    quantite: number;
    batiment: Batiment;
    fournisseur: Fournisseur;
}