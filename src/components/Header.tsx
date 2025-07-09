import React from "react";
import Auth from "./Auth";

const Header = () => {
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <Auth />
      </header>
    </>
  );
};

export default Header;
