import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const changedAnecdote = action.payload;

      return state.map((n) =>
        n.id !== changedAnecdote.id ? n : changedAnecdote
      );
    },
    appendAnec(state, action) {
      state.push(action.payload);
    },
    setAnec(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendAnec, setAnec, findForVote } =
  anecdoteSlice.actions;

// With Redux Thunk it is possible to implement action creators,
// which return a function instead of an object.
// The function receives Redux store's dispatch and getState methods as parameters.
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const ancdotes = await anecdoteService.getAll();
    dispatch(setAnec(ancdotes));
  };
};

export const addNew = (input) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(input);
    dispatch(appendAnec(newAnecdote));
  };
};

export const updateVotes = (id) => {
  return async (dispatch) => {
    const anecToVote = await anecdoteService.findOne(id);
    const updatedObj = { ...anecToVote, votes: anecToVote.votes + 1 };
    await anecdoteService.update(updatedObj);
    dispatch(addVote(updatedObj));
  };
};

export default anecdoteSlice.reducer;
