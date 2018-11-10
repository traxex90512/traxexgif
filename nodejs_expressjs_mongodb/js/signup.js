
var myApp = angular.module("myApp", []);

var file = null;

myApp.controller("myController", function($scope, $http) { 
	$scope.username = "";
	$scope.password = "";
	$scope.email = "";

	var upfile = document.getElementById('id_upFile');
	var frm = document.getElementById('id_form');
	
	upfile.addEventListener('change', function () {
		file = this.files[0];
	});

	$scope.onRegister = function() {
		if($scope.username == "") {
			$scope.msg = "Please insert your username!";
			return;
		}
		if($scope.email == "") {
			$scope.msg = "Please insert your e_mail!";
			return;
		}
		var url = "register?email=" + $scope.email 
				+ "&username=" + $scope.username
				+ "&password=" + $scope.password;
		$http.get(url).success( function(response) { 
			$scope.msg = response.msg;
			if(response.flag == "success") {
				if(file != null) {
					url = 'fileUpload?email=' + $scope.email;
					var xhr = new XMLHttpRequest();
					xhr.file = file;
					xhr.open('post', url, true);
					xhr.setRequestHeader("x-uploadedfilename", file.fileName || file.name);
					xhr.send(file);
					file = null;
				}
				window.location = "/ahaha";
			}
		}); 
	}
});
