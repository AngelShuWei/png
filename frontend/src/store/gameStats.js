import { csrfFetch } from "./csrf";

const LOAD = "gameStat/load";
const CREATE_ONE = "gameStat/createOne";

const loadGameStat = (gameStats) => ({
  type: LOAD,
  gameStats
})

const createOne = (gameStat) => ({
  type: CREATE_ONE,
  gameStat
})

export const loadAllGameStats = () => async(dispatch) => {
  const response = await csrfFetch(`/api/gameStats`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadGameStat(data));
  }
  return response;
}

export const createGameStat = (gameStat) => async(dispatch) => {
  const response = await csrfFetch(`/api/gameStats`, {
    method: 'POST',
    body: JSON.stringify(gameStat),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createOne(data));
  }
}

const initialState = {};

const gameStatsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOAD:
      action.gameStats.forEach(gameStat => {
        newState[gameStat.id] = gameStat;
      });
      return newState;
    case CREATE_ONE:
      newState[action.gameStat.id] = action.gameStat;
      return newState;
    default:
      return newState;
  }
}

export default gameStatsReducer
