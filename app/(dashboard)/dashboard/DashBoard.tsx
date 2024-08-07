import React from "react";
import Grid from "../_components/grid/Grid";

// import "./DashBoard.css";
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

