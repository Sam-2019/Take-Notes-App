import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";

import "./item.css";

const NOTES_QUERY = gql`
  query {
    notes {
      _id
      title
      detail
    }
  }
`;

const UPDATE_NOTE = gql` mutation Note($_id: ID!, $title: String!, $detail: String!) { updateNote(_id: $_id, title: $title, detail: $detail) { title } } `;

const Main = () => {
  return (
    <div className=" main mt-3">
      <List />
    </div>
  );
};

export default Main;

const List = () => {
  const { loading, error, data } = useQuery(NOTES_QUERY);
  const [updateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: [
      {
        query: NOTES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });

  const [dialog, setDialog] = useState(false);
  const [button, setButton] = useState(true);

  function show() {
    setDialog(true);
    setButton(false);
  }

  function hide() {
    setDialog(false);
    setButton(true);
  }

  const slide = useRef(null);

  const Show = () => {
    const slider = slide.current;
    slider.classList.toggle("is-slideLeft-open");
  };

  if (loading) return <p className="card-title  text-center">Loading.....</p>;
  if (error)
    return <p className="card-title  text-center">Error! {error.message} :(</p>;
  return data.notes.map(({ _id, title, detail }) => {
    let inputTitle;
    let inputDetail;

    return (
      <div key={_id}>
        <div className="view">
          <div className="text-center" onClick={Show}>
            {title}
          </div>
        </div>

        <div ref={slide} className="slideLeft shadow">
          <div className="sticky ">
            <div className="d-flex justify-content-between bd-highlight  text-white">
              <div className=" bd-highlight ">
                <div className="head"> {title}</div>
              </div>

              <div className=" bd-highlight " onClick={Show}>
                X
              </div>
            </div>
          </div>

          <div className="detail text-white">
            {detail}
            <div>
              {dialog && (
                <div className=" ">
                  <div className="text-right mt-1">
                    <input
                      className="input-control text-primary"
                      ref={(node) => {
                        inputTitle = node;
                      }}
                    />

                    <textarea
                      className="input-control text-primary"
                      ref={(node) => {
                        inputDetail = node;
                      }}
                    />

                    <button
                      className="btn  btn-outline-danger btn-sm mt-2 mr-2"
                      onClick={hide}
                    >
                      Cancel
                    </button>

                    <button
                      tyre="Submit"
                      className="btn btn-primary btn-sm  mt-2"
                      onClick={(e) => {
                        e.preventDefault();
                        updateNote({
                          variables: {
                            _id,
                            title: inputTitle.value,
                            detail: inputDetail.value,
                          },
                        });
                        inputTitle.value = "";
                        inputDetail.value = "";
                        hide();
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}

              {button && (
                <div className="btn-group " role="group">
                  <button
                    className="btn  btn-success btn-sm"
                    onClick={show}
                  >
                    Edit
                  </button>
                  <button className="btn btn-outline-danger btn-sm ml-2 disabled">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
};
