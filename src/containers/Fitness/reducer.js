/*
 *
 * Fitness reducer
 *
 */
import produce from 'immer';
import {
  DELETE_WEIGHT,
  DELETE_WEIGHT_ERROR,
  DELETE_WEIGHT_SUCCESS,
  GET_WEIGHT_ERROR,
  GET_WEIGHT_SUCCESS,
  ADD_WEIGHT_ERROR,
  ADD_WEIGHT_SUCCESS,
  CHANGE_WEIGHT,
  CHANGE_WEIGHT_DATE,
} from './constants';

export const initialState = {
  errorText: '',
  weights: [],
  weight: '',
  weightId: '',
  weightDate: '',
};

/* eslint-disable default-case, no-param-reassign */
const fitnessReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_WEIGHT:
        draft.weight = action.weight;
        break;
      case CHANGE_WEIGHT_DATE:
        draft.weightDate = action.weightDate;
        break;
      case GET_WEIGHT_SUCCESS:
        draft.weights = action.weights;
        break;
      case GET_WEIGHT_ERROR:
        draft.errorText = action.error;
        break;
      case ADD_WEIGHT_SUCCESS:
        draft.weight = '';
        draft.weigthDate = '';
        break;
      case ADD_WEIGHT_ERROR:
        draft.weight = '';
        draft.weigthDate = '';
        draft.errorText = action.error;
        break;
      case DELETE_WEIGHT:
        draft.weightId = action.weightId;
        break;
      case DELETE_WEIGHT_SUCCESS:
        draft.weightId = '';
        break;
      case DELETE_WEIGHT_ERROR:
        draft.weightId = '';
        draft.errorText = action.error;
        break;
    }
  });

export default fitnessReducer;
