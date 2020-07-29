import React, { Component, Fragment } from "react";
import { Query, Mutation } from "@apollo/react-components";
import gql from "graphql-tag";

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

const NoteComponent = () => {
  return (
    <Query query={NOTES_QUERY}>
      {({ data: { notes } }) => (
        <div>
          {notes.map((note) => {
            return <div key={note.title}>{note.detail}</div>;
          })}
        </div>
      )}
    </Query>
  );
};

class LinkList extends Component {
  state = {
    title: "",
    detail: "",
    created_at: newDate,
    updated_at: newDate,
  };
  render() {
    const { title, detail, created_at, updated_at } = this.state;
    return (
      <>
        <div className="container col-9 col-md-5">
          <div className="">
            <Mutation
              mutation={NOTES_MUTATION}
              refetchQueries={[{ query: NOTES_QUERY }]}
            >
              {(mutation, result) => (
                <>
                  <div className="ml-3">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => this.setState({ title: e.target.value })}
                      value={title}
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        this.setState({ detail: e.target.value })
                      }
                      value={detail}
                      required
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-sm  mt-2"
                    onClick={() => {
                      mutation({
                        variables: {
                          title,
                          detail,
                          created_at,
                          updated_at,
                        },
                      })
                        .then((res) => res)
                        .catch((err) => <div>{err}</div>);
                      this.setState({
                        title: "",
                        detail: "",
                        created_at: "",
                        updated_at: "",
                      });
                    }}
                  >
                    Add Post
                  </button>
                </>
              )}
            </Mutation>
          </div>
          <NoteComponent />
        </div>
      </>
    );
  }
}

export default LinkList;
