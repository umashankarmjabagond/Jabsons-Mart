export interface ProductCategoryProps {
  title: string;
  products: Product[];
  staticImage?: string;

}

export interface SubProduct {
  id: number;
  name: string;
  
}

export interface Product {
  id: number;
  product: string;
  img: string;
  subProducts: SubProduct[];
}