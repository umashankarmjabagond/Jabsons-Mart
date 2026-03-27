import ProfileCard from "./ProfileCard";
import { ContactInfoCard } from "./ContactInfoCard";
import { CompanyInfoCard } from "./CompanyInfoCard";
import { BankAccountDetailsCard } from "./BankAccountDetailsCard";
import Footer from "@/components/common/Footer";

const ProfilePage = () => {
  return (
    <div className="p-4 ">
      <ProfileCard />
      <ContactInfoCard />
      <CompanyInfoCard />
      <BankAccountDetailsCard />
      <div className="mt-2 ">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
