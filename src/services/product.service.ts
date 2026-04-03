import API from ".";

export const createProduct = async (formData: FormData) => {
  try {
    const response = await API.post("/products/add-product", formData);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getUploadSignature = async () => {
  try {
    const response = await API.get("/upload/signature");
    console.log("Received upload signature:", response.data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const searchProductsAPI = async (query: string) => {
  try {
    const response = await API.get("/products/search", {
      params: { q: query },
    });

    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const fetchProductDetailsApi = async (id: string | undefined) => {
  try {
    const response = await API.get(`/products/productDetails${id}`);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
