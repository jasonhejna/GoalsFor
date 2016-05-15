define(['angularAMD'], function (angularAMD) {

    angularAMD.factory('singleton', ['$http', '$state', '$location', function($http, $state, $location){

        $http({
            // :POST: email_name
            // :RESPONSE: schema JSON from db, or 'None' if no data exists
            url: singleton.base_url + 'globals/get_email_data/',
            method: 'GET',
            headers: {'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache, must-revalidate'},
            data: {'email_name': singleton.schema.home.active_email }
        })
            .then(function(response) {
                    // success
                    console.log(response.data);


                },
                function(response) { // optional
                    // failed
                    console.log(response);

                });


            var output = {"hello":"world"}
            return output;

    }]);

});