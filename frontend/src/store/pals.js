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

const deleteOne = (id) => ({
  type: DELETE_ONE,
  id
})

const updateOne = (pal) => ({
  type: UPDATE_ONE,
  pal
})

export const loadAllPals = () => async(dispatch) => {
  const response = await csrfFetch(`/api/pals`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadAll(data.allPals));
  }
  return response;
}

export const createPal = (pal) => async(dispatch) => {
  const {title, description, palPic, price, address, city, state, country } = pal
  const response = await csrfFetch(`/api/pals`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      description,
      palPic,
      price,
      address,
      city,
      state,
      country,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createOne(data.pal));
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
    default:
      return newState;
  }
}

export default palsReducer;
