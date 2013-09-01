angular.module("blog", [])
	.config(["$routeProvider", function ($routeProvider) {
	    $routeProvider
			.when("/", { templateUrl: "scripts/partials/all-posts.html", controller: PostsController })
			.when("/category/:CategoryID/posts", { templateUrl: "scripts/partials/posts-by-category.html", controller: CatController })
			.otherwise({ redirectTo: "/" });
	}]);