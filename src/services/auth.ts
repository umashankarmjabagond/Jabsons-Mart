// Login function
import API from "./index";

export const loginUser = async ({ email, password }: any) => {
  try {
    const response = await API.post("/auth/signin", {
      email,
      password,
    });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getCompanies = async (payload: any) => {
  try {
    const response = await API.post("/user/get-companies", payload);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getBank = async (payload: any) => {
  try {
    const response = await API.post("/user/get-banks", payload);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const editBank = async (payload: any) => {
  try {
    const response = await API.put("/user/edit-bank", payload);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
