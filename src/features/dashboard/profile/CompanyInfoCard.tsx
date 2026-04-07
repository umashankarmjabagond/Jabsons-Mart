import { MdBusiness, MdEdit, MdLanguage } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuPanelTop } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle, AiOutlineLink } from "react-icons/ai";
import { FaSquareInstagram } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/Button";
import Modal from "@/components/common/modal/Modal";
import { Input } from "@/components/common/ui/Input";
import { getCompanies, updateCompany } from "@/services/profile";

interface CompanyProfile {
  company_name: string;
  gstin: string;
  website: string;
  pan: string;
  facebook: string;
  instagram: string;
  google_business: string;
}

/* ---------------- FIELDS ---------------- */
const companyFields = [
  {
    key: "company_name",
    label: "Company Name",
    requiredIndicator: true,
    placeholder: "Enter company name",
  },
  {
    key: "gstin",
    label: "GSTIN",
    requiredIndicator: true,
    placeholder: "Enter GSTIN",
  },
  {
    key: "company_website",
    label: "Company Website",
    placeholder: "Enter website",
    requiredIndicator: false,
  },
  {
    key: "pan",
    label: "PAN",
    requiredIndicator: true,
    placeholder: "Enter PAN",
  },
  {
    key: "facebook_link",
    label: "Facebook Link",
    placeholder: "Enter Facebook link",
    requiredIndicator: false,
  },
  {
    key: "instagram_link",
    label: "Instagram Link",
    placeholder: "Enter Instagram link",
    requiredIndicator: false,
  },
  {
    key: "google_business_link",
    label: "Google Business Link",
    full: true,
    placeholder: "Enter Google link",
    requiredIndicator: false,
  },
];

export const CompanyInfoCard = () => {
  const [company, setCompany] = useState<CompanyProfile>({
    company_name: "",
    gstin: "",
    website: "",
    pan: "",
    facebook: "",
    instagram: "",
    google_business: "",
  });

  const [formData, setFormData] = useState(company);
  const [modalErrors, setModalErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getCompanies();

      const mapped = {
        company_name: data.company_name || "",
        gstin: data.gstin || "",
        website: data.website || "",
        pan: data.pan || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        google_business: data.google_business || "",
      };

      setCompany(mapped);
      setFormData(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setModalErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const errors: any = {};

    if (!formData.company_name)
      errors.company_name = "Company name is required";
    if (!formData.gstin) errors.gstin = "GSTIN is required";
    if (!formData.pan) errors.pan = "PAN is required";

    return errors;
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    const errors = validateForm();
    setModalErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setUpdating(true);
      await updateCompany(formData);

      setCompany((prev) => ({
        ...prev,
        ...formData,
      }));

      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        Loading company info...
      </div>
    );
  }

  return (
    <div className="relative border bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2">
          Company Information
        </h2>

        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit />
          Edit
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
        {/* LEFT */}
        <div className="flex flex-col items-start space-y-6 sm:space-y-8 ">
          {/* Company Name */}
          <div className="flex items-start gap-3">
            <MdBusiness className="w-8 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">Company Name</p>
              <p className="font-semibold text-start">
                {" "}
                {company.company_name}
              </p>
            </div>
          </div>

          {/* GST */}
          <div className="flex items-start gap-3">
            <IoNewspaperOutline className="w-8 h-6 text-blue-400" />
            <div>
              <p className="text-sm text-gray-500 text-start">GSTIN</p>
              <p className="font-semibold text-start"> {company.gstin}</p>
            </div>
          </div>

          {/* SOCIAL LINKS (EXACT OLD UI) */}
          <div className="flex items-start gap-3">
            <AiOutlineLink className="w-6 h-6 text-blue-500 item-center" />

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <a
                  href={company.facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !company.facebook && e.preventDefault()}
                >
                  <FaFacebook className="text-blue-950 w-5 h-5" />
                </a>
                <span className="text-sm text-black">FB</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={company.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !company.instagram && e.preventDefault()}
                >
                  <FaSquareInstagram className="text-pink-500 w-5 h-5" />
                </a>
                <span className="text-sm text-black">IG</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={company.google_business || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) =>
                    !company.google_business && e.preventDefault()
                  }
                >
                  <AiFillGoogleCircle className="text-blue-800 w-5 h-5" />
                </a>
                <span className="text-sm text-black">Google</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start space-y-10">
          {/* Website */}
          <div className="flex items-start gap-3">
            <MdLanguage className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">Website</p>
              <p className="font-semibold">{company.website}</p>
            </div>
          </div>

          {/* PAN */}
          <div className="flex items-start gap-3">
            <LuPanelTop className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-sm text-gray-500 text-start">PAN</p>
              <p className="font-semibold">{company.pan}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Company Info"
        showClose
        footer={
          <>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="w-full"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[170px]">
          {companyFields.map(
            ({ key, label, full, requiredIndicator, placeholder }) => (
              <div
                key={key}
                className={`flex flex-col ${full ? "sm:col-span-2" : ""}`}
              >
                <Input
                  requiredIndicator={requiredIndicator}
                  placeholder={placeholder}
                  label={label}
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  className={`px-4 py-2 ${modalErrors[key] ? "border-red-500" : ""}`}
                />
                <p className="text-red-500 text-sm min-h-[1.25rem]">
                  {modalErrors[key] || ""}
                </p>
              </div>
            ),
          )}
        </div>
      </Modal>
    </div>
  );
};
