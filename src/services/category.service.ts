import { Category, CategoryTreeResponse } from "@/types/categoryTypes";
import API from "./index";

export const fetchMainCategories = () => {
  return API.get<Category[]>("/categories/main");
};

export const fetchCategoryTreeBySlug = (slug: string) => {
  return API.get<CategoryTreeResponse>(`/categories/tree/${slug}`);
};
