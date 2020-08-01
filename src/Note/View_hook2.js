import React, { useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

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

const UPDATE_NOTE = gql`
  mutation Note($_id: ID!, $title: String!, $detail: String!) {
    updateNote(_id: $_id, title: $title, detail: $detail) {
      title
    }
  }
`;




const Update = () => {
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

  if (loading) return <p className="card-title  text-center">Loading.....</p>;
  if (error)
    return <p className="card-title  text-center">Error! {error.message} :(</p>;
  return data.notes.map(({ _id, title, detail }) => {
    let inputTitle;
    let inputDetail;

    return (
      <div key={_id}>
        <div className="item">
          <button
            className="btn  btn-outline-success btn-sm"
            onClick={show}
          >
            Edit
          </button>
          {dialog && (
            <div className=" ">
              <div className="text-right mt-1">
                <form
                  onSubmit={(e) => {
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
                  }}
                >
                  <input
                    className="input-control text-primary"
                    ref={(node) => {
                      inputTitle = node;
                    }}
                  />

                  <input
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
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  });
};


export default Update;