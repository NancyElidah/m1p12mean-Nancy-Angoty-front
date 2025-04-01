export class Tache {
  id!: string;
  id_voiture!: { _id: string; immatriculation: string };
  date_attribution!: Date;
  date_reparation!: Date;
  id_mecanicien!: { _id: string; nom: string; prenom: string; email: string };
  prix_total!: number;
  details_rep!: {
    prestation: string;
    quantite: number;
    prix: number;
    prix_total: number;
    paye: number;
    details_pieces: {
      id_piece: string;
      quantite: number;
      prix: number;
      prix_total: number;
    }[];
  }[];
}
