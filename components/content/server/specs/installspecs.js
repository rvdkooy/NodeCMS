var assert = require('assert');
var proxyquire = require('proxyquire').noCallThru();;
var path = require('path');

describe('Install specs:', function(){
	
	describe('When installing without any pages or menus,', function(){

		var pagesAdded = [];
		var menusAdded = [];
		
		var fsStub = { existsSync: function(){ return false; } };
		
		var menusRepositoryStub = function(){
			this.find = function(query, callback){
				return callback([]);
			},
			this.add = function(menu, callback){
				menusAdded.push(menu);
				callback(menu);
			}
		};

		var contentPagesRepositoryStub = function(){
			this.find = function(query, callback){
				return callback([]);
			},
			this.add = function(page, callback){
				pagesAdded.push(page);
				callback(page);
			}
		};
		
		var install = proxyquire('../../install', { 
			'fs': fsStub,
			'./server/lib/menusrepository': menusRepositoryStub,
			'./server/lib/contentpagesrepository': contentPagesRepositoryStub }
		);

		install.start();
		proxyquire.callThru();

		it('It should create a new pages database with a default page', function(){
			assert.equal(pagesAdded.length, 1);
			assert.equal(pagesAdded[0].name, 'home')
		});

		it('It should create a new menus database with a default menu', function(){
			assert.equal(menusAdded.length, 1);
			assert.equal(menusAdded[0].name, 'default')
		});
	});
});