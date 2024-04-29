import Semaforos from "./components/SemaforosMain";
import "leaflet/dist/leaflet.css";


export const metadata = {
 title: 'Semaforos',
 description: 'Semaforos',
};

export default function semaforosViewPage(){

  return (
    // <div className="h-screen">
        < Semaforos />
    // </div>
  )
};