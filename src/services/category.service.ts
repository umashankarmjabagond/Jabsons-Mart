import {
  ApiSuccessResponse,
  Category,
  CategoryTreeResponse,
  LandingMainCategory,
} from "@/types/categoryTypes";
import API from "./index";

export const fetchMainCategories = () => {
  return API.get<Category[]>("/categories/main");
};

export const fetchCategoryTreeBySlug = (slug: string) => {
  return API.get<CategoryTreeResponse>(`/categories/tree/${slug}`);
};

export const fetchLandingCategories = () => {
  return API.get<ApiSuccessResponse<LandingMainCategory[]>>(
    "/categories/landing/flattened",
  );
};
