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

export const trackProductView = async (productId: string) => {
  try {
    await API.post("/user/track-view", {
      product_id: productId,
    });
  } catch (err) {
    console.error("Track view failed", err);
  }
};
export const trackSearch = async (searchText: string) => {
  try {
    await API.post("/user/track-search", {
      query: searchText,
    });
  } catch (err) {
    console.error("search track failed", err);
  }
};

export const sendEnquiry = async (productId: string, message: string) => {
  try {
    const res = await API.post("/user/add-enquiry", {
      product_id: productId,
      message,
    });

    return res.data;
  } catch (err: any) {
    console.error("Enquiry failed", err);
    throw err.response ? err.response.data : err;
  }
};
