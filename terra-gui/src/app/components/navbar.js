import Link from "next/link";
import React from "react";

const Navbar = () => {
    return(
        <nav className="bg-black">
            <ul className="flex flex-row align-top">
                <div className="mx-10">
                    <Link href="/">
                        <p>
                            Home
                        </p>
                    </Link>
                </div>
                <div className="mx-10">      
                    <Link href="/design">
                        <p>
                            Design
                        </p>
                    </Link>
                </div>
                <div className="mx-10">
                    <Link href="/">
                        <p>
                            Logout
                        </p>
                    </Link>
                </div>
            </ul>
       
        </nav>
    )
}

export default Navbar;