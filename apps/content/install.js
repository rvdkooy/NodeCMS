var path = require('path');
var chalk = require('chalk');
global.__ROOTDIR = path.dirname( path.join(require.main.filename, '../'));

exports.start = function(){
	
	var MenusRepository = require('./server/lib/menusrepository');
 	var PagesRepository = require('./server/lib/contentpagesrepository');
	var Menu = require('./server/lib/menu');
	var ContentPage = require('./server/lib/contentpage');
 	var menusRepository = new MenusRepository();
 	var pagesRepository = new PagesRepository();

 	pagesRepository.find({}, function(pages){

	 	menusRepository.find({}, function(menus){
	 		if(pages.length ===0 && menus.length ===0){

	 			var menu = new Menu('default');
	 			menusRepository.add(menu, function(){
	 				console.log(chalk.green('Done creating a default menu'));
	 			});

	 			var contentPage = new ContentPage('home');
	 			pagesRepository.add(contentPage, function(){
	 				console.log(chalk.green('Done creating a default contentpage'));
	 			});
				
	 		}
	 	});
 	});
};