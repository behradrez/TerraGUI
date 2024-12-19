import React from "react";
import Link from "next/link";

const Header = ({isHomePage}) => {
    return(
        <>
        <header className="sticky top-0 bg-white shadow z-50 px-8">
        <div className="flex justify-between items-center h-14">
          <div className="text-xl font-bold font-nunito cursor-pointer flex items-center">
            <Link href="/">
            <span className="text-[#2D2D2D] mr-0">Terra</span>
            <span className="text-[#6A4C93]">GUI</span>
            </Link>
          </div>
          {isHomePage && <nav className="flex items-center gap-4">
            <a href="#features" className="text-[#555] font-semibold no-underline">
              Features
            </a>
            <Link href="/design">
              <button className="bg-gradient-to-r from-[#6A4C93] to-[#8C66B9] text-white border-none px-4 py-2 rounded-lg cursor-pointer font-semibold">
                Get Started
              </button>
            </Link>
          </nav>}
        </div>
      </header>

        </>
    )
}
export default Header;