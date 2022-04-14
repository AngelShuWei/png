import { csrfFetch } from "./csrf";

const LOAD = "pal/load";
const CREATE_ONE = "pal/createOne"
const UPDATE_ONE = "pal/updateOne"
const DELETE_ONE = "pal/deleteOne"

const loadPals = (pals) => ({
  type: LOAD,
  pals
})

const createPal = (pal) => ({
  type: CREATE_ONE,
  pal
})

const deletePal = (id) => ({
  type: DELETE_ONE,
  id
})

const updatePal = (pal) => ({
  type: UPDATE_ONE,
  pal
})

export const loadAllPals = () => async(dispatch) => {
  const response = await csrfFetch(`/api/pals`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadPals(data.allPals));
  }
  return response;
}

// export const createPal = () => async(dispatch) => {
//   const response =
// }

const initialState = {};

const palsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.pals.forEach(pal => {
        newState[pal.id] = pal;
      });
      return newState;
    default:
      return newState;
  }
}

export default palsReducer;
