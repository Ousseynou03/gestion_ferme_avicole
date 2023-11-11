import { Bande } from "./bande.model";
import { Client } from "./client.model";
import { Description } from "./enums/description.enum";

export interface Vente {

    id : number;
    quantite : number;
    prixUnitaire : number;
    montant : number;
    description : Description;
    client : Client;
    bande : Bande;

}