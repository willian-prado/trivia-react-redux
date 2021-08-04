import { SAVE_QUESTIONS } from '../actions/actionsType';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};

export default game;
