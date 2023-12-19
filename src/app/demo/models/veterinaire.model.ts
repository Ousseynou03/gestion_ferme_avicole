import { Bande } from "./bande.model";

export interface Veterinaire {
    id: number;
    date: string;
    nomVeterinaire: string;
    traitement: string;
    posologie: string;
    bande: Bande;
  }