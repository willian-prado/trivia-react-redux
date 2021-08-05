import { SAVE_QUESTIONS } from './actionsType';

const actionSaveQuestions = (payload, code) => ({ type: SAVE_QUESTIONS, payload, code });

export default actionSaveQuestions;
