import { csrfFetch } from "./csrf";

const LOAD = "game/load";

const loadAll = (games) => ({
  type: LOAD,
  games
})

export const loadAllGames = () => async(dispatch) => {
  const response = await csrfFetch(`/api/games`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadAll(data));
  }
  return response;
}

const initialState = {};

const gamesReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.games.forEach(game => {
        newState[game.id] = game;
      });
      return newState;
    default:
      return newState;
  }
}

export default gamesReducer;
