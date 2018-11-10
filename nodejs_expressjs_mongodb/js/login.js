var myApp = angular.module("myApp", []);
var scope = null;

myApp.controller("myController", function($scope, $http) { 
	scope = $scope;
	$scope.msg = "";
	document.getElementById('id_email').value = "";
	document.getElementById('id_password').value = "";

	$scope.onLogin = function() { 
		var email = document.getElementById('id_email').value;
		var password = document.getElementById('id_password').value;
		if(email == "") {
			$scope.msg = "Please insert your E-mail!";
		}
		var url = "ahaha/login?email=" + email + "&password=" + password;
		$http.get(url).success( function(response) { 
			$scope.message = response.msg;
			if(response.flag == "failed")
				$scope.msg = response.msg;
			else {
				document.forms[0].action = "ahaha/main";
				document.forms[0].method = "post";
				document.forms[0].submit();
			}
		}); 
	}
});

function onSignup() {
	document.forms[0].action = "ahaha/signup";
	document.forms[0].method = "post";
	document.forms[0].submit();
}