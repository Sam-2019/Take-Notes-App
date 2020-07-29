import React, { Component, Fragment } from "react";
import Link from "./Link";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

const NOTES_QUERY = gql`
  query {
    notes  {
      _id
      title
      detail
    }
  }
`;

class LinkList extends Component {
  render() {
    return (
      <Query query={NOTES_QUERY}>
        {({ data: { notes } }) => (
        
          <div>
            {notes.map(note => (
              <View key={note._id} {...note} />
            ))}
          </div>
        )}  
      </Query>
    );
  }
}

export default LinkList;

const View = (props) => {
  return (
    <div className="view p-3" key={props.key}>
      <h5 className="text-center"> {props.title}</h5>
    </div>
  );
};
