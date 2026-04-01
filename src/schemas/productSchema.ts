import * as yup from "yup";

export const productSchema = yup.object().shape({
  products: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Product name is required"),
      categoryId: yup.string().required("Select final category"),
      images: yup.array().min(1, "At least one image required"),
    }),
  ),
});
