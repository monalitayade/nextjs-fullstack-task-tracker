import React from "react";
import Image from "next/image";
import LoaderImg from "@/assets/images/loader.gif";

const Loader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 backdrop-brightness-50 flex justify-center items-center">
      <Image src={LoaderImg} alt="Example GIF" width={50} height={30} />
    </div>
  );
};

export default Loader;
