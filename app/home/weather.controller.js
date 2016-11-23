(function() {
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$http', 'toastr'];

    function WeatherController($http, toastr) {
        var vm = this
        vm.OpenWeatherMapApi = OpenWeatherMapApi;

        vm.results = []

        ////////////////////

        function OpenWeatherMapApi(city) {
            $http
                .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=b003ba6f39200e4413be30933de53284')
                .then(function(response) {
                    toastr.success('Here is your weather!');
                    vm.data = response.data

                    vm.nowDate = new Date(new Date().getTime()).toLocaleDateString();
                    vm.nowTime = new Date(new Date().getTime()).toLocaleTimeString();
                    vm.results.push({ name: vm.data.name, date: vm.nowDate, time: vm.nowTime });
                })
                .catch(function(error) {
                    toastr.error('Oops! We could not get the weather. Please try again.');
                });
        };

    }


})();
