import API from "./index";

export interface ContactInfoProps {
  id: string;
  primaryMobile: string;
  altMobile?: string;
  primaryEmail: string;
  altEmail?: string;
  address: string;
  name: string;
  location: string;
  memberSince: string;
  rating: number;
}

// Fetch user profile by ID
export const getUserProfileById = async (id: string): Promise<ContactInfoProps> => {
  try {
    const response = await API.get(`/user/get-profile/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${id}:`, error);
    throw error;
  }
};
