import React from 'react';
import 'ngreact';

const module = angular.module('toggle', ['react']);

const Toggle = (props) => (
    <div onClick={() => props.onToggle(!props.value)}>
        <span className={props.value ? 'selected' : ''}>
            {props.trueLabel || 'Yes'}
        </span>
        <span className={!props.value ? 'selected' : ''}>
            {props.falseLabel || 'No'}
        </span>
    </div>
);

Toggle.propTypes = {
    value: React.PropTypes.bool,
    trueLabel: React.PropTypes.string,
    falseLabel: React.PropTypes.string,
    onToggle: React.PropTypes.func
};

module.directive('reactToggle', ['reactDirective', function (reactDirective) {
    return reactDirective(Toggle);
}]);

module.directive('toggle', function () {
    return {
        controllerAs: 'toggle',
        bindToController: {
            value: '=',
            trueLabel: '@',
            falseLabel: '@',
            onToggle: '&'
        },
        controller: function () {
            this.toggle = (newValue) => {
                this.value = newValue;
                this.onToggle({value: newValue});
            };
        },
        template: `
            <react-toggle value="toggle.value"
                          true-label="toggle.trueLabel"
                          false-label="toggle.falseLabel"
                          on-toggle="toggle.toggle">
            </react-toggle>
        `
    }
});

export default module.name;