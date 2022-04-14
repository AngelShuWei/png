import { csrfFetch } from "./csrf";

const LOAD = "user/load";

const loadUsers = (users) => ({
  type: LOAD,
  users
})

export const loadAllUsers = () => async(dispatch) => {
  const response = await csrfFetch(`/api/users`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadUsers(data.allUsers));
  }
  return response;
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    default:
      return newState;
  }
}

export default usersReducer
