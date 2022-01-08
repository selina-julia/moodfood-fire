import { DocumentReference } from '@angular/fire/compat/firestore';

export interface Recipe {
  id: string;
  uid?: string;
  title: string;
  description?: string;
  time?: number;
  level: 'easy' | 'medium' | 'advanced';
  isFavorite: boolean;
  categories?: string[];
  ingredients?: string[];
  image?: string;
  ref?: DocumentReference;
}
