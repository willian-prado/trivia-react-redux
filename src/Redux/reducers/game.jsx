import { SAVE_QUESTIONS } from '../actions/actionsType';

const INITIAL_STATE = {
  questions: [{
    category: 'History',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What',
    correct_answer: '2004',
    incorrect_answers: [
      '2006',
      '2008',
      '2002',
    ],
    all_answers: [
      '2006',
      '2008',
      '2002',
      '2004',
    ],
  }],
  responseCode: 0,
};

const game = (state = INITIAL_STATE, action) => {
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

export default game;
