import React from "react";

import Nav from "./Nav";
import Link from "./Link";
import ViewNotes from './View_hook2'
import ViewNote from './View_hook'

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
Hlchcyykxykxykxktzktxykxkxyyxkyxkyxkyxky
        <div className="container col-12 col-md-5 ">
  
          <ViewNote />
        </div>
      </div>
    </>
  );
};

export default Note;
