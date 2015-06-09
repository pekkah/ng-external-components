var components = {
    "external-component": {
        module: "external-component",
        html: function (name) {
            return "http://localhost:46240/" + name + ".html";
        },
        files: function (name) {
            return [
                "http://localhost:46240/" + name + ".module.js",
                "http://localhost:46240/" + name + ".controller.js",
                "http://localhost:46240/" + name + ".css"
            ];
        }
    },
    "main-component": {
        module: "main-component",
        html: function (name) {
            return "main-component/" + name + ".html";
        },
        files: function (name) {
            return [
                "main-component/" + name + ".module.js",
                "main-component/" + name + ".controller.js",
                "main-component/" + name + ".css"
            ];
        }
    }
};


angular.module("app", ["ngRoute", "angularWidget"])
    .config(function initializeRouteProvider($routeProvider) {
        for (var component in components) {
            if (components.hasOwnProperty(component)) {
                $routeProvider.when("/" + component + "/:eatall*?", {
                    template: "<ng-widget src=\"'" + component + "'\" delay=\"0\"></ng-widget>",
                    reloadOnSearch: false
                });
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
                    html: components[name].html(name),
                    files: components[name].files(name)
                };
            };
        });
    });