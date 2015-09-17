/*global angular, console*/
// http://stackoverflow.com/questions/125557/what-algorithm-for-a-tic-tac-toe-game-can-i-use-to-determine-the-best-move-for

angular.module('myApp.services', [])
    .factory('ticTacToeAI', function () {

        'use strict';
        var ticTacToeAI = {
            twoInRow: function (grid, piece) {
                console.log('twoInRow');
                // scan for two in a row
                for (var i = 0; i < 3; i++) {
                    if (grid[i][0] === piece && grid[i][0] === grid[i][1] && grid[i][2] === '') {
                        return [i, 2];
                    }
                    if (grid[i][0] === piece && grid[i][0] === grid[i][2] && grid[i][1] === '') {
                        return [i, 1];
                    }
                    if (grid[i][1] === piece && grid[i][1] === grid[i][2] && grid[i][0] === '') {
                        return [i, 0];
                    }
                }

                // scan for two in a column
                for (var i = 0; i < 3; i++) {
                    if (grid[0][i] === piece && grid[0][i] === grid[1][i] && grid[2][i] === '') {
                        return [2, i];
                    }
                    if (grid[0][i] === piece && grid[0][i] === grid[2][i] && grid[1][i] === '') {
                        return [1, i];
                    }
                    if (grid[1][i] === piece && grid[1][i] === grid[2][i] && grid[0][i] === '') {
                        return [0, i];
                    }
                }

                // scan for two in diagonal
                if (grid[0][0] === piece && grid[0][0] === grid[1][1] && grid[2][2] === '') {
                    return [2, 2];
                }
                if (grid[0][0] === piece && grid[0][0] === grid[2][2] && grid[1][1] === '') {
                    return [1, 1];
                }
                if (grid[1][1] === piece && grid[1][1] === grid[2][2] && grid[0][0] === '') {
                    return [0, 0];
                }

                if (grid[0][2] === piece && grid[0][2] === grid[1][1] && grid[2][0] === '') {
                    return [2, 0];
                }
                if (grid[0][2] === piece && grid[0][2] === grid[2][0] && grid[1][1] === '') {
                    return [1, 1];
                }
                if (grid[1][1] === piece && grid[1][1] === grid[2][0] && grid[0][2] === '') {
                    return [0, 2];
                }

            },
            fork: function (grid, piece) {
                console.log('fork');
                //diag fork
                if (grid[0][0] === piece && grid[2][2] === piece && grid[0][2] === '') {
                    return [0, 2];
                }
                if (grid[0][0] === piece && grid[2][2] === piece && grid[2][0] === '') {
                    return [2, 0];
                }
                if (grid[0][2] === piece && grid[2][0] === piece && grid[0][0] === '') {
                    return [0, 0];
                }
                if (grid[0][2] === piece && grid[2][0] === piece && grid[0][0] === '') {
                    return [2, 2];
                }

                // row fork
                if (grid[0][0] === piece && grid[0][2] === piece && grid[2][0] === '') {
                    return [2, 0];
                }
                if (grid[0][0] === piece && grid[0][2] === piece && grid[2][2] === '') {
                    return [2, 2];
                }
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][0] === '') {
                    return [0, 0];
                }
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][2] === '') {
                    return [0, 2];
                }

                // column fork
                if (grid[0][0] === piece && grid[2][0] === piece && grid[2][0] === '') {
                    return [0, 2];
                }
                if (grid[0][0] === piece && grid[2][0] === piece && grid[2][2] === '') {
                    return [2, 2];
                }
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][0] === '') {
                    return [0, 0];
                }
                if (grid[2][0] === piece && grid[2][2] === piece && grid[2][0] === '') {
                    return [2, 0];
                }

            },
            blockFork: function (grid, piece) {
                console.log('block fork');
                //diag fork - if they are trying to diag fork us then we have the center
                if ((grid[0][0] === piece && grid[2][2] === piece) || (grid[0][2] === piece && grid[2][0] === piece)) {
                    if (grid[0][1] === '') {
                        return [0, 1];
                    }
                    if (grid[1][0] === '') {
                        return [1, 0];
                    }
                    if (grid[1][2] === '') {
                        return [1, 2];
                    }
                    if (grid[2][1] === '') {
                        return [2, 1];
                    }
                }
                // row / column fork will be handled by center and is only possible if center is open


            },
            center: function (grid) {
                console.log('center');
                if (grid[1][1] === '') {
                    return [1, 1];
                }
            },
            // if player has corner then play opposite corner
            opCorner: function (grid, playerPiece) {
                console.log('opCorner');
                if (grid[0][0] === playerPiece && grid[2][2] === '') {
                    return [2, 2];
                }
                if (grid[0][2] === playerPiece && grid[2][0] === '') {
                    return [2, 0];
                }
                if (grid[2][0] === playerPiece && grid[0][2] === '') {
                    return [0, 2];
                }
                if (grid[2][2] === playerPiece && grid[0][0] === '') {
                    return [0, 0];
                }
            },
            emptyCorner: function (grid) {
                console.log('emptyCorner');
                if (grid[0][0] === '') {
                    return [0, 0];
                }
                if (grid[0][2] === '') {
                    return [0, 2];
                }
                if (grid[2][0] === '') {
                    return [2, 0];
                }
                if (grid[2][2] === '') {
                    return [2, 2];
                }
            },
            emptySide: function (grid) {
                console.log('emptySide');
                if (grid[0][1] === '') {
                    return [0, 1];
                }
                if (grid[1][0] === '') {
                    return [1, 0];
                }
                if (grid[1][2] === '') {
                    return [1, 2];
                }
                if (grid[2][1] === '') {
                    return [2, 1];
                }
            }
        };

        return {
            calculateMove: function (cpuPiece, playerPiece, grid) {
                // win
                var move = ticTacToeAI.twoInRow(grid, cpuPiece);
                // block win
                if (move === undefined) {
                    move = ticTacToeAI.twoInRow(grid, playerPiece);
                }
                // fork
                if (move === undefined) {
                    move = ticTacToeAI.fork(grid, cpuPiece);
                }
                // block fork
                if (move === undefined) {
                    move = ticTacToeAI.blockFork(grid, playerPiece);
                }
                // center
                if (move === undefined) {
                    move = ticTacToeAI.center(grid);
                }
                // opposite corner
                if (move === undefined) {
                    move = ticTacToeAI.opCorner(grid, playerPiece);
                }
                // empty corner
                if (move === undefined) {
                    move = ticTacToeAI.emptyCorner(grid);
                }
                // empty side
                if (move === undefined) {
                    move = ticTacToeAI.emptySide(grid);
                }
                // if (move === undefined) then grid is in draw state

                return move;
            }
        };
    });