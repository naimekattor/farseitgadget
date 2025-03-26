import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-[#081620] ">
      <div className="py-4 flex justify-between items-center container mx-auto text-white text-2xl font-semibold">
        <div>
          <h1>Gadget 360</h1>
        </div>
        <div>
          <ul className="flex gap-4 text-xl font-semibold">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/offer">Offer</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
