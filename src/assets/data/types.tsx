export interface Stagiaire {
    id: number
    nom: string,
    prenom: string,
    email: string
}

export interface Formation {
    id: number,
    nom: string
}

export interface PickerPropsSt {
  options: Stagiaire[];
  onAdd: (stagiaire: Stagiaire) => void;
}

export interface RowPropsSt {
    stagiaire: Stagiaire;
    onRemove: (stagiaire: Stagiaire) => void;
}

export type PropsSt = PickerPropsSt | RowPropsSt;

export interface BinomeDTO {
  nom: string;
  stagiaireIds: Binome;
}

export type Binome = [one: number, two: number];

export interface SessionDTO {
  dateDeb: Date;
  dateFin: Date;
  formationId: number;
  stagiairesId: number[];
}

export interface Session {
    id: number
  dateDeb: Date;
  dateFin: Date;
  formationId: number;
  stagiairesId: number[];
}

export interface StagiairePourBinome {
  id: number;
  binomeId: number | null;
  nom: string;
  prenom: string;
  email: string;
}