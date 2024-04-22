import GraficView from "./graficView";


export const metadata = {
 title: 'Vista Gráfica',
 description: 'Vista Gráfica',
};

export default function graficViewPage(){

  return (
    <div className="h-screen">
        < GraficView />
    </div>
  )
};

