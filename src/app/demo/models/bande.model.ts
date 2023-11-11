import { Batiment } from "./batiment.model";
import { Mortalite } from "./moratlite.model";
import { Vente } from "./vente.model";
import { Veterinaire } from "./veterinaire.model";

export interface Bande {
    id: number;
    code: string;
    designation: string;
    dateDebut: string; // Changer le type à string
    dateFin: string;   // Changer le type à string
    effectifdepart: number;
    batiment: Batiment;
   // ventes: Vente[];
   // mortalites: Mortalite[];
   // veterinaires: Veterinaire[];
  }