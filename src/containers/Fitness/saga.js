import { call, put, takeLatest, select } from 'redux-saga/effects';
import { request } from 'onyx/utils';
import { GET_WEIGHT, ADD_WEIGHT, DELETE_WEIGHT } from './constants';

import {
  getWeight,
  getWeightError,
  getWeightSuccess,
  deleteWeightError,
  deleteWeightSuccess,
  addWeightError,
  addWeightSuccess,
} from './actions';

import { makeSelectFitness } from './selectors';

// Get Weight
export function* loadGetWeight() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/neuron/fitness/weight`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(getWeightSuccess(result.weights));
    } else if (result && result.status === 'error') {
      yield put(getWeightError(result.message));
    } else {
      yield put(getWeightError('An error has occured'));
    }
  } catch (error) {
    yield put(getWeightError(error.toString()));
  }
}

// Add Weight
export function* loadAddWeight() {
  const token = localStorage.getItem('access_token');

  const fitness = yield select(makeSelectFitness());

  try {
    const result = yield call(request, {
      method: 'POST',
      url: `/api/neuron/fitness/weight`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        weight: fitness.weight,
        date: fitness.weightDate,
      },
    });
    if (result && result.status === 'success') {
      yield put(getWeight());
      yield put(addWeightSuccess());
    } else if (result && result.status === 'error') {
      yield put(addWeightError(result.message));
    } else {
      yield put(addWeightError('An error has occured'));
    }
  } catch (error) {
    yield put(addWeightError(error.toString()));
  }
}

// Delete Weight
export function* loadDeleteWeight() {
  const token = localStorage.getItem('access_token');

  const fitness = yield select(makeSelectFitness());

  try {
    const result = yield call(request, {
      method: 'PUT',
      url: `/api/neuron/fitness/weight`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: fitness.weightId,
      },
    });
    if (result && result.status === 'success') {
      yield put(getWeight());
      yield put(deleteWeightSuccess());
    } else if (result && result.status === 'error') {
      yield put(deleteWeightError(result.message));
    } else {
      yield put(deleteWeightError('An error has occured'));
    }
  } catch (error) {
    yield put(deleteWeightError(error.toString()));
  }
}

// Individual exports for testing
export default function* fitnessSaga() {
  yield takeLatest(GET_WEIGHT, loadGetWeight);
  yield takeLatest(ADD_WEIGHT, loadAddWeight);
  yield takeLatest(DELETE_WEIGHT, loadDeleteWeight);
}
