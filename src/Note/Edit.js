import React, { useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import "./item.css";

const NOTES_QUERY = gql`
  query {
    notes {
      _id
      title
      detail
      created_at
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation Note($_id: ID!, $title: String!, $detail: String!) {
    updateNote(_id: $_id, title: $title, detail: $detail) {
      title
    }
  }
`;

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

  if (loading) return <p className="card-title  text-center">Loading.....</p>;
  if (error)
    return <p className="card-title  text-center">Error! {error.message} :(</p>;
  return data.notes.map(({ _id, title, detail, created_at }) => (
    <EditPage
      key={_id}
      id={_id}
      title={title}
      detail={detail}
      created_at={created_at}
    />
  ));
};

const EditPage = (props) => {
  const [updateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: [
      {
        query: NOTES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });
  const _id = props.id;
  const [editBox, setEditBox] = useState(false);
  const [buttonGroup, setButtonGroup] = useState(true);

  function show() {
    setEditBox(true);
    setButtonGroup(false);
  }

  function hide() {
    setEditBox(false);
    setButtonGroup(true);
  }

  const slide = useRef(null);

  const Show = () => {
    const slider = slide.current;
    slider.classList.toggle("is-slideLeft-open");
  };

  console.log(_id);
  let inputTitle;
  let inputDetail;
  return (
    <div className=" ">
      <div className="p-2 bg-warning" onClick={Show}>
        {props.title}
      </div>

      <div ref={slide} className="slideLeft shadow">
        <div className="sticky ">
          <div className="d-flex justify-content-between bd-highlight ">
            <div className=" bd-highlight ">
              <div className="text-warning"> {props.title}</div>
            </div>

            <div className=" bd-highlight " onClick={Show}>
              X
            </div>
          </div>
        </div>
        <div className="detail text-warning">
          {props.detail}
          <div>
            <small className="text-muted">{props.created_at}</small>
          </div>

          {editBox && (
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
          )}

          {buttonGroup && (
            <div className="btn-group " role="group">
              <button
                className="btn  btn-outline-success btn-sm"
                onClick={show}
              >
                Edit
              </button>
              <button className="btn btn-outline-danger btn-sm ml-2" disabled>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
