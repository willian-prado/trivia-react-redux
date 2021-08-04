import { SAVE_EMAIL, SAVE_NAME } from './actionsType';

export const actionSaveName = (payload) => ({ type: SAVE_NAME, payload });

export const actionSaveEmail = (payload) => ({ type: SAVE_EMAIL, payload });
