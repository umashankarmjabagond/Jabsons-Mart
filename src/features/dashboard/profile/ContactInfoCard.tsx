import { TbDeviceMobileStar } from "react-icons/tb";
import { RiMailStarLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/ui/Button";
import Modal from "@/components/common/modal/Modal";
import { Input } from "@/components/common/ui/Input";
import { editUserProfile, getUserProfile } from "@/services/profile";
import { useTranslation } from "react-i18next";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  alt_email: string;
  alt_mobile: string;
  address?: string;
}

const contactFields = [
  {
    key: "mobile",
    label: "Mobile",
    requiredIndicator: true,
    placeholder: "update your mobile",
  },
  {
    key: "email",
    label: "Email",
    requiredIndicator: true,
    placeholder: "update your email",
  },
  {
    key: "alt_mobile",
    label: "Alt Mobile",
    requiredIndicator: false,
    placeholder: "update your alt mobile",
  },
  {
    key: "alt_email",
    label: "Alt Email",
    requiredIndicator: false,
    placeholder: "update your alt email",
  },
  {
    key: "address",
    label: "Address",
    full: true,
    requiredIndicator: true,
    placeholder: "update your address",
  },
];

export const ContactInfoCard: React.FC = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    mobile: "",
    alt_email: "",
    alt_mobile: "",
    address: "",
  });

  const [formData, setFormData] = useState(user);
  const [modalErrors, setModalErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();

      const mappedUser: UserProfile = {
        id: data.id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        alt_email: data.alt_email || "",
        alt_mobile: data.alt_mobile || "",
        address: data.address || "",
      };

      setUser(mappedUser);
      setFormData(mappedUser);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- INPUT CHANGE ---------------- */
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

    if (!formData.mobile) {
      errors.mobile = "Mobile is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile must be 10 digits";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    return errors;
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    const errors = validateForm();
    setModalErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      setUpdating(true);

      const payload = {
        mobile: formData.mobile,
        email: formData.email,
        alt_mobile: formData.alt_mobile,
        alt_email: formData.alt_email,
        address: formData.address,
      };

      // const res = await editUserProfile(payload);

      setUser((prev) => ({
        ...prev,
        ...payload,
      }));

      setIsOpen(false);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        Loading contact info...
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md px-5 py-6 mt-4">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-3 mb-5">
        <h2 className="text-lg font-semibold text-black">
          {t("PROFILE.CONTACT_INFO")}
        </h2>

        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <MdEdit /> {t("PROFILE.EDIT_BTN")}
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
        <div className="flex items-start gap-3">
          <TbDeviceMobileStar className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">{t("PROFILE.PRIMARY_MOB")}</p>
            <p className="font-semibold">{user.mobile}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TbDeviceMobileStar className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">{t("PROFILE.ALT_MOB")}</p>
            <p className="font-semibold">{user.alt_mobile}</p>
          </div>
        </div>

        <div className="flex !items-start gap-3">
          <RiMailStarLine className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500 text-start">
              {t("PROFILE.PRIMARY_MAIL")}
            </p>
            <p className="font-semibold">{user.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <RiMailStarLine className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500 text-start">
              {t("PROFILE.ALT_MAIL")}
            </p>
            <p className="font-semibold">{user.alt_email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <CiLocationOn className="w-6 h-6 text-green-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500 text-start">
              {t("PROFILE.ADDRESS")}
            </p>
            <p className="font-semibold">{user.address}</p>
          </div>
        </div>
      </div>

      {/* MODAL (BANK STYLE) */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Contact Information"
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
          {contactFields.map(
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
                  className={`px-4 py-2 ${
                    modalErrors[key] ? "border-red-500" : ""
                  }`}
                />

                <p className="text-red-500 text-sm min-h-[1.25rem] text-start px-2 py-1">
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
