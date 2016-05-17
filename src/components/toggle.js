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

module.directive('toggle', ['reactDirective', function (reactDirective) {
    return reactDirective(Toggle);
}]);

export default module.name;