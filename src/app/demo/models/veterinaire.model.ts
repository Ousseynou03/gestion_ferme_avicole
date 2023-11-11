import { Bande } from "./bande.model";

export interface Veterinaire {
    id?: number;
    date?: Date;
    nomVeterinaire?: string;
    traitement?: string;
    posologie?: string;
    bande?: Bande;
  }