<small className="text-muted">{props.time}</small>

<div className="btn-group " role="group">
  <Mutation mutation={UPDATE_QUERY}>
    {(updateNote) => (
      <button
        className="btn  btn-outline-success btn-sm"
        onClick={updateNote}
      >
        Edit
      </button>
    )}
  </Mutation>

  <Mutation mutation={DELETE_QUERY}>
    {(deleteNote) => (
      <button
        className="btn  btn-outline-danger btn-sm"
        onClick={deleteNote}
      >
        Delete
      </button>
    )}
  </Mutation>
</div>

<div className="bg-primary">
<div className="row">
  <div className="col-6 ">
    <div className="btn btn-outline-success btn-sm btn-block ">
  Edit
    </div>
  </div>

  <div className="col-6  ">
    <div className="btn btn-outline-danger btn-sm btn-block ">
  Delete
    </div>
  </div>
</div>
</div>


<div className="grid-container">
<Mutation mutation={UPDATE_QUERY}>
  {(updateNote) => (
    <button
      className="btn btn-outline-success btn-sm mr-1"
      onClick={updateNote}
    >
      Edit
    </button>
  )}
</Mutation>

<Mutation mutation={DELETE_QUERY} >
  
  {(deleteNote, result) => {
    const { called } = result;
    console.log(called);

    if (called) {
      return (
        <>
          <button className="btn  btn-outline-danger btn-sm mt-2 mr-2" onClick={deleteNote}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm mt-2">
            Add Note
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="btn  btn-outline-danger btn-sm mt-2 mr-2">
            Cancel
          </button>
          <button className="btn btn-primary btn-sm mt-2">
            Add Note
          </button>
        </>
      );
    }
  }}
</Mutation>
</div>
