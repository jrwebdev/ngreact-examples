import React from 'react';
import * as angular from 'angular';
import {combineReducers} from 'redux';
import {connect} from 'react-redux';
import createLogger from 'redux-logger';
import {router, stateGo} from 'redux-ui-router';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import uiReduxRouter from 'redux-ui-router';

const logger = createLogger();

import appReducer from './state/app';
let rootReducer = combineReducers({
    app: appReducer,
    router
});

import toggle from './components/toggle';

class Container extends React.Component {
    render () {
        return (
            <div>
                <span>Toggle Value: {this.props.toggleValue.toString()}</span>
            </div>
        )
    }

}

const ConnectedContainer = connect((state, a, b) => {
    console.debug('react', {state, a, b});
    return {
        toggleValue: state.app.toggleValue
    }
})(Container);

let app = angular.module('app', [toggle, ngRedux, uiRouter, uiReduxRouter]);

app.config(($ngReduxProvider, $stateProvider, $locationProvider) => {
    $ngReduxProvider.createStoreWith(rootReducer, ['ngUiRouterMiddleware', logger]);

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url: "/",
            template: `
                <a ui-sref="main.state1">State 1</a>
                <a ui-sref="main.state2">State 2</a>
                <a ui-sref="main.state3">State 3</a>
                <app></app>
                <hr />
                <div ui-view></div>
            `
        })
        .state('main.state1', {
            url: "state1",
            template: 'state 1'
        })
        .state('main.state2', {
            url: 'state2',
            template: 'state 2'
        })
        .state('main.state3', {
            url: 'state3',
            template: '<container></container>'
        });

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
        };

        this.openState3 = () => $ngRedux.dispatch(stateGo('main.state3'));
    },
    template: `
        <div>Value: {{app.toggleValue}}</div>
        <a href="#" ng-click="app.openState3()">Open State 3</a>
        <toggle value="app.toggleValue" 
                on-toggle="app.onToggle(value)" 
                true-label="True" 
                false-label="False">
        </toggle>
        <container></container>        
    `
}));

angular.element(document).ready(() => angular.bootstrap(document, ['app']));