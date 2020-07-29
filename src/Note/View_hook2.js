import React, { useRef, useState } from "react";
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

const UPDATE = gql`
  mutation Note($_id: ID!, $title: String!, $detail: String!) {
    updateNote(_id: $_id, title: $title, detail: $detail) {
      title
      _id
      detail
    }
  }
`;

const DELETE = gql`
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

      <Delete id={props.id} />

      <Update id={props.id} title={props.title} detail={props.detail} />
    </>
  );
};

const Delete = (props) => {
  const id = props.id;
  return (
    <Mutation key={id} mutation={DELETE}>
      {(deleteNote) => (
        <>
          <button
            className="btn  btn-outline-danger btn-sm mb-2 mr-2"
            onClick={(e) => {
              deleteNote({
                variables: {
                  id,
                },
              });
            }}
          >
            Delete
          </button>
        </>
      )}
    </Mutation>
  );
};

const stringDate = new Date();
const newDate = stringDate.toISOString();

const Update = (props) => {
  const [title, setTitle] = useState(props.title);
  const [detail, setDetail] = useState(props.detail);
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
    setUpdated_at("");
    setDialog(false);
    setButton(true);
  }

  return (
    <>
      <button className="btn  btn-outline-success btn-sm mb-2" onClick={show}>
        Edit
      </button>

      {dialog && (
        <div className="backdrop">
          <div className=" inner">
            <div className="text-right mt-1">
              <Mutation
                mutation={UPDATE}
                key={props.id}
                variables={{ title, detail }}
                refetchQueries={[{ query: NOTES_QUERY }]}
                onCompleted={(data) => hide(data)}
              >
                {(mutation) => (
                  <>
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

                    <button
                      className="btn  btn-outline-danger btn-sm mt-2 mr-2"
                      onClick={hide}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-sm  mt-2"
                      onClick={mutation}
                    >
                      Update
                    </button>
                  </>
                )}
              </Mutation>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
