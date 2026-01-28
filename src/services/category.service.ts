import API from "./index";

// Sidebar main categories (Farm, Electronics, Pharma)
export const fetchMainCategories = () => {
  return API.get("/categories/main");
};

// Right panel category tree (IndiaMART style)
export const fetchCategoryTreeBySlug = (slug: string) => {
  return API.get(`/categories/tree/${slug}`);
};
