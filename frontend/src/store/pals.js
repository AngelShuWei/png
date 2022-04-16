import { csrfFetch } from "./csrf";

const LOAD = "pal/load";
const CREATE_ONE = "pal/createOne"
const UPDATE_ONE = "pal/updateOne"
const DELETE_ONE = "pal/deleteOne"

const loadAll = (pals) => ({
  type: LOAD,
  pals
})

const createOne = (pal) => ({
  type: CREATE_ONE,
  pal
})

const deleteOne = (pal) => ({
  type: DELETE_ONE,
  pal
})


export const loadAllPals = () => async(dispatch) => {
  const response = await csrfFetch(`/api/pals`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadAll(data));
  }
  return response;
}

export const createPal = (pal) => async(dispatch) => {
  const response = await csrfFetch(`/api/pals`, {
    method: 'POST',
    body: JSON.stringify(pal),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createOne(data));
  }
  return response;
}

export const updatePal = (pal) => async(dispatch) => { //have to take in whole pal obj to update, unlike delete which one requires id
  console.log(pal.id);
  const response = await csrfFetch(`/api/pals/${pal.id}`, {
    method: 'PUT',
    body: JSON.stringify(pal),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createOne(data));
  }
  return response;
}

export const deletePal = (palId) => async(dispatch) => { //only requires id to delete
  const response = await csrfFetch(`/api/pals/${palId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const id = await response.json();
    dispatch(deleteOne(id));
  }
  return response;
}

const initialState = {};

const palsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.pals.forEach(pal => {
        newState[pal.id] = pal;
      });
      return newState;
    case CREATE_ONE:
      newState[action.pal.id] = action.pal;
      return newState;
    case UPDATE_ONE:
      newState[action.pal.id] = action.pal;
    case DELETE_ONE:
      delete newState[action.pal];
      return newState;
    default:
      return newState;
  }
}

export default palsReducer;
