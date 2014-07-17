// var assert = require("assert");

// var ResponseObject = function(){
// 	this.render = function(view, options){
// 		this.view = view;
// 		this.options = options;
// 	};
// }

// describe('User controller specs:', function(){
	
// 	describe('When requesting the index,', function(){
		
// 		var controller = require('../../../controllers/admin/userscontroller.js');
// 		var responseObject = new ResponseObject();

// 		controller.index(null, responseObject);

// 		it('It should render the index with the standard layout', function(){
// 			assert.equal(responseObject.view, 'admin/users/index');
// 			assert.equal(responseObject.options.layout, 'admin/shared/layout');
// 		});
// 	});
// });