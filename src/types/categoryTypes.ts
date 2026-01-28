export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryItem {
  id?: number;
  name: string;
  slug?: string;
}

export interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

export interface CategorySection {
  title: string;
  groups: CategoryGroup[];
}

export interface CategoryTreeResponse {
  mainCategory: string;
  sections: CategorySection[];
}
