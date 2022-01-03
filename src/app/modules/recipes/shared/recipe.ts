export interface Recipe {
  id?: string;
  title: string;
  description?: string;
  time?: number;
  level: 'easy' | 'medium' | 'advanced';
  isFavorite?: boolean;
  categories?: string[];
  ingredients?: string[];
  image?: string;
}
