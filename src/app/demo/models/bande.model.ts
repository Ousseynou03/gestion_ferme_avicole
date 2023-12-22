import { Batiment } from "./batiment.model";
import { Mortalite } from "./moratlite.model";
import { Vente } from "./vente.model";
import { Veterinaire } from "./veterinaire.model";

export interface Bande {
    id: number;
    code: string;
    designation: string;
    dateDebut: string;
    dateFin: string;
    effectifdepart: number;
    batiment: Batiment;
    cloture : string;
  }
