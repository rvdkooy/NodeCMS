describe('Menu specs:', function(){

	var assert = require('assert');
	
	var Menu = require('../lib/menu');
		
	it('It should use the name and children to create one', function(){

		var menu = new Menu('top', [{ name: 'child1' }]);

		assert.equal(menu.name, 'top');
		assert.equal(menu.children.length, 1);
	});

	it('It should use the name and create a list of empty children when needed', function(){

		var menu = new Menu('top');

		assert.equal(menu.name, 'top');
		assert.equal(menu.children.length, 0);
	});

	it('It should return the number of children of the menu when asked', function(){

		var children = [ 
			{ name: 'level1', children: 
				[{ name: 'level2', children: [] }] }]
		
		var menu = new Menu('top', children);

		assert.equal(menu.numberOfItems(), 2);
	});
});