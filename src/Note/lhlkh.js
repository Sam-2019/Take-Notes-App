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

const UPDATE_MUTATION = gql`
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

const DELETE_MUTATION = gql`
  mutation deleteNote($_id: ID!) {
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

      <Update id={props.id} />

      <div ref={slide} className="slideLeft shadow">
        <Detail
          Show={Show}
          title={props.title}
          detail={props.detail}
          id={props.id}
        />
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
    </>
  );
};

const Delete = (props) => {
  const id = props.id;
  console.log(id);
  return (
    <Mutation key={id} mutation={DELETE_MUTATION}>
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
  const id = props.id;
  console.log(id);
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
                mutation={UPDATE_MUTATION}
                key={id}
                variables={{ title, detail, created_at, updated_at }}
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
                      defaultValue={title}
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
                      Add Post
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
