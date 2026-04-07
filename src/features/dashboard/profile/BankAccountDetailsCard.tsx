import { useState, useEffect, JSX } from "react";
import { BsBank2 } from "react-icons/bs";
import { VscCodeOss } from "react-icons/vsc";
import { MdEdit, MdOutlineAccountBox, MdSwitchAccount } from "react-icons/md";

import Modal from "@/components/common/modal/Modal";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { PROFILE_PAGE_TXT } from "@constants/textConstants";
import { editBank } from "@/services/auth";
import { getBanks } from "@/services/profile";

import {
  isValidIFSC,
  verifyIFSCExists,
  validateBankForm,
  BankFormErrors,
} from "@/schemas/bankValidation";

/* ---------------- TYPES ---------------- */
interface BankData {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

export const BankAccountDetailsCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BankData>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const [modalFormData, setModalFormData] = useState(formData);
  const [modalFormErrors, setModalFormErrors] = useState<BankFormErrors>({});

  /* ---------------- FETCH FROM API ---------------- */
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      setLoading(true);

      const res = await getBanks();

      // ✅ DIRECT RESPONSE MAPPING (based on your API)
      const mapped = {
        bankName: res?.bank_name || "",
        accountNumber: res?.account_number || "",
        ifscCode: res?.ifsc_code || "",
        accountHolderName: res?.account_holder_name || "",
      };

      setFormData(mapped);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch bank info");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- MODAL ---------------- */
  const openModal = () => {
    setModalFormData(formData);
    setModalFormErrors({});
    setIsOpen(true);
  };

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setModalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setModalFormErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  /* ---------------- IFSC AUTO ---------------- */
  const handleIFSCBlur = async () => {
    const { ifscCode } = modalFormData;
    if (!ifscCode) return;

    if (!isValidIFSC(ifscCode)) {
      setModalFormErrors((prev) => ({
        ...prev,
        ifscCode: PROFILE_PAGE_TXT.INVALID_IFSC,
      }));
      return;
    }

    const ifscData = await verifyIFSCExists(ifscCode);

    if (ifscData?.BANK) {
      setModalFormData((prev) => ({
        ...prev,
        bankName: ifscData.BANK,
      }));

      setModalFormErrors((prev) => ({
        ...prev,
        ifscCode: undefined,
      }));
    } else {
      setModalFormErrors((prev) => ({
        ...prev,
        ifscCode: PROFILE_PAGE_TXT.IFSC_NOT_FOUND,
      }));
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const errors = await validateBankForm(modalFormData);
      setModalFormErrors(errors);

      if (Object.keys(errors).length) return;

      const loginStr = localStorage.getItem("user");
      if (!loginStr) throw new Error("Login response not found");

      const loginObj = JSON.parse(loginStr);
      const userId = loginObj.user?.id;
      if (!userId) throw new Error("User ID not found");

      await editBank({ id: userId, ...modalFormData });

      setFormData(modalFormData);
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update bank info");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADING / ERROR ---------------- */
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        {PROFILE_PAGE_TXT.LOADING_BANK}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-4 text-red-500">
        {PROFILE_PAGE_TXT.ERROR_BANK} {error}
      </div>
    );
  }

  return (
    <div className="relative border bg-white rounded-lg shadow-md px-3 py-4 mt-4">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-semibold text-black p-2">
          {PROFILE_PAGE_TXT.BANK_ACC}
        </h2>

        <div
          onClick={openModal}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
        >
          <MdEdit /> {PROFILE_PAGE_TXT.EDIT_BTN}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
        <div className="flex flex-col items-start space-y-6 sm:space-y-8">
          <div className="flex items-start gap-3">
            <VscCodeOss className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">
                {PROFILE_PAGE_TXT.IFSC}
              </p>
              <p className="font-semibold text-start">{formData.ifscCode}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BsBank2 className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">
                {PROFILE_PAGE_TXT.BANK_NAME}
              </p>
              <p className="font-semibold text-start">{formData.bankName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-10">
          <div className="flex items-start gap-3">
            <MdOutlineAccountBox className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">
                {PROFILE_PAGE_TXT.ACC_NUM}
              </p>
              <p className="font-semibold text-start">
                {formData.accountNumber}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdSwitchAccount className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 text-start">
                {PROFILE_PAGE_TXT.ACC_HOLDER}
              </p>
              <p className="font-semibold text-start">
                {formData.accountHolderName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={PROFILE_PAGE_TXT.EDIT_BANK_MODAL}
        showClose
        footer={
          <>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="secondary"
            >
              {PROFILE_PAGE_TXT.CANCEL}
            </Button>
            <Button onClick={handleUpdate} className="w-full">
              {PROFILE_PAGE_TXT.UPDATE}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[170px]">
          <div className="flex flex-col">
            <Input
              label={PROFILE_PAGE_TXT.IFSC}
              name="ifscCode"
              value={modalFormData.ifscCode}
              onChange={handleChange}
              onBlur={handleIFSCBlur}
              className={`px-4 py-2 ${
                modalFormErrors.ifscCode ? "border-red-500" : ""
              }`}
              placeholder="update IFSC code"
            />
            <p className="text-red-500 text-sm min-h-[1.25rem]">
              {modalFormErrors.ifscCode || ""}
            </p>
          </div>

          <div className="flex flex-col">
            <Input
              label={PROFILE_PAGE_TXT.BANK_NAME}
              name="bankName"
              value={modalFormData.bankName}
              onChange={handleChange}
              className={`px-4 py-2 ${
                modalFormErrors.bankName ? "border-red-500" : ""
              }`}
              placeholder="update bank name"
            />
            <p className="text-red-500 text-sm min-h-[1.25rem]">
              {modalFormErrors.bankName || ""}
            </p>
          </div>

          <div className="flex flex-col">
            <Input
              label={PROFILE_PAGE_TXT.ACC_NUM}
              name="accountNumber"
              value={modalFormData.accountNumber}
              onChange={handleChange}
              className={`px-4 py-2 ${
                modalFormErrors.accountNumber ? "border-red-500" : ""
              }`}
              placeholder="update account number"
            />
            <p className="text-red-500 text-sm min-h-[1.25rem]">
              {modalFormErrors.accountNumber || ""}
            </p>
          </div>

          <div className="flex flex-col">
            <Input
              label={PROFILE_PAGE_TXT.ACC_HOLDER}
              name="accountHolderName"
              value={modalFormData.accountHolderName}
              onChange={handleChange}
              className={`px-4 py-2 ${
                modalFormErrors.accountHolderName ? "border-red-500" : ""
              }`}
              placeholder="update account holder name"
            />
            <p className="text-red-500 text-sm min-h-[1.25rem]">
              {modalFormErrors.accountHolderName || ""}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};
