var app = angular.module('MySolverApp',[]);

app.controller("MainController", function($scope){
  $scope.matrix = [
  		[1,1,1,3],
		[1,2,2,3],	
		[3,3,1,7]
    ];

	$scope.solution = function() {
    	return new Solver($scope.matrix).solve()
	}  

	$scope.deviation = function() {
		return new Solver($scope.matrix).deviation()
	}
});