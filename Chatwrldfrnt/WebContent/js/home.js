var chatworld=angular.module("chatworld",['ngRoute']);
chatworld.config(function($routeProvider){
	$routeProvider
					
	/*.when('/', 
			{ 
		templateUrl:"index.html"
	    })*/
					 
	
			.when("/login",
					
			{
				
		templateUrl:"partials/login.html",
		controller:"loginController"
			
			})
			.when("/userHome",
					
			{
				
		templateUrl:"partials/userHome.html",
		controller:"userHomeController"
			
			})
			
	.when("/logout",
			{
		templateUrl:"partials/logout.html",
		controller:"logoutController"
		
	})
	.when("/userjobs",
			{
		templateUrl:"partials/userjobs.html",
		controller:"userJobsController"
		
	})
	
	.when("/userforum",
			{
		templateUrl:"partials/userforum.html",
		controller:"userForumController"
		
	})
	.when("/blog",
			{
		templateUrl:"partials/blog1.html",
		controller:"blogController"
		
	})
	.when("/allblogs",
			{
		templateUrl:"partials/allblogs.html",
		controller:"allblogsController"
		
	})
	.when("/register",
	{
		templateUrl:"partials/register.html",
		controller:'registerController'
	})
	.when("/adminblog",
			{
		templateUrl:"partials/adminblog.html",
		controller:"adminBlogController"
		
	})
	.when("/adminforum",
			{
		templateUrl:"partials/adminforum.html",
		controller:"adminForumController"
		
	})
	.when("/job",
	{
		templateUrl:"partials/jobs.html",
		controller:"adminJobsController"
	});
});
chatworld.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

chatworld.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file,uploadUrl,name,password,mobile){
       var fd = new FormData();
       fd.append('file', file);
       fd.append('name',name);
       fd.append('password',password);
       fd.append('mobile',mobile);
       
    console.log("fd:"+fd)
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
    	   $scope.message="registered! you can login now!!";
    	    $scope.name="";
    	    $scope.password="";
    	   
       })
    
       .error(function(){
       });
    }
 }]);
chatworld.controller('registerController', ['$scope', 'fileUpload', function($scope,fileUpload){
    $scope.register = function(){
       var file = $scope.myFile;
       var name=$scope.name;
       var password=$scope.password;
       var mobile=$scope.mobile;
       
       console.log("name",name);
       console.log('file is ' );
       console.dir(file);
       var uploadUrl = "http://localhost:8081/Chatworld/fileUpload";
       fileUpload.uploadFileToUrl(file,uploadUrl,name,password,mobile);
    };
 }]);


		
		chatworld.controller("JobsController",function($scope,$http)
				{
			console.log("in Jobs controller");
			$scope.addJ=function()
			{
				var jobs={
						job_name:$scope.job_name,
						job_role:$scope.job_role,
						job_requirements:$scope.job_requirements,
						job_description:$scope.job_description
				};
				var res=$http.post("http://localhost:8081/Chatworld/addJobs",jobs);
				res.success(function(data, status, headers, config)
						{
					console.log("status:"+status);
						});
			}
				});
				chatworld.controller("loginController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)
						{
					console.log("in login controller");
					$scope.login=function()
					{
						var logi={
							name:$scope.name,
							password:$scope.password
							
					} 
					$http.post("http://localhost:8081/Chatworld/authenticate",logi).then(function(response)
							{
						console.log("result data:"+response.data);
					 var r=response.data.toString();
					 console.log("response:"+r);
				     
						if(r==1)
							{
							$rootScope.userforum=true;
							$rootScope.userjobs=true;
							$rootScope.adminblog=false;
							$rootScope.adminforum=false;
							$rootScope.register=false;
							$rootScope.home=false;
							$rootScope.addjobs=false;
							$rootScope.login=false;
							$rootScope.jobs=false;
							$rootScope.blogs=true;
							$rootScope.allblogs=true;
							$rootScope.logout=true;
							
							console.log('logout:'+$rootScope.logout);
							console.log("logged out:"+response.data);
							$rootScope.uname=$scope.name;
							$rootScope.id=$scope.id;
							console.log("uname:"+$rootScope.uname);
							$location.path('/userHome');
							}
						if(r==0)
							{
							$scope.name="";
							$scope.password="";
							$scope.message="username/password incorrect";
							$location.path('/login');
							}
						if(r==2)
						{
							$rootScope.home=false;
							$rootScope.login=false;
							$rootScope.register=false;
							$rootScope.jobs=true;
							$rootScope.adminblog=true;
							$rootScope.adminforum=true;
							$rootScope.blogs=false;
							$rootScope.logout=true;
							$rootScope.blogs=false;
							$rootScope.allblogs=false;
							$rootScope.userforum=false;
							$rootScope.userjobs=false;
						$location.path('/adminHome');
						}
							}	
				 ); 
							 }
						}]);
						
				chatworld.controller("blogController",function($scope,$http,$rootScope)	
						{	
					$rootScope.userforum=true;
					$rootScope.userjobs=true;
					$rootScope.adminblog=false;
					$rootScope.adminforum=false;
					$rootScope.register=false;
					$rootScope.home=false;
					$rootScope.addjobs=false;
					$rootScope.allblogs=true;
					$rootScope.login=false;
					$rootScope.jobs=false;
					$rootScope.blogs=true;
					$rootScope.logout=true;
					
					console.log(" in blog controller");
					console.log("name in allblogs:"+$rootScope.uname)
					$http.get("http://localhost:8081/Chatworld/viewMyBlogs/"+$rootScope.uname)
							    .then(function (response) {
							    	
							    	$scope.blogs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							 $scope.newBlog={};
								console.log("In Controller");
								$scope.addBlog=function(newBlog)
								{
									var dataObj = {
											title:$scope.title,
											description:$scope.description,
											category:$scope.category,
											postedby:$rootScope.uname
							 		};
									console.log("title:"+dataObj);
									 var res = $http.post('http://localhost:8081/Chatworld/addBlog',dataObj);
									 $http.get("http://localhost:8081/Chatworld/viewMyBlogs/"+$rootScope.uname)
								 	    .then(function (response) {$scope.blogs = response.data;});
								 		res.success(function(data, status, headers, config) {
								 			$scope.message = data;
								 			console.log("status:"+status);
								 		});
								 		 
								};
				$scope.editBlog=function(blog)
				{
					console.log("inside editblog");
					console.log("blog:"+blog);
					$scope.blogedit=blog;
				}
				$scope.saveEdit=function()
				{
					console.log("in saveEdit");
					var edit=
						{
							blog_id:$scope.blogedit.blog_id,
							category:$scope.blogedit.category,
							title:$scope.blogedit.title,
							description:$scope.blogedit.description
						}
					$http.put("http://localhost:8081/Chatworld/updateBlog",edit);
					$http.get("http://localhost:8081/Chatworld/viewMyBlogs/"+$rootScope.uname)
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.deleteBlog=function(blogedit)
				{
					var del=
						{
					blog_id:$scope.blogedit.blog_id
						}
				$http.post("http://localhost:8081/Chatworld/deleteBlog",del);
					$http.get("http://localhost:8081/Chatworld/viewMyBlogs/"+$rootScope.uname)
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
						});		
				chatworld.controller("adminBlogController",function($scope,$http,$rootScope)	
						{	
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.home=false;
					$rootScope.jobs=true;
					$rootScope.adminblog=true;
					$rootScope.adminforum=true;
					
					console.log(" in adminblog controller");
					
							 $http.get("http://localhost:8081/Chatworld/viewBlogs")
							    .then(function (response) {
							    	
							    	$scope.blogs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							
				$scope.appdisapp=function(adminblog)
				{
					console.log("inside appdisappblog");
					console.log("adminblog:"+adminblog);
					$scope.blogstatus=adminblog;
					
				}
				$scope.approveBlog=function()
				{
					console.log("postedby:"+$scope.blogstatus.postedby);
					console.log("in approveblog");
					var edit=
						{
							blog_id:$scope.blogstatus.blog_id,
							category:$scope.blogstatus.category,
							title:$scope.blogstatus.title,
							description:$scope.blogstatus.description,
							postedby:$scope.blogstatus.postedby,
							status:true
						}
					
					$http.put("http://localhost:8081/Chatworld/updateBlog",edit);
					 $http.get("http://localhost:8081/Chatworld/viewBlogs")
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.disapproveBlog=function()
				{
					console.log("postedby:"+$scope.blogstatus.postedby);
					console.log("in disapproveblog");
					var edit=
						{
							blog_id:$scope.blogstatus.blog_id,
							category:$scope.blogstatus.category,
							title:$scope.blogstatus.title,
							description:$scope.blogstatus.description,
							postedby:$scope.blogstatus.postedby,
							status:false
						}
					$http.put("http://localhost:8081/Chatworld/updateBlog",edit);
					 $http.get("http://localhost:8081/Chatworld/viewBlogs")
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				
						});		
				chatworld.controller("adminJobsController",function($scope,$http,$rootScope)	
						{	
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.adminforum=true;
					$rootScope.adminblog=true;
					$rootScope.blogs=false;
					$rootScope.userforum=false;
					$rootScope.logout=true;
					$rootScope.jobs=true;
					
					console.log(" in jobs controller");
					
							 $http.get("http://localhost:8081/Chatworld/viewJobs")
							    .then(function (response) {
							    	
							    	$scope.jobs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							 $scope.newJobs={};
								console.log("In Controller");
								$scope.addJobs=function(newJobs)
								{
									var dataObj = {
											job_name:$scope.job_name,
											job_role:$scope.job_role,
											job_requirements:$scope.job_requirements,
											job_description:$scope.job_description
							 		};
									console.log("title:"+dataObj);
									 var res = $http.post('http://localhost:8081/Chatworld/addJobs',dataObj);
									 $http.get("http://localhost:8081/Chatworld/viewJobs")
								 	    .then(function (response) {$scope.jobs = response.data;});
								 		res.success(function(data, status, headers, config) {
								 			$scope.message = data;
								 			console.log("status:"+status);
								 		});
								 		 
								};
				$scope.editJob=function(job)
				{
					console.log("inside editjob");
					console.log("job:"+job);
					$scope.jobedit=job;
				}
				$scope.saveEdit=function()
				{
					console.log("in saveEdit");
					var edit=
						{
							job_id:$scope.jobedit.job_id,
							job_name:$scope.jobedit.job_name,
							job_role:$scope.jobedit.job_role,
							job_requirements:$scope.jobedit.job_requirements,
							job_description:$scope.jobedit.job_description
						}
					$http.put("http://localhost:8081/Chatworld/updateJob",edit);
					 $http.get("http://localhost:8081/Chatworld/viewJobs")
					    .then(function (response) {
					    	
					    	$scope.jobs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.deleteJob=function(jobedit)
				{
					console.log("in deletejob");
					var del=
						{
					job_id:$scope.jobedit.job_id
						}
				$http.post("http://localhost:8081/Chatworld/deleteJob",del);
					 $http.get("http://localhost:8081/Chatworld/viewJobs")
					    .then(function (response) {
					    	
					    	$scope.jobs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
						});	
				chatworld.controller('logoutController',function($scope,$rootScope)		
						{
							console.log("logout controller called");
							$rootScope.login=true;
							$rootScope.register=true;
							$rootScope.userforum=false;
							$rootScope.adminforum=false;
							$rootScope.home=true;
							$rootScope.blogs=false;
							
							$rootScope.jobs=false;
							$rootScope.logout=false;
							$rootScope.userjobs=false;
							$rootScope.adminblog=false;
							
						}
						);
				chatworld.controller("userJobsController",function($scope,$http,$rootScope)	
						{	
					$rootScope.userjobs=true;
					$rootScope.userforum=true;
					$rootScope.adminblog=false;
					$rootScope.adminforum=false;
					$rootScope.register=false;
					$rootScope.home=false;
					$rootScope.addjobs=false;
					$rootScope.login=false;
					$rootScope.jobs=false;
					$rootScope.blogs=true;
					$rootScope.logout=true;
					
					console.log(" in userjobs controller");
					
							 $http.get("http://localhost:8081/Chatworld/viewJobs")
							    .then(function (response) {
							    	
							    	$scope.jobs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
						});	
				chatworld.controller("adminForumController",function($scope,$http,$rootScope)	
						{	
					$rootScope.login=false;
					$rootScope.register=false;
					$rootScope.userforum=false;
					$rootScope.home=false;
					$rootScope.userjobs=false;
					$rootScope.adminforum=true;
					
					
					console.log(" in adminforum controller");
					
							 $http.get("http://localhost:8081/Chatworld/viewForums")
							    .then(function (response) {
							    	
							    	$scope.forums = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							
				$scope.appdisapp=function(adminforum)
				{
				
					console.log("inside appdisappforum");
					console.log("adminforum:"+adminforum);
					$scope.forumstatus=adminforum;
				}
				$scope.approveForum=function(adminforum)
				{
					
					console.log("in approveforum");
					var edit=
						{
							forum_id:$scope.forumstatus.forum_id,
							category:$scope.forumstatus.category,
							topic:$scope.forumstatus.topic,
							question:$scope.forumstatus.question,
							answer:$scope.forumstatus.answer,
							status:true
						}
					$http.put("http://localhost:8081/Chatworld/updateForum",edit);
					 $http.get("http://localhost:8081/Chatworld/viewForums")
					    .then(function (response) {
					    	
					    	$scope.forums = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.disapproveForum=function()
				{
					console.log("in disapproveforum");
					var edit=
						{
							forum_id:$scope.forumstatus.forum_id,
							category:$scope.forumstatus.category,
							topic:$scope.forumstatus.topic,
							question:$scope.forumstatus.question,
							answer:$scope.forumstatus.answer,
							status:false
						}
					$http.put("http://localhost:8081/Chatworld/updateForum",edit);
					 $http.get("http://localhost:8081/Chatworld/viewForums")
					    .then(function (response) {
					    	
					    	$scope.forums = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				
						});	
				chatworld.controller("userForumController",function($scope,$http,$rootScope)	
						{	
					$rootScope.userforum=true;
					$rootScope.userjobs=true;
					$rootScope.blogs=true;
					$rootScope.adminforum=false;
					
					$rootScope.register=false;
					$rootScope.home=false;
					
					$rootScope.login=false;
					$rootScope.jobs=false;
					$rootScope.forums=true;
					$rootScope.logout=true;
					
					console.log(" in forum controller");
					
							 $http.get("http://localhost:8081/Chatworld/viewForum")
							    .then(function (response) {
							    	
							    	$scope.forums = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							 $scope.newForum={};
								console.log("In Controller");
								$scope.addForum=function(newForum)
								{
									var dataObj = {
											category:$scope.category,
											topic:$scope.topic,
											question:$scope.question,
											answer:$scope.answer,
											
							 		};
									console.log("title:"+dataObj);
									 var res = $http.post('http://localhost:8081/Chatworld/addForum',dataObj);
									 $http.get("http://localhost:8081/Chatworld/viewForum")
								 	    .then(function (response) {$scope.forums = response.data;});
								 		res.success(function(data, status, headers, config) {
								 			$scope.message = data;
								 			console.log("status:"+status);
								 		});
								 		 
								};
				$scope.editForum=function(forum)
				{
					console.log("inside editforum");
					console.log("forum:"+forum);
					$scope.forumedit=forum;
				}
				$scope.saveEdit=function()
				{
					console.log("in saveEdit");
					var edit=
				
					{
							forum_id:$scope.forumedit.forum_id,
							category:$scope.forumedit.category,
							topic:$scope.forumedit.topic,
							question:$scope.forumedit.question,
							answer:$scope.forumedit.answer
						}
					$http.put("http://localhost:8081/Chatworld/updateForum",edit);
					 $http.get("http://localhost:8081/Chatworld/viewForum")
					    .then(function (response) {
					    	
					    	$scope.forums = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.deleteForum=function(forumedit)
				{
					var del=
						{ 
					forum_id:$scope.forumedit.forum_id
						}
				$http.post("http://localhost:8081/Chatworld/deleteForum",del);
					 $http.get("http://localhost:8081/Chatworld/viewForums")
					    .then(function (response) {
					    	$scope.forums = response.data;
					    	console.log("data:"+response.data);
					    });
				}
						});	
				chatworld.controller("allblogsController",function($scope,$http,$rootScope)	
						{	
					$rootScope.userforum=false;
					$rootScope.userjobs=true;
					$rootScope.adminblog=false;
					$rootScope.adminforum=false;
					$rootScope.register=false;
					$rootScope.home=false;
					$rootScope.addjobs=false;
					$rootScope.login=false;
					$rootScope.jobs=false;
					$rootScope.blogs=true;
					$rootScope.userforum=true;
					$rootScope.logout=true;
					
					
					console.log("username in allblog controller:"+$rootScope.uname);
							 $http.get("http://localhost:8081/Chatworld/viewBlogs")
							    .then(function (response) {
							    	
							    	$scope.blogs = response.data;
							    	
							    	console.log("data:"+response.data);
							    });
							 $scope.likeBlog=function(allblogs)
							 { 
								 $scope.allblogslike=allblogs;
								 console.log("category:"+$scope.allblogslike.category);
						       likes=$rootScope.likes+1;
						       console.log("likes:",likes);
						       $rootScope.likes=likes;
						       console.log("rootscope likes:"+$rootScope.likes);
						   	console.log("category:"+$scope.allblogslike.category);
						   	
						       var like=
									{
								blog_id:$scope.allblogslike.blog_id,
								category:$scope.allblogslike.category,
								title:$scope.allblogslike.title,
								description:$scope.allblogslike.description,
								postedby:$scope.allblogslike.postedby,
								status:$scope.allblogslike.status,
								likes:$rootScope.likes
									}
								console.log("data in like:"+like);
								console.log("postedby:"+$scope.allblogs.postedby);
								 $http.put('http://localhost:8081/Chatworld/updateBlog',like);
							 }
						});
				chatworld.controller("userHomeController",function($scope,$http,$rootScope)	
						{	
					console.log("in userHome controller");
					$scope.findfriends=function()
					{
					console.log(" in findfriends function");
					console.log("name in  findfriends:"+$rootScope.uname);
							 $http.get("http://localhost:8081/Chatworld/findFriends/"+$rootScope.uname)
							    .then(function (response) {
							    	
							    	$scope.friends = response.data;
							    	
							    	console.log("data:"+response.data);
							    
							    });}
						});