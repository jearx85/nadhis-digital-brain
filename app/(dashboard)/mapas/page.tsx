import MapsComponent from './MapsComponent';


export const metadata = {
 title: 'maps page',
 description: 'Maps',
};

export default function dashboardViewPage(){

  return (
    <div className="h-screen dark:bg-[#1F1F1F]">
       < MapsComponent  />
    </div>
  )
};