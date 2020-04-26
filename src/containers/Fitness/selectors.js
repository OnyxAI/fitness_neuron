import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectFitnessDomain = state => state.fitness || initialState;

const makeSelectFitness = () =>
  createSelector(
    selectFitnessDomain,
    substate => substate,
  );

export { makeSelectFitness };
