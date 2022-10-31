import { connect } from "react-redux";
import { addNew } from "../reducers/anecdoteReducer";
import { autoNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addNewAnecdotes = async (event) => {
    event.preventDefault();
    const input = event.target.anecdote.value;
    event.target.anecdote.value = ""; //empty the input after create new
    props.addNew(input);
    props.autoNotification(`new anecdote "${input}"`, 5);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdotes}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
const mapDispatchToProps = {
  addNew: addNew,
  autoNotification: autoNotification,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
