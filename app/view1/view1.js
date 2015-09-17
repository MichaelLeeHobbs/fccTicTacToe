/*global angular, console*/
angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$timeout', 'ticTacToeGame', function ($scope, $timeout, game) {
        'use strict';
        console.log('view 1 ctrler');

        var playerPiece = 'o',
            cpuPiece = 'x';
        $scope.resultstyle = "none";
        $scope.choosestyle = 'block';

        $scope.choose = function (piece) {
            playerPiece = piece;
            if (piece === 'o') {
                cpuPiece = 'x';
            } else {
                cpuPiece = 'o';
            }
            game.start(playerPiece, cpuPiece);
            $scope.cellClick = input;
            $scope.choosestyle = 'none';
        };

        var input = function (x, y) {
            game.playerMove(x, y);
            $scope.grid = game.getGrid();
            $scope.gameresults = game.getResult();
            if ($scope.gameresults !== undefined) {
                gameDone();
            }
        };

        var gameDone = function () {
            // show results
            showResults();

            // pause before restart that way player sees x or o drawn before board is cleared
            $timeout(hideResults, 1000);
            $timeout(restart, 1000);
        };
        // auto restart
        var restart = function () {
            game.start(playerPiece, cpuPiece);
            $scope.grid = game.getGrid();
        };
        var showResults = function () {
            console.log('results: ' + $scope.result);
            $scope.resultstyle = "block";
            console.log('show end');
        };
        var hideResults = function () {
            console.log('hide');
            $scope.resultstyle = "none";
            console.log('hide end');
        };

    }]);
