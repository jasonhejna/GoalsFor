define(['angularAMD', 'angularUiRouter'], function (angularAMD) {

    // the app
    var app = angular.module('dsc', ['ui.router']);

    // =================================================
    // States
    // =================================================
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider)
        {
            $stateProvider

                // menu_ctrl
                .state(
                'base', angularAMD.route({
                    abstract: true,
                    views:
                    {
                        menu: angularAMD.route(
                        {
                            templateUrl: '/app/components/menu/menuView.html',
                            controllerUrl: '../app/components/menu/menu_ctrl'
                        })
                    }
                })
            )

                // home, aka the _ page
                .state(
                'base._', angularAMD.route({
                    url: '/_',
                    views:
                    {

                        'main@':  angularAMD.route({
                            templateUrl: '/app/components/home/home_view.html',
                            controllerUrl: '../app/components/home/home_ctrl'
                        })
                    }


                })
            )




            $urlRouterProvider.otherwise('_');
        }
    ]);


    return angularAMD.bootstrap(app);

});