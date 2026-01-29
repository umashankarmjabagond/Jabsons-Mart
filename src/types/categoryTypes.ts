export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryGroup {
  title: string;
  image?: string;
  items: string[]; // ✅ correct
}

export interface CategorySection {
  title: string;
  groups: CategoryGroup[];
}

export interface CategoryTreeResponse {
  mainCategory: string;
  sections: CategorySection[];
}
