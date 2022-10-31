import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import FilterInput from "./components/FilterForm";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterInput />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
