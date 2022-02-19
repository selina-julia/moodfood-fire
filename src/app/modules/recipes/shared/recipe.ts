import { DocumentReference } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/shared/models/category';

export interface Recipe {
  id: string;
  uid?: string;
  userId?: string;
  publicState?: 'public' | 'private';
  title: string;
  description?: string;
  time?: number;
  level: 'easy' | 'medium' | 'advanced';
  isFavorite: boolean;
  categories?: DocumentReference<Category>;
  ingredients?: string[];
  image?: string;
}
