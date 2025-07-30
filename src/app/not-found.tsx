import React from "react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col justify-center items-center">
      <Image
        src="/images/page-not-found.svg"
        alt="not found"
        width={190}
        height={150}
      />

      <h1>Sorry,the page is not exist.</h1>

      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </main>
  );
};

export default NotFound;
