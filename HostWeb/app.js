var components = {
    "external-component": {
        module: "external-component",
        isView: true,
        html: "http://localhost:46240/external-component.html",
        files: [
            "http://localhost:46240/external-component.module.js",
            "http://localhost:46240/external-component.css"
        ]
    },
    "main-component": {
        module: "main-component",
        isView: true,
        html: "main-component/main-component.html",
        files:[
            "main-component/main-component.module.js",
            "main-component/main-component.css"
        ]
    }
};


angular.module("app", ["ngRoute", "angularWidget"])
    .config(function initializeRouteProvider($routeProvider) {
        for (var componentName in components) {
            if (components.hasOwnProperty(componentName)) {
                var component = components[componentName];

                if (component.isView) {
                    $routeProvider.when("/" + componentName + "/:eatall*?", {
                        template: "<ng-widget src=\"'" + componentName + "'\" delay=\"0\"></ng-widget>",
                        reloadOnSearch: false
                    });
                }
            }
        }

        $routeProvider.otherwise({
            redirectTo: "/main-component/"
        });
    })
    .config(function initializemanifestGenerator(widgetsProvider) {
        widgetsProvider.setManifestGenerator(function() {
            return function(name) {
                return {
                    module: components[name].module,
                    html: components[name].html,
                    files: components[name].files
                };
            };
        });
    });