import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-background">
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>

      <div className="md:ml-64">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
