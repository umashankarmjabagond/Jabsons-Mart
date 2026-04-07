import API from "./index";

export const getUserProfile = async () => {
  try {
    const response = await API.post("/user/get-profile");
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getCompanies = async () => {
  try {
    const response = await API.post("/user/get-companies");
    console.log("response.data", response.data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const getBanks = async () => {
  try {
    const response = await API.post("/user/get-banks");
    console.log("response.data", response.data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const updateCompany = async (data: any) => {
  try {
    const response = await API.put("/user/edit-company", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const updateBank = async (data: any) => {
  try {
    const response = await API.put("/user/edit-bank", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const editUserProfile = async (data: any) => {
  try {
    const response = await API.put("/user/edit-profile", data);
    return response.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};

export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await API.post("/upload/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    throw err.response ? err.response.data : { message: err.message };
  }
};
