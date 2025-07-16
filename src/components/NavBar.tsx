"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import Auth from "@/components/Auth";

const NavBar = () => {
  return (
    <>
      <header className="navbar">
        <Link href={"/"}>
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src={`/images/logo.svg`}
              alt="Converso Logo"
              width={44}
              height={46}
            />
          </div>
        </Link>

        <div className="flex items-center gap-8 ">
          <NavItems />
          <Auth />
        </div>
      </header>
    </>
  );
};

export default NavBar;
