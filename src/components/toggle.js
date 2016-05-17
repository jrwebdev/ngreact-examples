const module = angular.module('toggle', []);

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
            this.toggle = () => {
                this.value = !this.value;
                this.onToggle({value: this.value});
            };
        },
        template: `
          <div ng-click="toggle.toggle()">
              <span ng-class="{'selected': toggle.value}">
                  {{toggle.trueLabel || 'Yes'}}
              </span>
              <span ng-class="{'selected': !toggle.value}">
                  {{toggle.falseLabel || 'No'}}
              </span>
          </div>
      `
    }
});

export default module.name;