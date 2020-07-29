import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";

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

export default class Note extends Component {
  state = {
    addPost: false,
    button: true,
  };

  addOpen = () => {
    this.setState({
      addPost: true,
      button: false,
    });
  };

  addClose = () => {
    this.setState({
      addPost: false,
      button: true,
    });
  };
  render() {
    return (
      <>
        {this.state.button ? (
          <div className="float" onClick={this.addOpen}>
            <div className="text">Post</div>
          </div>
        ) : null}

        {this.state.addPost ? (
          <div className="backdrop">
            <Add addClose={this.addClose} />
          </div>
        ) : null}

        <div className="container col-10 col-md-4 skip">
          <List />
        </div>
      </>
    );
  }
}

const List = () => {
  return (
    <Query query={NOTES_QUERY}>
      {({ loading, error, data }) => {
        if (loading)
          return <p className="card-title  text-center">Loading.....</p>;
        if (error) return <p className="card-title  text-center">Error :(</p>;

        return data.notes.map(({ _id, title, detail }) => (
          <View key={_id} id={_id} title={title} detail={detail} />
        ));
      }}
    </Query>
  );
};

const View = (props) => {
  return (
    <div className="view p-3" key={props.key}>
      <h5 className='text-center'> {props.title}</h5>
    </div>
  );
};

class Add extends Component {
  state = {
    title: "",
    detail: "",
    created_at: newDate,
    updated_at: newDate,
  };

  addClose = () => {
    this.setState({
      title: "",
      detail: "",
      created_at: "",
      updated_at: "",
    });
    this.props.addClose();
  };
  render() {
    const { title, detail, created_at, updated_at } = this.state;
    return (
      <div className=" a  container  col-9 col-md-4">
        <div className=" inner">
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
          <div className="text-right ">
            <button
              className="btn btn-danger btn-sm mt-2 mr-2"
              onClick={this.addClose}
            >
              Cancel
            </button>
            <Mutation
              mutation={NOTES_MUTATION}
              variables={{ title, detail, created_at, updated_at }}
              onCompleted={(data) => this.addClose(data)}
            >
              {(mutation, result) => {
                const { loading, error, called } = result;
                if (!called) {
                  return (
                    <button
                      className="btn btn-primary btn-sm mt-2"
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
      </div>
    );
  }
}
