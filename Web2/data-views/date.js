angular.module("dataViewDate", ["angularWidget"])
    .controller("date", [
        "$scope", "widgetConfig", function ($scope, widgetConfig) {
            $scope.options = widgetConfig.getOptions();
        }
    ]);