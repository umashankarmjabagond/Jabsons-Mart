import API from "./index";

interface UpdateCompanyPayload {
  id: string;
  companyName?: string;
  companyType?: string;
  gstNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
}

// Fetch company details by userId
export const getCompanies = async (userId: string) => {
  try {
    const response = await API.post("/user/get-companies", { id: userId });
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

// Update company info
export const updateCompany = async (data: UpdateCompanyPayload) => {
  try {
    const response = await API.put("/user/update-company", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};


