import * as angular from 'angular';

import toggle from './components/toggle';

let app = angular.module('app', [toggle]);

app.directive('app', () => ({
    controllerAs: 'app',
    controller () {
        this.toggleValue = false;
        this.onToggle = (newValue) => {
            this.toggleValue = newValue;
        }
    },
    template: `
        <div>Value: {{app.toggleValue}}</div>
        <toggle value="app.toggleValue" 
                on-toggle="app.onToggle" 
                true-label="True" 
                false-label="False">
        </toggle>        
    `
}));

angular.element(document).ready(() => angular.bootstrap(document, ['app']));