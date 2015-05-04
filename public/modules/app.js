'use strict';

angular.module('app', ['ngRoute', 'ngResource'])
    .factory('ContactUs', ['$resource',
        function($resource){
            return $resource('/', {
               contactUsId: '@_id'
            });
        }])
    .controller('ContactUsController', ['$scope', '$location', 'ContactUs',
    function($scope, $location, ContactUs){
        $scope.create = function(){
            var contactUs = new ContactUs({
                name: this.name,
                email: this.email,
                subject: this.subject,
                message: this.message
            });
            contactUs.$save(function(response){
                $location.path('/thankyou');
                $scope.name = '';
                $scope.email = '';
                $scope.subject = '';
                $scope.message = '';
            }, function(errorResponse){
                $scope.error = errorResponse.data.message;
            });
        };
    }]);


