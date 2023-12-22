import { Bande } from "./bande.model";

export interface Ramassage {
    id : number;
    observation : string;
    quantite : string;
    nbrOeufCasse : number;
    nbrOeufPerdu : number;
    nbrPlateauOeuf : number;
    dateRamassage : string;
    bande : Bande;

}