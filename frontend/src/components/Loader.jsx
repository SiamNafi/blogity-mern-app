import React from "react";
import loadingIcon from "@/assets/loading.svg";

const Loader = () => {
  return (
    <div className="min-w-screen min-h-screen fixed top-0 left-0 z-50 bg-black flex justify-center items-center">
      <img src={loadingIcon} width={100} />
    </div>
  );
};

export default Loader;
