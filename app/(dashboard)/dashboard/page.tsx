import DashBoard from "./components/DashBoard";


export const metadata = {
 title: 'Dashboard',
 description: 'Dashboard',
};

export default function dashboardViewPage(){

  return (
    <div className="h-screen dark:bg-[#1F1F1F]">
        < DashBoard />
    </div>
  )
};