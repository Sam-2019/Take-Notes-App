import React from "react";

const Navigation = (props) => {
  return (
    <>
      <div className="sticky_top  d-flex justify-content-between bd-highlight p-2 shadow dark ">
        <div className="p-2 bd-highlight" onClick={props.Mode}>
          <div>
            <i className="fa fa-bars  "></i>
          </div>
        </div>

        <div className="p-2 bd-highlight">Flex item</div>

        <div className="p-2 bd-highlight">
          <div>
            <i className="fa fa-search   "></i>
         
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Navigation;
