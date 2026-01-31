export interface CategoryItem {
  id: number;
  name: string;
}

export interface CategoryGroup {
  title: string;
  image: string;
  items: string[];
}

export interface LeftCard {
  title: string;
  description: string;
  image: string;
}

export interface CategorySection {
  leftCard: LeftCard;
  categories: CategoryGroup[];
}

export interface CategoryData {
  categories: CategorySection[];
}

export interface ProductCategoryProps {
  title: string;
  description: string;
  image: string;
  categories: CategoryGroup[];
}

export interface ProductCardProps {
  productId: string;
  productName: string;
  img: string;
  subProducts: string[];
}
