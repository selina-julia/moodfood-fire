export interface Recipe {
  id?: string;
  title: string;
  description?: string;
  time?: number;
  difficulty?: number;
  isFavorite?: boolean;
  categories?: string[];
  ingredients?: string[];
  image?: string;
}
