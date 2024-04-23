import Semaforos from "./components/SemaforosMain";


export const metadata = {
 title: 'Semaforos',
 description: 'Semaforos',
};

export default function semaforosViewPage(){

  return (
    <div className="h-screen">
        < Semaforos />
    </div>
  )
};