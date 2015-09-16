'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$timeout', function ($scope, $timeout) {
        var player = 'x';
        var cpu = 'o';
        var lastPlayer = '';
        var moves = 0;

        var grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];


        var checkForWin = function (){
            // rows
            for (var i = 0; i < 3; i++) {
                if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]){
                    return true;
                }
            }
            // column
            for (i = 0; i < 3; i++) {
                if (grid[0][i] !== '' && grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]){
                    return true;
                }
            }
            // diagonal
            if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {return true;}
            if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {return true;}
            return false;
        };

        // states
        var init = function () {
            grid = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            lastPlayer = '';
            $scope.grid = grid;
            state = playerTurn;


        };
        var playerTurn = function () {
            lastPlayer = 'PLAYER';
            if (checkForWin()) {
                state = win;
            } else if (moves === 9) {
                state = draw;
            } else {
                state = cpuTurn;
            }
            state();
        };
        var cpuTurn = function () {
            lastPlayer = 'CPU';
            if (checkForWin()) {
                state = win;
            } else if (moves === 9) {
                state = draw;
            } else {
                state = playerTurn;
                return;
            }
            state();
        };
        var win = function () {

            // do something
            console.log(lastPlayer + ' wins!');

            state = init;

            // pause before init that way player sees x or o drawn before board is cleared
            $timeout(state,1000);

        };
        var draw = function () {
            // do something

            state = init;
            state();

        };
        var state = init;

        $scope.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        $scope.cellClick = function (x, y) {
            if (state === playerTurn) {
                if (grid[x][y] === '') {
                    grid[x][y] = player;
                    $scope.grid = grid;
                    moves++;
                }
                state();
            }
        };

        // init the game
        init();
    }]);