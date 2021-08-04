import { SAVE_NAME, SAVE_EMAIL } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state, name: action.payload,
    };
  case SAVE_EMAIL:
    return {
      ...state, email: action.payload,
    };
  default: return state;
  }
};

export default login;
