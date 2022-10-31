import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      state = null;
      return state;
    },
  },
});
export const { setNotification, removeNotification } =
  notificationSlice.actions;

export const autoNotification = (input, timeOut) => {
  let delay;
  return async (dispatch) => {
    clearTimeout(delay);
    dispatch(
      setNotification(input),
      (delay = setTimeout(() => {
        dispatch(removeNotification());
      }, timeOut * 1000))
    );
  };
};

export default notificationSlice.reducer;
