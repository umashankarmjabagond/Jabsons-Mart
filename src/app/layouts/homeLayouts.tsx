import React from "react";
import { Outlet,useLocation  } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";

const HomeLayout: React.FC = () => {
      const location = useLocation();
        const hideSidebarRoutes = ["/slidebar"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);
    return (
        <div className="flex h-screen bg-gray-200">
             {!shouldHideSidebar && <Sidebar />}
            {/* Main content */}
            <main className="flex-1 overflow-y-auto rounded-bl-2xl mb-4">
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default HomeLayout;
