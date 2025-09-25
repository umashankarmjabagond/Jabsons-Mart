export interface CategoryItem {
  id: number;
  name: string;
}


export interface CategoryGroup {
  title: string;
  image: string | any; 
  items: String[]; 
}


export interface LeftCard {
  title: string;
  description: string;
  image: string | any;
}


export interface CategorySection {
  leftCard: LeftCard;
  categories: CategoryGroup[];
}


export interface CategoryData {
  categories: CategorySection[];
}