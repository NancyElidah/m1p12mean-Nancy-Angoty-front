export class Prestation {
    idPrestation?: string;
    intitule!: string;
    prix!: number;
    idPropos?: string[];  
    prestationType?: {
      intitule: string;  // L'intitulé du Propos
    };
  }

  