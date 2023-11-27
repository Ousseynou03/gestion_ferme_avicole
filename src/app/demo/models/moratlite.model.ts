import { Bande } from "./bande.model";

export interface Mortalite {
    id: number;
    effectif: number;
    dateMortalite: string;
    description: string;
    bande: Bande;
  }