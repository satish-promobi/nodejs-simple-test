'use strict';

var app = angular.module('app', ['ngResource', 'ngRoute', 'ui.router']);

    app.config(['$stateProvider',
    function($stateProvider){
        $stateProvider.state('createContactUs',{
            url: '/',
            template: '<ui-view/>',
            abstract: true,
            templateUrl: 'index'
        }).
        state('thankyou', {
          url: '/thankyou',
          template: 'Thank you. Our team will contact you within next 48hrs',
          templateUrl: 'thankyou'
        });
    }]);

    app.factory('ContactUs', ['$resource',
        function($resource){
            //return $resource('/thankyou', null, {});
            return $resource('/', {
               contactUsId: '@_id'
            });
        }]);

    app.controller('ContactUsController', ['$scope', '$location', 'ContactUs', '$state',
        function($scope, $location, ContactUs, $state){
            $scope.create = function(){
                var contactUs = new ContactUs({
                    name: this.name,
                    email: this.email,
                    subject: this.subject,
                    message: this.message
                });
                contactUs.$save(function(response){


                   $state.go('thankyou');

                    $scope.name = '';
                    $scope.email = '';
                    $scope.subject = '';
                    $scope.message = '';

                }, function(errorResponse){
                    $scope.error = errorResponse.data.message;
                });

            };
    }]);


