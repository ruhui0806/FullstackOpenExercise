import { useSelector, useDispatch } from "react-redux";
import { updateVotes } from "../reducers/anecdoteReducer";
import { autoNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote);
  const filterStatus = useSelector((state) => state.filtration);
  const dispatch = useDispatch();

  const vote = (id, message) => {
    console.log("vote", id);

    dispatch(updateVotes(id));

    dispatch(autoNotification(`you voted "${message}"`, 5));
  };
  const Anecdote = ({ anecdote, handleClick }) => {
    return (
      <div>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    );
  };
  const anecdotesToshow =
    filterStatus === "ALL"
      ? [...anecdotes]
          .sort((a, b) => a.votes - b.votes)
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => vote(anecdote.id, anecdote.content)}
            />
          ))
      : [...anecdotes]
          .sort((a, b) => a.votes - b.votes)
          .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filterStatus)
          )
          .map((anecdote) => (
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => vote(anecdote.id, anecdote.content)}
            />
          ));
  return (
    //mutable operations: push, pop, splice, shift, unshift, reverse and sort.
    <div>{anecdotesToshow}</div>
  );
};
export default AnecdoteList;
