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

const DELETE_MUTATION = gql`
  mutation Note($_id: ID!) {
    deleteNote(_id: $_id) {
      _id
    }
  }
`;

const Edit = () => {
  const { loading, error, data } = useQuery(NOTES_QUERY);
  const [deleteNote] = useMutation(DELETE_MUTATION, {
    variables: {},
    refetchQueries: [
      {
        query: NOTES_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });


  if (loading) return <p className="card-title  text-center">Loading.....</p>;
  if (error)
    return <p className="card-title  text-center">Error! {error.message} :(</p>;
  return data.notes.map(({ _id, title, detail }) => {
    return (
      <div key={_id}>
        <div className="item">
          <span>
            {title} <br />
            {detail}
          </span>
          <button
            className="btn  btn-outline-danger btn-sm"
            onClick={deleteNote}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};

export default Edit;
