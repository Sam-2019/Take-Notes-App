import React, { useRef } from "react";
import { Query } from "@apollo/react-components";

import "./item.css";

const Main = (props) => {
  return (
    <div className=" main mt-3">
      <List  query={props.query}/>
    </div>
  );
};

export default Main;

const List = (props) => {
  return (
    <Query query={props.query}>
      {({ loading, error, data }) => {
        if (loading)
          return <p className="card-title  text-center">Loading.....</p>;
        if (error) return <p className="card-title  text-center">Error :(</p>;

        return data.notes.map(({ _id, title, detail }) => (
          <View key={title} id={_id} title={title} detail={detail} />
        ));
      }}
    </Query>
  );
};

const View = (props) => {
  const slide = useRef(null);

  const Show = () => {
    const slider = slide.current;
    slider.classList.toggle("is-slideLeft-open");
  };

  return (
    <>
      <div className="view" key={props.id} onClick={Show}>
        <div className="text-center">{props.title}</div>
      </div>

      <div ref={slide} className="slideLeft shadow">
        <Detail Show={Show} title={props.title} detail={props.detail} />
      </div>
    </>
  );
};

const Detail = (props) => {
  return (
    <>
      <div className="sticky ">
        <div className="d-flex justify-content-between bd-highlight ">
          <div className=" bd-highlight " onClick={props.Mode}>
            <div className="head"> {props.title}</div>
          </div>

          <div className=" bd-highlight " onClick={props.Show}>
            X
          </div>
        </div>
      </div>

      <div className="detail">
        {props.detail}
        <div>
          <small className="text-muted">{props.time}</small>

          <div className="btn-group " role="group">
            <button className="btn  btn-outline-success btn-sm">
              Edit
            </button>
            <button className="btn btn-outline-danger btn-sm ml-2">
              Delete
            </button>
          </div>

    
        </div>
      </div>
    </>
  );
};
