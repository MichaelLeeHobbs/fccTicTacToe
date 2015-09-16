'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.resultstyle = "none";
        $scope.gameresults = "";
        var playerPiece = 'x';
        var cpuPiece = 'o';
        var lastPlayer = '';
        var moves = 0;

        var grid = [
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
            cpu.move(cpuPiece, playerPiece);

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
            if (state === playerTurn) {
                if (grid[x][y] === '') {
                    grid[x][y] = playerPiece;
                    $scope.grid = grid;
                    moves++;
                }
                state();
            }
        };

        var cpu = {
            move: function (cpuPiece, playerPiece) {
                // win
                var move = cpu.twoInRow(cpuPiece);
                // block win
                if (move === undefined) {
                    move = cpu.twoInRow(playerPiece);
                }
                // fork
                if (move === undefined) {
                    move = cpu.fork(cpuPiece);
                }
                // block fork
                if (move === undefined) {
                    move = cpu.blockFork(playerPiece);
                }
                // center
                if (move === undefined) {
                    move = cpu.center();
                }
                // opposite corner
                if (move === undefined) {
                    move = cpu.opCorner(playerPiece);
                }
                // empty corner
                if (move === undefined) {
                    move = cpu.emptyCorner();
                }
                // empty side
                if (move === undefined) {
                    move = cpu.emptySide();
                }
                if (move === undefined) {
                    // draw

                }
                grid[move[0]][move[1]] = cpuPiece;
                $scope.grid = grid;
                moves++;

            },
            twoInRow: function (piece) {
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
            fork: function (piece) {
                console.log('fork');
                //diag fork
                if (grid[0][0] === piece && grid[2][2] === piece && grid[0][2] === '') {return [0, 2];}
                if (grid[0][0] === piece && grid[2][2] === piece && grid[2][0] === '') {return [2, 0];}
                if (grid[0][2] === piece && grid[2][0] === piece && grid[0][0] === '') {return [0, 0];}
                if (grid[0][2] === piece && grid[2][0] === piece && grid[0][0] === '') {return [2, 2];}

                // row fork
                if (grid[0][0] === piece && grid[0][2] === piece && grid[2][0] === '') {return [2, 0];}
                if (grid[0][0] === piece && grid[0][2] === piece && grid[2][2] === '') {return [2, 2];}
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][0] === '') {return [0, 0];}
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][2] === '') {return [0, 2];}

                // column fork
                if (grid[0][0] === piece && grid[2][0] === piece && grid[2][0] === '') {return [0, 2];}
                if (grid[0][0] === piece && grid[2][0] === piece && grid[2][2] === '') {return [2, 2];}
                if (grid[2][0] === piece && grid[2][2] === piece && grid[0][0] === '') {return [0, 0];}
                if (grid[2][0] === piece && grid[2][2] === piece && grid[2][0] === '') {return [2, 0];}

            },
            blockFork: function (piece) {
                console.log('block fork');
                //diag fork - if they are trying to diag fork us then we have the center
                if (   (grid[0][0] === piece && grid[2][2] === piece)
                    || (grid[0][2] === piece && grid[2][0] === piece) ) {

                    if (grid[0][1] === '') {return [0,1];}
                    if (grid[1][0] === '') {return [1,0];}
                    if (grid[1][2] === '') {return [1,2];}
                    if (grid[2][1] === '') {return [2,1];}
                }
                // row / column fork will be handled by center and is only possible if center is open


            },
            center: function () {
                console.log('center');
                if (grid[1][1] === '') { return [1,1];}
            },
            // if player has corner then play opposite corner
            opCorner: function (playerPiece) {
                console.log('opCorner');
                if (grid[0][0] === playerPiece && grid[2][2] === '') { return [2,2];}
                if (grid[0][2] === playerPiece && grid[2][0] === '') { return [2,0];}
                if (grid[2][0] === playerPiece && grid[0][2] === '') { return [0,2];}
                if (grid[2][2] === playerPiece && grid[0][0] === '') { return [0,0];}
            },
            emptyCorner: function () {
                console.log('emptyCorner');
                if (grid[0][0] === '') { return [0,0];}
                if (grid[0][2] === '') { return [0,2];}
                if (grid[2][0] === '') { return [2,0];}
                if (grid[2][2] === '') { return [2,2];}
            },
            emptySide: function () {
                console.log('emptySide');
                if (grid[0][1] === '') { return [0,1];}
                if (grid[1][0] === '') { return [1,0];}
                if (grid[1][2] === '') { return [1,2];}
                if (grid[2][1] === '') { return [2,1];}
            }
        };


        // init the game
        init();
    }]);