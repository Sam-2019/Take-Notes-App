const [title, setTitle] = useState("");
const [detail, setDetail] = useState("");
const [created_at, setCreated_at] = useState(newDate);
const [updated_at, setUpdated_at] = useState(newDate);

const handleonChange = (e) => {
  const { name, value } = e.target;
  setInputValues({ ...inputValues, [name]: value });
};

const useModal = () => {
    const [dialog, setDialog] = useState(false);
  
    function toggle() {
      setDialog(!dialog);
    }
    return {
      dialog,
      toggle,
    };
  };
  
  const Modal = ({ dialog, hide }) =>
    dialog
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div>Hello</div>
          </React.Fragment>,
          document.body
        )
      : null;
  
  const Appie = () => {
    const { dialog, toggle } = useModal();
    return (
      <>
        <div>
          <Modal dialog={dialog} hide={toggle} />
        </div>
        <button onClick={toggle}>Show</button>
      </>
    );
  };
  
  let history = useHistory();
history.push("/home");