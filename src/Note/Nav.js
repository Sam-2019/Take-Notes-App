import React from "react";
import logo from './logo.png'

const Navigation = (props) => {
  return (
    <>
      <div className="sticky_top  d-flex justify-content-between p-1
       bd-highlight shadow dark ">
        <div className="p-3 bd-highlight" onClick={props.Mode}>
          <div>
            <i className="fa fa-bars  "></i>
          </div>
        </div>

        <div className="p-2 bd-highlight">
          <img src={logo} alt='logo' className='logo2' />
        </div>

        <div className="p-3 bd-highlight">
          <div>
            <i className="fa fa-search   "></i>
         
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Navigation;
