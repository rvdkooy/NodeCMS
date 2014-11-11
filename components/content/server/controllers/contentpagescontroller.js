var _ = require('underscore');
var moment = require('moment');
var ContentPage = require('../lib/contentpage');

module.exports = function(contentpagesrepository, logger){

	this.findContentPage = function(req, res, next){
		
		var mainTemplate = 'frontend'; // This should come from some config setting
		
		if(req.url === '/'){
		// for now just render the default home page!!!
		res.render('components/'+ mainTemplate +'/server/views/home/index', { 
			layout: 'components/'+ mainTemplate +'/server/views/layout.ejs',
			model: { 
				name: 'home', 
				content: ''
			} }); 
		}
		else{
			contentpagesrepository.findByUrl( req.url, function(result){
				if(result){
					
					result.template = result.template || 'home';
					res.render('components/'+ mainTemplate +'/server/views/' + result.template.toLowerCase() + '/index', { 
						layout: 'components/'+ mainTemplate +'/server/views/layout.ejs',
						model: result }); 
				}
				else{
					next();
				}
			});
		}
	};

	this.listContentPages = function(req, res){
		res.render('components/content/server/views/contentpages/listcontentpages', { layout:false });
	};
	this.addContentPage = function(req, res){
		res.render('components/content/server/views/contentpages/addcontentpage', { layout:false });
	};
	this.editContentPage = function(req, res){
		res.render('components/content/server/views/contentpages/editcontentpage', { layout:false });
	};
	
	this.ApiContentPages = function(req, res){

		contentpagesrepository.find({}, function(results){
			res.json(results);
		});
	}

	this.ApiGetContentPage = function(req, res){

		contentpagesrepository.findOne( req.params.id, function(result){
			res.json(result);
		});
	}

	this.ApiAddContentPage = function(req, res){

		contentpagesrepository.findByUrl( req.body.url, function(result){

			if(!result){

				var page = new ContentPage(req.body.name,
					req.body.url, req.body.template)

				page.published = req.body.published,
				page.content = req.body.content,
				page.keywords = req.body.keywords,
				page.description = req.body.description,

				logger.info('Adding a new page with name: %s', page.name);

				contentpagesrepository.add(page, function(){
					res.status(200).send();
				}) ;
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The url of the page is already in use']
					})
					.send();
			}
		});
	}

	this.ApiUpdateContentPage = function(req, res){
		
		contentpagesrepository.findByUrl( req.body.url, function(result){

			if(!result || result._id === req.params.id){
				logger.info('Updating the page with id: %s', req.params.id);

				contentpagesrepository.update(
					{ _id: req.params.id },
					{ $set: {
						name: req.body.name,
						url: req.body.url,
						content: req.body.content,
						template: req.body.template,
						published: req.body.published,
						keywords: req.body.keywords,
						description: req.body.description,
						changed: new Date()
						}
					},
					function(){
						res.status(200).send();
					});
			}
			else{
				res.status(400)
					.json( {
						'RuleViolationExceptions': ['The url of the page is already in use']
					})
					.send();
			}
		});
	}

	this.ApiDeleteContentPage = function(req, res){
				
		logger.info('Removing the page with id: %s', req.params.id);
		contentpagesrepository.remove({ _id: req.params.id }, { multi: false }, function(){
			res.status(200).send();
		});		
	}

	this.ApiLatestChanged = function(req, res){

		contentpagesrepository.findLatestChanged(5, function(results){
			var mappedResult = _.map(results, function(page){ 
				return { 
					_id: page._id,
					name: page.name,
					changed: moment(page.changed).format('MMM Do YYYY, HH:mm') }; 
			});
			res.json(mappedResult);
		});			
	}
};
