import { csrfFetch } from "./csrf"; //used to fetch a CRSF token. App must send req header called X-SRF-TOKEN w/ the vale fetch

export const SET_USER = "session/setUser";
export const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const restoreUser = () => async(dispatch) => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
}

export const login = (user) => async(dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch(`/api/session`, {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
  }
  return response;
}

export const signup = (user) => async(dispatch) => {
  const {email, password, username, nickname, bio, gender, image} = user;
  console.log("this is user", user);

  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("nickname", nickname);
  formData.append("bio", bio);
  formData.append("gender", gender);
  if (image) formData.append("image", image);

  console.log(formData);

  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData, //json destorys formdata so need to send without json
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user))
  }
  return response;
}

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeUser());
  }
  return response;
};

const initialState = { user: null};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
   case SET_USER:
    newState = {...state};
    newState.user = action.user;
    return newState;
   case REMOVE_USER:
    newState = {...state};
    newState.user = null;
    return newState;
  default:
    return state;
 }
};

export default sessionReducer;
