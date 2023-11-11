import { Bande } from "./bande.model";

export interface Mortalite {
    id?: number;
    effectif?: number;
    dateMortalite?: Date;
    description?: string;
    bande?: Bande;
  }