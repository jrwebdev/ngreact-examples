import React from 'react';
import * as angular from 'angular';
import {combineReducers} from 'redux';
import {connect} from 'react-redux';
import createLogger from 'redux-logger';
import ngRedux from 'ng-redux';

const logger = createLogger();

import appReducer from './state/app';
let rootReducer = combineReducers({app: appReducer});

import toggle from './components/toggle';

class Container extends React.Component {
    render () {
        return <span>{this.props.toggleValue.toString()}</span>
    }

}

const ConnectedContainer = connect((state, a, b) => {
    console.debug('react', {state, a, b});
    return {
        toggleValue: state.app.toggleValue
    }
})(Container);

let app = angular.module('app', [toggle, ngRedux]);

app.config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer, [logger]);
});

app.directive('container', (reactDirective, $ngRedux) => {
    return reactDirective(ConnectedContainer, null, {}, {store: $ngRedux});
});


app.directive('app', () => ({
    controllerAs: 'app',
    controller ($ngRedux) {

        $ngRedux.connect((state) => {
            return {
                toggleValue: state.app.toggleValue
            }
        })(this);

        this.onToggle = (newValue) => {
            $ngRedux.dispatch({type: 'TOGGLE'});
        }

    },
    template: `
        <div>Value: {{app.toggleValue}}</div>
        <toggle value="app.toggleValue" 
                on-toggle="app.onToggle(value)" 
                true-label="True" 
                false-label="False">
        </toggle>
        <container></container>        
    `
}));

angular.element(document).ready(() => angular.bootstrap(document, ['app']));