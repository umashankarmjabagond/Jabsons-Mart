import API from "./index";


export const getCompanies = async () => {
  try {
    const response = await API.get("/user/get-companies");
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
