import React from "react";
import { Mutation } from "react-apollo";

const GET_TODOS = gql`
  {
    allTodos {
      id
      name
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const DeleteTodo = ({ id }) => {
  return (
    <Mutation
      mutation={DELETE_TODO}
      update={(cache, { data: { deleteTodo } }) => {
        const { allTodos } = cache.readQuery({ query: GET_TODOS });
        cache.writeQuery({
          query: GET_TODOS,
          data: { allTodos: allTodos.filter((e) => e.id !== id) },
        });
      }}
    >
      {(deleteTodo, { data }) => (
        <button
          onClick={(e) => {
            deleteTodo({
              variables: {
                id,
              },
            });
          }}
        >
          Delete
        </button>
      )}
    </Mutation>
  );
};

export default DeleteTodo;
