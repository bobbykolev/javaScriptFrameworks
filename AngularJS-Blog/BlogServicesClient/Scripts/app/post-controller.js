function PostsController($scope, $http) {

    var categoryID = 0;

    $scope.newPost = {
        title: "",
        content: "",
        categoryName: ""
    };

    $http.get("/api/post")
		.success(function (posts) {
		    $scope.posts = posts;
		    $scope.categories = _.uniq(_.pluck(posts, "categoryName"));
		    $scope.selectedCategory = $scope.categories[categoryID];
		});

    $scope.addPost = function () {

        var data = {
        title: $scope.newPost.title,
        content: $scope.newPost.content,
        categoryName: $scope.selectedCategory
        };

        $http.post("/api/post", JSON.stringify(data));

        $scope.newPost = {
            title: "",
            content: "",
            categoryName: ""
        };
    }
}

function CatController($scope, $http, $routeParams) {

    var categoryID = $routeParams ? $routeParams.CategoryID : 0;

    $http.get("/api/post")
		.success(function (posts) {
		    $scope.posts = posts;
		    $scope.categories = _.uniq(_.pluck(posts, "categoryName"));
		    $scope.selectedCategory = $scope.categories[categoryID];
		});
}
