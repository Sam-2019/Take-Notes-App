import React, { useState } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import ViewNotes from "./View_hook";

const NOTES_QUERY = gql`
  query {
    notes {
      title
      detail
    }
  }
`;

const NOTES_MUTATION = gql`
  mutation Note(
    $title: String!
    $detail: String!
    $created_at: String!
    $updated_at: String!
  ) {
    createNote(
      title: $title
      detail: $detail
      created_at: $created_at
      updated_at: $updated_at
    ) {
      title
      detail
    }
  }
`;

const stringDate = new Date();
const newDate = stringDate.toISOString();

const Create = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [created_at, setCreated_at] = useState(newDate);
  const [updated_at, setUpdated_at] = useState(newDate);
  const [dialog, setDialog] = useState(false);
  const [button, setButton] = useState(true);

  function show() {
    setDialog(true);
    setButton(false);
  }

  function hide() {
    setTitle("");
    setDetail("");
    setCreated_at("");
    setUpdated_at("");
    setDialog(false);
    setButton(true);
  }

  return (
    <>
      {button && (
        <>
          <span onClick={show} className="fa-stack fa-lg float">
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
          </span>
        </>
      )}

      {dialog && (
        <div className=" backdrop  ">
          <div className=" inner">
            <input
              type="text"
              className="input-control"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              value={title}
            />

            <textarea
              type="text"
              className="input-control"
              onChange={(e) => setDetail(e.target.value)}
              value={detail}
              placeholder="Detail"
              required
            />

            <div className="text-right mt-3">
              <Mutation
                mutation={NOTES_MUTATION}
                variables={{ title, detail, created_at, updated_at }}
                onCompleted={(data) => hide(data)}
              >
                {(mutation, result) => {
                  const { called } = result;

                  if (called) {
                    return (
                      <>
                        <button
                          className="btn  btn-outline-danger btn-sm mt-2 mr-2"
                          onClick={hide}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary btn-sm mt-2"
                          onClick={mutation}
                        >
                          Add Note
                        </button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <button
                          className="btn  btn-outline-danger btn-sm mt-2 mr-2"
                          onClick={hide}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-primary btn-sm mt-2"
                          onClick={mutation}
                        >
                          Add Note
                        </button>
                      </>
                    );
                  }
                }}
              </Mutation>
            </div>
          </div>
        </div>
      )}
      <ViewNotes />
    </>
  );
};

export default Create;
