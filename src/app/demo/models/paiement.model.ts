import { Locataire } from "./locataire.model";

export interface Paiement {

    id : number;
    montant : number;
    datePaiement : string;
    locataire : Locataire;
}