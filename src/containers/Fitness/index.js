/* eslint-disable no-undef */
/**
 *
 * Fitness
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga } from 'onyx/utils';
import { useInjectReducer } from 'onyx/utils';
import { Container } from 'onyx/components';
import { Widget } from 'onyx/components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import CanvasJSReact from '../../assets/js/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

import { makeSelectFitness } from './selectors';
import {
  getWeight,
  addWeight,
  deleteWeight,
  changeWeight,
  changeWeightDate,
} from './actions';
import saga from './saga';
import reducer from './reducer';

import messages from './messages';

export function Fitness({ user, getWeightFunc, addWeightFunc, deleteWeightFunc, changeWeightFunc, changeWeightDateFunc, fitness }) {
  useInjectReducer({ key: 'fitness', reducer });
  useInjectSaga({ key: 'fitness', saga });

  useEffect(() => {
    getWeightFunc();
  }, [0]);

  const getOptions = (weights) => {
    let dataPoints = [];

    weights.map(weight => {
      dataPoints.push({
        id: weight.id,
        x: new Date(weight.date),
        y: parseFloat(weight.weight),
      })
    })

    const options = {
        title: {
          text: "Weight"
        },
        axisY: {
          title: "Weight",
          includeZero: false
        },
        data: [{
          type: "line",
          click: e => {
            console.log(e)
            var result = confirm("Delete ?");
            if (result) {
                deleteWeightFunc(e.dataPoint.id);
            }
          },
          toolTipContent: "{x}: {y}",
          xValueFormatString: "YYYY-MM-DD",
          yValueFormatString: "###",
          dataPoints: dataPoints
        }],
     }

     return options
  }

  return (
    <div>
      <Helmet>
        <title>Fitness</title>
        <meta name="description" content="Description of Fitness" />
      </Helmet>
      <Container user={user} title={<FormattedMessage {...messages.header} />}>
        {fitness && (
          <div>

            <h1><FormattedMessage {...messages.weight} /></h1>

            <input value={fitness.weight} onChange={changeWeightFunc} className="uk-input uk-form-large" type="number" step="0.1" />
            <input value={fitness.weightDate} onChange={changeWeightDateFunc} className="uk-input uk-form-large" type="date" />
            <div className="uk-padding-small center">
              <button
                type="button"
                onClick={() => addWeightFunc()}
                className="uk-button uk-button-primary uk-button-large"
              >
                <FormattedMessage id="onyx.global.send" />
              </button>
            </div>

            <CanvasJSChart options={fitness.weights && getOptions(fitness.weights)} />
          </div>
        )}
      </Container>
    </div>
  );
}

export function WeightWidgetComponent({ user, getWeightFunc, fitness, ...props }) {
  useInjectReducer({ key: 'fitness', reducer });
  useInjectSaga({ key: 'fitness', saga });

  useEffect(() => {
    getWeightFunc();
  }, [0]);

  const getOptions = (weights) => {
    let dataPoints = [];

    weights.map(weight => {
      dataPoints.push({
        id: weight.id,
        x: new Date(weight.date),
        y: parseFloat(weight.weight),
      })
    })

    const options = {
        title: {
          text: "Weight"
        },
        axisY: {
          title: "Weight",
          includeZero: false
        },
        data: [{
          type: "line",
          toolTipContent: "{x}: {y}",
          xValueFormatString: "YYYY-MM-DD",
          yValueFormatString: "###",
          dataPoints: dataPoints
        }],
     }

     return options
  }

  return (
    <Widget className='uk-card uk-card-default uk-card-body' style={props.style}>
        {fitness && (
          <div style={{width: '35vh', height: '40vh'}}>
            <CanvasJSChart options={fitness.weights && getOptions(fitness.weights)} />
          </div>
        )}
    </Widget>
  );
}

Fitness.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  fitness: makeSelectFitness(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWeightFunc: () => {
      dispatch(getWeight());
    },
    addWeightFunc: () => {
      dispatch(addWeight());
    },
    deleteWeightFunc: id => {
      dispatch(deleteWeight(id));
    },
    changeWeightFunc: evt => {
      if(evt && evt.target){
        dispatch(changeWeight(evt.target.value));
      }
    },
    changeWeightDateFunc: evt => {
      if(evt && evt.target){
        dispatch(changeWeightDate(evt.target.value));
      }
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const WeightWidget = compose(
  withConnect,
  memo,
)(WeightWidgetComponent);

export default compose(
  withConnect,
  memo,
)(Fitness);
