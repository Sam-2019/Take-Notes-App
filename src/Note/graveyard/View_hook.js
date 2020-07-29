import React, { useRef } from "react";
import { Query, Mutation } from "@apollo/react-components";
import gql from "graphql-tag";

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

const UPDATE_QUERY = gql`
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

const DELETE_QUERY = gql`
  mutation Note($_id: ID!) {
    deleteNote(_id: $_id) {
      _id
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
  return (
    <Query query={NOTES_QUERY}>
      {({ loading, error, data }) => {
        if (loading)
          return <p className="card-title  text-center">Loading.....</p>;
        if (error) return <p className="card-title  text-center">Error :(</p>;

        return data.notes.map(({ _id, title, detail }) => {
          return <View key={_id} id={_id} title={title} detail={detail} />;
        });
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
        <Detail Show={Show} title={props.title} detail={props.detail}  id={props.id}/>
      </div>
    </>
  );
};

const Detail = (props) => {
  return (
    <>
      <div className="sticky">
        <div className="d-flex justify-content-between bd-highlight ">
          <div className=" bd-highlight " onClick={props.Mode}>
            <div className="head"> {props.title}</div>
          </div>

          <div className=" bd-highlight " onClick={props.Show}>
            X
          </div>
        </div>
      </div>

      <div className="detail">{props.detail}</div>
      <div className="detail">{props.id}</div>

      <DeleteTodo id={props.id} />
    </>
  );
};

const DeleteTodo = (props) => {
  const id = props.id
  console.log(id)
  return (
    <Mutation
    key={id}
      mutation={DELETE_QUERY}
      update={(cache, { data: { deleteNote } }) => {
        const  {notes}  = cache.readQuery({ query: NOTES_QUERY });
        cache.writeQuery({
          query: NOTES_QUERY,
          data: { notes: notes.filter((e) => e.id !== id) },
        });
      }}
    >
      {(deleteNote, { data }) => (
          <>
            <button
              className="btn  btn-outline-danger btn-sm mt-2 mr-2"
              onClick={(e) => {
                deleteNote({
                  variables: {
                    id,
                  },
                });
              }}
            >
              Cancel
            </button>
          </>
      )}
    </Mutation>
  );
};
