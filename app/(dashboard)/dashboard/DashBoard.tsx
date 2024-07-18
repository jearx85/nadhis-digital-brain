import React from "react";
import Grid from "../_components/grid/Grid";

<<<<<<< HEAD
import "./DashBoard.css";
=======
// import "./DashBoard.css";
>>>>>>> 6e2d0ad2ec6a8eaa5a1e7c806be7264d1fc43f1b
import Navbar from "../_components/navigation/Navbar";

export default async function Dashboard() {


 return (
    <div className="flex h-screen px-2"> 
      <div className="flex flex-col flex-grow"> 
        <nav>
          < Navbar />
        </nav>
        <div className="flex-grow p-10 dark:bg-[#1F1F1F]"> 
          <Grid />
        </div>
      </div>
    </div>
 );
}

