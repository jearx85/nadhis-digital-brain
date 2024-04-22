import Link from "next/link";
import React from "react";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar items-center justify-between p-3 fixed shadow dark:bg-[#1F1F1F] rounded-lg ml-10 w-screen">
        <Link href={"/documents"}>
          <span className="ml-5">Ir al editor</span>
        </Link>
      </nav>
    </div>
  );
}
