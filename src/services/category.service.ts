import {
  ApiSuccessResponse,
  Category,
  CategoryTreeResponse,
  LandingMainCategory,
} from "@/types/categoryTypes";
import API from "./index";
import { ApiProduct } from "@/types/productTypes";

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

export const fetchProductsApi = (params: {
  product?: string | null;
  category?: string | null;
}) => {
  return API.get<ApiProduct[]>("/products/getProduct", { params });
};
