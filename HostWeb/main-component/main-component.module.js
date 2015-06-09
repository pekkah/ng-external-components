var widgets = {
    "dataViewNumber": {
        module: "dataViewNumber",
        isView: false,
        html: "http://localhost:46240/data-views/number.html",
        files: [
            "http://localhost:46240/data-views/number.js"
        ]
    },
    "dataViewDate": {
        module: "dataViewDate",
        isView: false,
        html: "http://localhost:46240/data-views/date.html",
        files: [
            "http://localhost:46240/data-views/date.js"
        ]
    }
}

angular.module("main-component", [])
    .controller("dataTable", ["$scope",
        function($scope) {
            $scope.data = [
                {
                    label: "Number",
                    type: "dataViewNumber",
                    value: {
                        number: 1001
                    }
                },
                {
                    label: "Date",
                    type: "dataViewDate",
                    value: {
                        date: "12-12-2015"
                    }
                }
            ];
        }
    ]).config(function initializemanifestGenerator(widgetsProvider) {
        widgetsProvider.setManifestGenerator(function() {
            return function(name) {
                return {
                    module: widgets[name].module,
                    html: widgets[name].html,
                    files: widgets[name].files
                };
            };
        });
    })
.directive('testDirective', [function() {
        return {
            restrict: 'A',
            scope: {
                row: '=testDirective'
            },
            templateUrl: 'main-component/directive.html'
        };
    }]);