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

const DELETE_NOTE = gql`
  mutation Note($_id: ID!) {
    deleteNote(_id: $_id) {
      title
    }
  }
`;

const Delete = () => {
  return (
    <div className=" main mt-3">
      <List />
    </div>
  );
};

export default Delete;

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
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: [
      {
        query: NOTES_QUERY,
      },
    ],
  });
  const _id = props.id;

  console.log(_id);
  return (
    <div className=" mb-3  bg-warning">
      <div className="px-3">{props.title}</div>

      <small className="text-muted px-3">{props.created_at}</small>

      <div className="text-right">
        <button
          tyre="Submit"
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            deleteNote({
              variables: {
                _id,
              },
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
