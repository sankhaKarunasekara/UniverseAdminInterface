// the url with "/" prefix is relative to the domain, without the "/" prefix it will be relative to the main ("index.html") page or base url (if you use location in the html5 mode).
//you can access the $scope from html
angular.module("universe.admin.littleBirds").directive("littleBirds", [
	function() {
		return {
			templateUrl: "universe.admin.littleBirds/view.littleBirds.html"
		};
	}
]);
