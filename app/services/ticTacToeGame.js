/*global angular, console*/
// http://stackoverflow.com/questions/125557/what-algorithm-for-a-tic-tac-toe-game-can-i-use-to-determine-the-best-move-for

angular.module('myApp.services')
    .factory('ticTacToeGame', ['ticTacToeAI', function (cpuAI) {
        'use strict';

        var state,
            playerPiece,
            cpuPiece,
            lastPlayer = '',
            moves = 0,
            result,
            grid = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];

        var game = {
            start: function (pPiece, cPiece) {
                playerPiece = pPiece;
                cpuPiece = cPiece;
                state = init;
                state(playerPiece, cpuPiece);
            },
            stop: function () {
                state = undefined;
            },
            playerMove: function (x, y) {
                // return grid
                if (grid[x][y] === '') {
                    if (state === playerTurn) {
                        grid[x][y] = playerPiece;
                        moves++;
                        state();
                    }
                }
            },
            getGrid: function () {
                return grid;
            },
            getResult: function () {
                return result;
            }
        };

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
        var init = function (playerPiece, cpuPiece) {
            grid = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            lastPlayer = '';
            state = playerTurn;
            moves = 0;
            result = undefined;

            return grid;
        };
        var playerTurn = function () {
            lastPlayer = 'PLAYER';
            if (checkForWin()) {
                result = lastPlayer + ' wins!';
                state = done;
            } else if (moves === 9) {
                result = 'Draw.';
                state = done;
            } else {
                state = cpuTurn;
            }
            state();
        };
        var cpuTurn = function () {
            console.log('cpuAI');
            var cpuMove = cpuAI.calculateMove(cpuPiece, playerPiece, grid);
            grid[cpuMove[0]][cpuMove[1]] = cpuPiece;
            moves++;
            lastPlayer = 'CPU';
            if (checkForWin()) {
                result = lastPlayer + ' wins!';
                state = done;
            } else if (moves === 9) {
                result = 'Draw.';
                state = done;
            } else {
                state = playerTurn;
                return;
            }
            state();
        };
        var done = function () {

        };

    return game;
    }]);