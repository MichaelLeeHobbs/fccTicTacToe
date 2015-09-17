/*global angular, console*/
angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$timeout', 'ticTacToeAI', function ($scope, $timeout, cpuAI) {
        'use strict';
        console.log('view 1 ctrler');
        $scope.resultstyle = "none";
        $scope.gameresults = "";
        var playerPiece = 'x',
            cpuPiece = 'o',
            lastPlayer = '',
            moves = 0,
            grid = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];


        var checkForWin = function () {
            // rows
            console.log('checkcing rows for win');
            for (var i = 0; i < 3; i++) {
                if (grid[i][0] !== '' && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
                    return true;
                }
            }
            // column
            console.log('checking columns for win');
            for (i = 0; i < 3; i++) {
                if (grid[0][i] !== '' && grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]) {
                    return true;
                }
            }
            // diagonal
            console.log('checking rows for diagonal');
            if (grid[0][0] !== '' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
                return true;
            }
            if (grid[0][2] !== '' && grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
                return true;
            }
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
            moves = 0;


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
            var cpuMove = cpuAI.calculateMove(cpuPiece, playerPiece, grid);
            grid[cpuMove[0]][cpuMove[1]] = cpuPiece;
            $scope.grid = grid;
            moves++;

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

            // show results
            showResults(lastPlayer + ' wins!');

            // pause before init that way player sees x or o drawn before board is cleared
            $timeout(hideResults, 1000);
            state = init;
            $timeout(state, 1000);

        };
        var showResults = function (result) {
            console.log('results: ' + result);
            $scope.gameresults = result;
            $scope.resultstyle = "block";
            console.log('show end');
        };
        var hideResults = function () {
            console.log('hide');
            $scope.resultstyle = "none";
            console.log('hide end');
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
            if (grid[x][y] === '') {
                if (state === playerTurn) {
                    grid[x][y] = playerPiece;
                    $scope.grid = grid;
                    moves++;
                    state();
                }
            }
        };


        // init the game
        init();
    }]);
