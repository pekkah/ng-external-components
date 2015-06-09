angular.module("dataViewNumber", ['angularWidget'])
.controller('numberController', ['$scope','widgetConfig', function ($scope, widgetConfig) {
    $scope.number = widgetConfig.getOptions().value.number; 
    }]);