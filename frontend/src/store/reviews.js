import { csrfFetch } from "./csrf";

const LOAD = "review/load";
const CREATE_ONE = "review/createOne";
const UPDATE_ONE = "review/updateOne";
const DELETE_ONE = "review/deleteOne";

const loadAll = (reviews) => ({
  type: LOAD,
  reviews
})

const createOne = (review) => ({
  type: CREATE_ONE,
  review
})

const updateOne = (review) => ({
  type: UPDATE_ONE,
  review
})

const deleteOne = (review) => ({
  type: DELETE_ONE,
  review
})

export const loadAllReviews = () => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadAll(data));
  }
  return response;
}

export const createReview = (review) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createOne(data));
  }
  return response;
}

export const updateReview = (review) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateOne(data));
  }
  return response;
}

export const deleteReview = (reviewId) => async(dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const id = await response.json();
    dispatch(deleteOne(id));
  }
  return response;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.reviews.forEach(review => {
        newState[review.id] = review;
      });
      return newState;
    case CREATE_ONE:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_ONE:
      newState[action.review.id] = action.review;
    case DELETE_ONE:
      delete newState[action.review];
      return newState;
    default:
      return newState;
  }
}

export default reviewsReducer
