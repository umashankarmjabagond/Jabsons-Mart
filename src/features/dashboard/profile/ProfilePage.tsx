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
      <div className="h-4 bg-white w-full mt-4"></div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
