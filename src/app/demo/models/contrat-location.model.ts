import { Locataire } from "./locataire.model";

export interface ContratLocation {
    id : number;
    dateDebut : string;
    dateFin : string;
    locataire : Locataire;
}