/*
 *
 * Fitness actions
 *
 */
import {
  DELETE_WEIGHT,
  DELETE_WEIGHT_ERROR,
  DELETE_WEIGHT_SUCCESS,
  GET_WEIGHT,
  GET_WEIGHT_ERROR,
  GET_WEIGHT_SUCCESS,
  ADD_WEIGHT,
  ADD_WEIGHT_ERROR,
  ADD_WEIGHT_SUCCESS,
  CHANGE_WEIGHT,
  CHANGE_WEIGHT_DATE
} from './constants';

export function changeWeight(weight) {
  return {
    type: CHANGE_WEIGHT,
    weight,
  };
}

export function changeWeightDate(weightDate) {
  return {
    type: CHANGE_WEIGHT_DATE,
    weightDate,
  };
}

export function getWeight() {
  return {
    type: GET_WEIGHT,
  };
}

export function getWeightSuccess(weights) {
  return {
    type: GET_WEIGHT_SUCCESS,
    weights,
  };
}

export function getWeightError(error) {
  return {
    type: GET_WEIGHT_ERROR,
    error,
  };
}

export function addWeight() {
  return {
    type: ADD_WEIGHT,
  };
}

export function addWeightSuccess() {
  return {
    type: ADD_WEIGHT_SUCCESS,
  };
}

export function addWeightError(error) {
  return {
    type: ADD_WEIGHT_ERROR,
    error,
  };
}

export function deleteWeight(weightId) {
  return {
    type: DELETE_WEIGHT,
    weightId,
  };
}

export function deleteWeightSuccess() {
  return {
    type: DELETE_WEIGHT_SUCCESS,
  };
}

export function deleteWeightError(error) {
  return {
    type: DELETE_WEIGHT_ERROR,
    error,
  };
}
