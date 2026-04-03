import API from ".";

// GET CART
export const getCart = async () => {
  try {
    const response = await API.get("/cart");
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// ADD TO CART
export const addToCart = async (payload: any) => {
  try {
    const response = await API.post("/cart/add", payload);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// UPDATE ITEM
export const updateCartItem = async (payload: {
  cartId: string;
  quantity: number;
}) => {
  try {
    const response = await API.put("/cart/update", payload);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// REMOVE ITEM
export const removeCartItem = async (cartId: string) => {
  try {
    const response = await API.delete(`/cart/remove/${cartId}`);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
