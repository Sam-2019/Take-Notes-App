import React from "react";

import Nav from "./Nav";
import Link from "./Link";


const Note = () => {
  return (
    <>
      <div className="d-none d-sm-block">
        <div className="desktop text-center ">
          <div className=" display-4 ">
            <span role="img" aria-label="String">
              📱
            </span>
            <span className="font-italic">only</span>
          </div>
        </div>
      </div>

      <div className="d-none d-block d-sm-none">
        <Nav />
        <div className="container col-12 col-md-5 ">
          <Link />
        </div>
      </div>
    </>
  );
};

export default Note;
