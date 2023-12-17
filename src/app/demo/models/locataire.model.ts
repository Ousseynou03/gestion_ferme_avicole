import { Appartement } from "./appartement.model";

export interface Locataire {

    id : number;
    nom : string;
    prenom : string;
    adresse : string;
    email : string;
    actif : string;

    appartement : Appartement;
}