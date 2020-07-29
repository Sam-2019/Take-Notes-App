import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
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

class Link extends Component {
  state = {
    title: "",
    detail: "",
    created_at: newDate,
    updated_at: newDate,
  };
  render() {
    const { title, detail, created_at, updated_at } = this.state;

    return (
      <div className="flex mt2 items-star ml-3">
        <div className="flex items-center">
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
              onChange={(e) => this.setState({ detail: e.target.value })}
              value={detail}
              required
            />
          </div>
          <Mutation
            mutation={NOTES_MUTATION}
            variables={{ title, detail, created_at, updated_at }}
            update={(store, { data: { createNote } }) => {
              const data = store.readQuery({
                query: NOTES_QUERY,
              });
              data.notes.unshift(createNote);

              store.writeQuery({
                query: NOTES_QUERY,
                data
              });
              console.log(data);
          
            }}
          >
            {(mutation, result) => {
              const { called } = result;
              if (!called) {
                return (
                  <button
                    className="btn btn-primary btn-sm  mt-2"
                    onClick={mutation}
                  >
                    Add Post
                  </button>
                );
              } else {
                return null;
              }
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Link;
