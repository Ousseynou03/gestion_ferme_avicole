import { Bande } from "./bande.model";
import { Categorie } from "./enums/categorie.enum";

export interface Depense {
    id?: number;
    dateDepense?: Date;
    categorie?: Categorie;
    quantite?: number;
    prixUnitaire?: number;
    montant?: number;
    description?: string;
    bande?: Bande;
  }