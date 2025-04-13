export class Promotion {
    _id?: string;
    intitule!: string;
    pourcentage!: number;
    debut?: Date;
    fin?: Date;
    idPrestation?: {
        _id: string;
        intitule: string;
      };
    statut!:number;
}

  