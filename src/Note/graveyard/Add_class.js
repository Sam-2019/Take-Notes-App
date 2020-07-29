const stringDate = new Date();
const newDate = stringDate.toISOString();

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
  