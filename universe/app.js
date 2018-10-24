angular
	.module("app", [
		"ngRoute",
		"ngAria",
		"ngAnimate",
		"ngMaterial",
		"ngMessages",
		"md.data.table",
		"angular-loading-bar",
		"universe.admin.littleBirds"
	])
	.config(
		[
			"$mdThemingProvider",
			function($mdThemingProvider) {
				"use strict";
				$mdThemingProvider.theme("default").primaryPalette("deep-purple");
			}
		],
		[
			"cfpLoadingBarProvider",
			function(cfpLoadingBarProvider) {
				cfpLoadingBarProvider.includeBar = true;
			}
		]
	)
	.controller("nutritionController", [
		"$mdEditDialog",
		"$q",
		"$scope",
		"$timeout",
		"$mdDialog",
		"littleBirdsService",
		function(
			$mdEditDialog,
			$q,
			$scope,
			$timeout,
			$mdDialog,
			littleBirdsService
		) {
			$scope.littleBirds = [];
			$scope.init = function() {
				$scope.getAllItems();
			};

			$scope.selected = [];
			$scope.limitOptions = [5, 10, 15];

			$scope.options = {
				rowSelection: true,
				multiSelect: true,
				autoSelect: true,
				decapitate: false,
				largeEditDialog: false,
				boundaryLinks: false,
				limitSelect: true,
				pageSelect: true
			};

			$scope.query = {
				order: "label",
				limit: 5,
				page: 1
			};

			$scope.toggleLimitOptions = function() {
				$scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
			};

			$scope.getTypes = function() {
				return ["Candy", "Ice cream", "Other", "Pastry"];
			};

			$scope.refreshItems = function() {
				$scope.getAllItems();
			};

			$scope.logItem = function(item) {
				console.log(item.name, "was selected");
			};

			$scope.logOrder = function(order) {
				console.log("order: ", order);
			};

			$scope.logPagination = function(page, limit) {
				console.log("page: ", page);
				console.log("limit: ", limit);
			};

			$scope.getAllItems = async function() {
				try {
					var response = await littleBirdsService.getAll();
					$scope.littleBirds = response.data;
				} catch (error) {
					console.log(error);
				}
			};

			$scope.deleteItem = async function(id) {
				console.log(id);
				const response = await littleBirdsService.remove(id);
				console.log(response);
			};

			$scope.editItem = function() {};

			$scope.showAddItemDialog = function(ev) {
				$mdDialog
					.show({
						controller: DialogController,
						templateUrl: "/universe.admin.littleBirds/add.littleBird.html",
						parent: angular.element(document.body),
						targetEvent: ev,
						clickOutsideToClose: true
					})
					.then(
						function(answer) {
							$scope.refreshItems();
						},
						function() {
							$scope.status = "You cancelled the dialog.";
						}
					);
			};

			DialogController.$inject = ["$scope", "$mdDialog", "littleBirdsService"];

			function DialogController($scope, $mdDialog, littleBirdsService) {
				$scope.littleBird = {
					user_email: "sankhadlk@gmail.com",
					extract_method: "",
					label: "",
					url: ""
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.ok = function() {
					var url_data_object = $scope.littleBird;
					littleBirdsService.add(url_data_object);
					$mdDialog.hide();
				};
			}
		}
	]);
