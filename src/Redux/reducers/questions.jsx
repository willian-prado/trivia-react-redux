import { SAVE_QUESTIONS } from '../actions/actionsType';

const INITIAL_STATE = {
  questions: [],
  responseCode: 3,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      responseCode: action.code,
    };
  default:
    return state;
  }
};

export default questions;
