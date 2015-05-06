'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.router']);

app.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('contact_us', {
            url: '/',
            template: '<ui-view/>'
        }).
        state('thankyou', {
            url: '/thankyou',
            template: '<div class="thankyou text-center" ui-view>Thank you. Our team will contact you within next 48hrs</div>'
        });
    }
]);

app.factory('ContactUs', ['$resource',
    function($resource) {
        //return $resource('/thankyou', null, {});
        return $resource('/', {
            contactUsId: '@_id'
        });
    }
]);

app.controller('ContactUsController', ['$scope', '$location', 'ContactUs', '$state',
    function($scope, $location, ContactUs, $state) {

        $scope.create = function(form) {

            var contactUs = new ContactUs({
                name: this.name,
                email: this.email,
                subject: this.subject,
                message: this.message
            });

            contactUs.$save(function(response) {
                $scope.contactUsForm.$setPristine();
                $scope.contactUsForm.$setUntouched();

                $scope.name = null;
                $scope.email = null;
                $scope.subject = null;
                $scope.message = null;

                $state.go('thankyou');

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
    }
]);
