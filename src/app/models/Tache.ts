import { Prestation } from './Prestation';
import { User } from './User';
import { Voiture } from './voiture';

export class Tache {
  id!: string;
  id_voiture!: Voiture;
  date_attribution!: Date;
  date_reparation!: Date;
  id_mecanicien!: User;
  prix_total!: Number;
  reste?: Number;
}
