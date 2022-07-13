import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ heading, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <main className="flex w-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <div className="bg-[#F1F5F9] w-full min-h-screen">
        <Header heading={heading} toggleDrawer={handleDrawerToggle} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
