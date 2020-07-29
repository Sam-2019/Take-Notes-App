import React, { Component, Fragment } from "react";
import Link from "./Link";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

export const NOTES_QUERY = gql`
  query {
    notes {
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
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          return (
            <Fragment>
              {data.notes.map(({ _id, title, detail }) => (
                <View key={_id} id={_id} title={title} detail={detail} />
              ))}
              {data.notes.map((notes, index) => (
                <Link key={notes._id} notes={notes} index={index} />
              ))}
            </Fragment>
          );
        }}
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
